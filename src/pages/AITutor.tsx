import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, Brain, Send, BookOpen, Users, Loader2 } from "lucide-react";
import aiTutorIcon from "@/assets/ai-tutor-icon.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Tutor. How can I help you learn today? Feel free to ask me anything about your studies!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor-chat', {
        body: { message: currentInput }
      });

      if (error) {
        console.error("Error calling AI tutor:", error);
        toast({
          title: "Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const aiResponse = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error in AI tutor chat:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Explain quadratic equations",
    "Help me with Newton's laws",
    "What is photosynthesis?",
    "How do I solve this problem?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">LearnAI</span>
            </Link>
            <div className="hidden md:flex gap-4">
              <Link to="/student-dashboard">
                <Button variant="ghost" className="gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="ghost" className="gap-2">
                  <Users className="h-4 w-4" />
                  Community
                </Button>
              </Link>
              <Link to="/ai-tutor">
                <Button variant="default" className="gap-2">
                  <Brain className="h-4 w-4" />
                  AI Tutor
                </Button>
              </Link>
            </div>
          </div>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img src={aiTutorIcon} alt="AI Tutor" className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">AI Tutor</h1>
              <p className="text-muted-foreground">Your 24/7 learning companion</p>
            </div>
            <Badge className="ml-auto bg-green-500 text-white">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 flex-1">
          {/* Chat Area */}
          <Card className="lg:col-span-3 border-2 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Chat with AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px]">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <img src={aiTutorIcon} alt="AI" />
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} size="icon" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => setInput(question)}
                  >
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Study Tips</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask me to explain concepts, solve problems, or provide study strategies
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">What I Can Help With</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Explain complex concepts simply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Solve math and science problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Provide study strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Answer homework questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Quiz you on any topic</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
