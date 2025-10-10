import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, BookOpen, MessageSquare, Sparkles, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";
import aiTutorIcon from "@/assets/ai-tutor-icon.png";
import communityFeature from "@/assets/community-feature.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LearnAI
            </span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Connect, Learn, and Grow with{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join an interactive community where students and teachers collaborate with cutting-edge AI tools
              to enhance learning experiences.
            </p>
            <div className="flex gap-4">
              <Link to="/signup?role=student">
                <Button size="lg" className="group">
                  Join as Student
                  <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Button>
              </Link>
              <Link to="/signup?role=teacher">
                <Button size="lg" variant="outline">
                  Join as Teacher
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="AI Learning Platform"
              className="relative rounded-3xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">Powerful Features for Modern Learning</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, share, and learn in one intelligent platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI Tutor Chatbot</CardTitle>
              <CardDescription>
                Get instant help with lessons and homework from your personal AI tutor available 24/7
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Interactive Community</CardTitle>
              <CardDescription>
                Connect with classmates and teachers in discussion boards, share knowledge, and collaborate
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>AI Lesson Generator</CardTitle>
              <CardDescription>
                Teachers can create comprehensive lesson notes with AI assistance in minutes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>
                Auto-generate quizzes and exams with instant AI feedback for students
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Smart Progress Tracking</CardTitle>
              <CardDescription>
                Personalized learning recommendations based on your performance and goals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Assignment Portal</CardTitle>
              <CardDescription>
                Submit homework and receive detailed feedback from teachers and AI
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={communityFeature}
              alt="Community Features"
              className="rounded-3xl shadow-2xl border border-border"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl font-bold">Learn Together, Grow Together</h2>
            <p className="text-lg text-muted-foreground">
              Our community-driven approach brings students and teachers closer. Share insights, ask questions,
              and build meaningful connections in a supportive learning environment.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Discussions</h4>
                  <p className="text-muted-foreground">Engage in live conversations with peers and educators</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Subject-Specific Channels</h4>
                  <p className="text-muted-foreground">Organized spaces for focused learning and collaboration</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Resource Sharing</h4>
                  <p className="text-muted-foreground">Share notes, videos, and study materials with the community</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden border-2">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <CardContent className="relative pt-12 pb-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <img src={aiTutorIcon} alt="AI Tutor" className="w-24 h-24 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl font-bold">Ready to Transform Your Learning?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of students and teachers already experiencing the future of education
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link to="/signup">
                  <Button size="lg" className="px-8">
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">LearnAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LearnAI. Empowering education with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
