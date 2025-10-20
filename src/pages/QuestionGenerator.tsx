import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Home, HelpCircle, Sparkles, Download, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const QuestionGenerator = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState("5");
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: { 
          subject, 
          topic, 
          difficulty, 
          questionCount: parseInt(questionCount) 
        }
      });

      if (error) {
        console.error("Error generating questions:", error);
        toast({
          title: "Error",
          description: "Failed to generate questions. Please try again.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      setGeneratedQuestions(data.questions);
      toast({
        title: "Questions generated!",
        description: `${data.questions.length} questions ready for your quiz.`,
      });
    } catch (error) {
      console.error("Error in question generation:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
              <Link to="/question-generator">
                <Button variant="default" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Question Generator
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
            <h1 className="text-4xl font-bold">AI Question Generator</h1>
            <Badge className="bg-gradient-to-r from-secondary to-accent text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Create quizzes and exams automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
                <CardDescription>Configure your question set</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English Language</SelectItem>
                      <SelectItem value="literature">Literature in English</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="agriculture">Agricultural Science</SelectItem>
                      <SelectItem value="economics">Economics</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="accounting">Accounting</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="civic">Civic Education</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="computer">Computer Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Algebra"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="count">Number of Questions</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="50"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="answers"
                    checked={includeAnswers}
                    onCheckedChange={(checked) => setIncludeAnswers(checked as boolean)}
                  />
                  <Label htmlFor="answers" className="cursor-pointer">
                    Include answer key
                  </Label>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!subject || !topic || !difficulty || isGenerating}
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
                      Generate Questions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-6 text-center">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Need Custom Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manually add questions or edit generated ones
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Question
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Questions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Questions</CardTitle>
                    <CardDescription>Review and export your quiz</CardDescription>
                  </div>
                  {generatedQuestions.length > 0 && (
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button>Save Quiz</Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {generatedQuestions.map((q) => (
                      <Card key={q.id} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-primary">{q.id}</span>
                            </div>
                            <div className="flex-1 space-y-3">
                              <h4 className="font-semibold">{q.question}</h4>
                              <div className="space-y-2">
                                {q.options.map((option: string, i: number) => (
                                  <div
                                    key={i}
                                    className={`p-3 rounded-lg border ${
                                      includeAnswers && option === q.correctAnswer
                                        ? 'bg-accent/10 border-accent'
                                        : 'bg-muted/30'
                                    }`}
                                  >
                                    <p className="text-sm">{option}</p>
                                  </div>
                                ))}
                              </div>
                              {includeAnswers && (
                                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                                  <p className="text-sm font-medium text-accent mb-1">
                                    Correct Answer: {q.correctAnswer}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <HelpCircle className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No questions generated yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Configure your quiz settings on the left and click "Generate Questions"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
