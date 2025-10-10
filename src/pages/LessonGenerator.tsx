import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, FileText, Sparkles, Download, Save, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';

const LessonGenerator = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedLesson("");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-lesson', {
        body: {
          subject,
          topic,
          gradeLevel,
          duration: duration || null,
          additionalNotes: additionalNotes || null,
        }
      });

      if (error) {
        console.error("Error generating lesson:", error);
        toast({
          title: "Generation failed",
          description: error.message || "Failed to generate lesson notes. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.lesson) {
        setGeneratedLesson(data.lesson);
        toast({
          title: "Lesson generated!",
          description: "Your comprehensive lesson notes are ready.",
        });
      } else {
        toast({
          title: "No content received",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">LearnAI</span>
            </Link>
            <div className="hidden md:flex gap-4">
              <Link to="/teacher-dashboard">
                <Button variant="ghost" className="gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/lesson-generator">
                <Button variant="default" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Lesson Generator
                </Button>
              </Link>
            </div>
          </div>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-primary text-white">TD</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">AI Lesson Note Generator</h1>
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Create comprehensive lesson plans in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Lesson Details</CardTitle>
              <CardDescription>Provide information about your lesson</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Quadratic Equations"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Grade 6</SelectItem>
                      <SelectItem value="7">Grade 7</SelectItem>
                      <SelectItem value="8">Grade 8</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Include any specific requirements, learning objectives, or teaching style preferences..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!subject || !topic || !gradeLevel || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Lesson
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Output */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Lesson</CardTitle>
                  <CardDescription>Your AI-powered lesson notes</CardDescription>
                </div>
                {generatedLesson && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLesson);
                        toast({ title: "Copied to clipboard!" });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedLesson ? (
                <div className="prose prose-slate max-w-none bg-card p-6 rounded-lg border">
                  <ReactMarkdown
                    components={{
                      h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-foreground border-b pb-2">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
                      p: ({children}) => <p className="mb-3 text-foreground leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="text-foreground">{children}</li>,
                      strong: ({children}) => <strong className="font-semibold text-primary">{children}</strong>,
                      code: ({children}) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                      pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                    }}
                  >
                    {generatedLesson}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No lesson generated yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Fill in the lesson details on the left and click "Generate Lesson" to create
                    comprehensive AI-powered lesson notes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Lessons */}
        <Card className="border-2 mt-6">
          <CardHeader>
            <CardTitle>Recent Lesson Notes</CardTitle>
            <CardDescription>Your recently generated lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {['Quadratic Equations', 'Newton\'s Laws', 'Organic Chemistry'].map((title, i) => (
                <Card key={i} className="hover:shadow-md transition-all cursor-pointer border">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-xs text-muted-foreground">Generated 2 days ago</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonGenerator;
