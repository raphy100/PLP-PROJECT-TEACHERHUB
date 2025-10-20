import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, topic, gradeLevel, duration, additionalNotes } = await req.json();
    
    if (!subject || !topic || !gradeLevel) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert teacher and educational content creator. Generate comprehensive, well-structured lesson notes that EXPLAIN concepts directly rather than giving instructional steps.

CRITICAL CONTENT STYLE:
- Write in an explanatory, narrative style that directly explains concepts
- DO NOT use instructional phrases like "Define as...", "Explain why...", "Demonstrate how..."
- Instead, directly explain: "Mass number (A) is the total number of protons plus neutrons..."
- Make content presentation-ready for teachers to read and teach from
- Include clear examples and calculations within the explanations

CRITICAL FORMATTING RULES:
- Use # for the main lesson title only
- Use ## for ALL major section headings (Learning Objectives, Required Materials, etc.)
- Use ### for subsections within each major section
- Every section MUST have a clear ## heading
- Use proper spacing between sections (blank line before and after each section)
- Use bullet points (- or *) for lists
- Bold important terms using **term**
- Use code blocks with \`\`\` for examples when relevant

REQUIRED STRUCTURE - Each with ## heading:

## Learning Objectives
- List 3-5 clear, measurable learning outcomes
- Written as student-centered objectives (e.g., "Students will understand...")

## Required Materials & Resources
- List all materials needed
- Include digital resources if applicable

## Lesson Content
Break into subsections with ### headings for each major concept:
### Introduction (X minutes)
- Start with an engaging hook or real-world connection
- Present the topic and its relevance

### [Concept 1 Name] (X minutes)
- Explain the concept thoroughly with examples
- Include relevant formulas, definitions, and calculations
- Provide concrete examples with solutions

### [Concept 2 Name] (X minutes)
- Continue with clear explanations
- Show worked examples and applications

### Practice Activities (X minutes)
- Describe hands-on activities or exercises
- Include sample problems with solutions

### Summary & Conclusion (X minutes)
- Recap key concepts learned
- Suggest homework or further practice

## Key Vocabulary & Definitions
- **Term**: Clear, direct definition
- Use bold for vocabulary terms

## Important Notes & Common Misconceptions
- Address common student errors and misconceptions
- Provide clarifications and teaching tips

## Differentiation Strategies
### For Advanced Learners
- Extension activities and deeper exploration

### For Struggling Learners
- Simplified explanations and additional support

### For Visual/Kinesthetic Learners
- Alternative approaches and hands-on activities

## Assessment Methods
- Clear ways to measure student understanding
- Sample questions or assessment criteria

Make all content explanatory and presentation-ready. Explain concepts directly rather than telling teachers what to do.`;

    const userPrompt = `Create a comprehensive lesson plan for:
- Subject: ${subject}
- Topic: ${topic}
- Grade Level: Grade ${gradeLevel}
${duration ? `- Duration: ${duration} minutes` : ''}
${additionalNotes ? `- Additional Requirements: ${additionalNotes}` : ''}

Generate detailed, professional lesson notes that a teacher can use immediately for classroom instruction.`;

    console.log("Calling AI Gateway for lesson generation...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to generate lesson notes" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedLesson = data.choices?.[0]?.message?.content;

    if (!generatedLesson) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "Failed to generate content" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Lesson generated successfully");

    return new Response(
      JSON.stringify({ lesson: generatedLesson }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-lesson function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
