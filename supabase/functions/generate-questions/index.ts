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
    const { subject, topic, difficulty, questionCount } = await req.json();
    
    if (!subject || !topic || !difficulty || !questionCount) {
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

    const systemPrompt = `You are an expert educational content creator specializing in creating high-quality quiz questions.

Generate quiz questions that are:
- Clear and unambiguous
- Educationally sound and pedagogically appropriate
- Aligned with the specified difficulty level
- Multiple choice format with 4 options (A, B, C, D)
- Include one correct answer and three plausible distractors
- Provide a brief explanation for the correct answer
- **Include a balanced mix of THEORY/CONCEPTUAL questions and APPLICATION/PRACTICAL questions**
- Theory questions should test understanding of concepts, definitions, principles, and explanations
- Application questions should test ability to apply knowledge, solve problems, and perform calculations

Return the questions in valid JSON format as an array with this exact structure:
[
  {
    "question": "The actual question text",
    "options": ["A) First option", "B) Second option", "C) Third option", "D) Fourth option"],
    "correctAnswer": "B) Second option",
    "explanation": "Brief explanation of why this is correct"
  }
]

CRITICAL: Return ONLY valid JSON, no markdown, no additional text, no code blocks.`;

    const userPrompt = `Generate ${questionCount} multiple-choice quiz questions for:
- Subject: ${subject}
- Topic: ${topic}
- Difficulty: ${difficulty}

Return as a valid JSON array following the exact format specified.`;

    console.log("Calling AI Gateway for question generation...");
    
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
        JSON.stringify({ error: "Failed to generate questions" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "Failed to generate content" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean up the response - remove markdown code blocks if present
    generatedContent = generatedContent.trim();
    if (generatedContent.startsWith('```json')) {
      generatedContent = generatedContent.replace(/^```json\s*\n/, '').replace(/\n```\s*$/, '');
    } else if (generatedContent.startsWith('```')) {
      generatedContent = generatedContent.replace(/^```\s*\n/, '').replace(/\n```\s*$/, '');
    }

    // Parse and validate the JSON
    let questions;
    try {
      questions = JSON.parse(generatedContent);
      if (!Array.isArray(questions)) {
        throw new Error("Response is not an array");
      }
      // Add IDs to questions
      questions = questions.map((q, index) => ({ ...q, id: index + 1 }));
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, generatedContent);
      return new Response(
        JSON.stringify({ error: "Failed to parse generated questions" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Questions generated successfully");

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in generate-questions function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
