import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Home, Award, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const StudentQuiz = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState("5");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const handleGenerateQuiz = async () => {
    if (!subject || !topic) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and topic.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: { subject, topic, difficulty, questionCount: parseInt(questionCount) }
      });

      if (error) {
        console.error("Error generating questions:", error);
        toast({
          title: "Error",
          description: "Failed to generate quiz questions. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setQuestions(data.questions || []);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      setRevealedAnswers({});
    } catch (error) {
      console.error("Error in quiz generation:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const score = questions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          subject,
          topic,
          difficulty,
          score,
          total_questions: questions.length
        });
      }
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }

    setShowResults(true);
  };

  const calculateScore = () => {
    return questions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
  };

  const toggleRevealAnswer = (idx: number) => {
    setRevealedAnswers({ ...revealedAnswers, [idx]: !revealedAnswers[idx] });
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
            <Link to="/student-dashboard">
              <Button variant="ghost" className="gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Quiz Practice</h1>
          <p className="text-muted-foreground text-lg">Test your knowledge with AI-generated quizzes</p>
        </div>

        {questions.length === 0 ? (
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Generate Your Quiz</CardTitle>
              <CardDescription>Fill in the details to create a personalized quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
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
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleGenerateQuiz} disabled={isGenerating} className="w-full">
                {isGenerating ? "Generating Quiz..." : "Generate Quiz"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{subject} • {topic}</span>
                  </div>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {!showResults ? (
                  <>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
                      <div className="space-y-2">
                        {questions[currentQuestion].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswers[currentQuestion] === option
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="flex-1"
                      >
                        Previous
                      </Button>
                      {currentQuestion === questions.length - 1 ? (
                        <Button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(selectedAnswers).length !== questions.length}
                          className="flex-1"
                        >
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button onClick={handleNext} className="flex-1">
                          Next
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                      <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                      <p className="text-5xl font-bold text-primary my-4">
                        {calculateScore()} / {questions.length}
                      </p>
                      <p className="text-muted-foreground">
                        {Math.round((calculateScore() / questions.length) * 100)}% Score
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Review Your Answers</h3>
                      {questions.map((q, idx) => (
                        <Card key={idx} className={selectedAnswers[idx] === q.correctAnswer ? "border-green-500" : "border-red-500"}>
                          <CardContent className="pt-6 space-y-3">
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm">
                              <span className="font-medium">Your answer: </span>
                              <span className={selectedAnswers[idx] === q.correctAnswer ? "text-green-600" : "text-red-600"}>
                                {selectedAnswers[idx]}
                              </span>
                            </p>
                            {selectedAnswers[idx] !== q.correctAnswer && (
                              <>
                                {!revealedAnswers[idx] ? (
                                  <Button 
                                    onClick={() => toggleRevealAnswer(idx)} 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full"
                                  >
                                    Show Correct Answer
                                  </Button>
                                ) : (
                                  <>
                                    <p className="text-sm">
                                      <span className="font-medium">Correct answer: </span>
                                      <span className="text-green-600">{q.correctAnswer}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                                      <span className="font-medium">Explanation: </span>
                                      {q.explanation}
                                    </p>
                                    <Button 
                                      onClick={() => toggleRevealAnswer(idx)} 
                                      variant="ghost" 
                                      size="sm"
                                      className="w-full"
                                    >
                                      Hide Answer
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button onClick={() => setQuestions([])} className="w-full">
                      Take Another Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuiz;
