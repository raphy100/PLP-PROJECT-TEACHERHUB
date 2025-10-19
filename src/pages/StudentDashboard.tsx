import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Brain,
  Users,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  GraduationCap,
  Home,
} from "lucide-react";

const StudentDashboard = () => {
  const recentSubjects = [
    { name: "Mathematics", progress: 75, color: "bg-primary" },
    { name: "Physics", progress: 60, color: "bg-secondary" },
    { name: "Chemistry", progress: 85, color: "bg-accent" },
  ];

  const upcomingTasks = [
    { title: "Math Assignment Ch. 5", due: "Tomorrow", subject: "Mathematics" },
    { title: "Physics Lab Report", due: "In 3 days", subject: "Physics" },
    { title: "Chemistry Quiz", due: "Friday", subject: "Chemistry" },
  ];

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
                <Button variant="ghost" className="gap-2">
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

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground text-lg">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/ai-tutor" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Ask AI Tutor</h3>
                <p className="text-sm text-muted-foreground">Get instant help</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/student-chat" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-1">Community Chat</h3>
                <p className="text-sm text-muted-foreground">Connect with peers</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/student-quiz" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Quiz Practice</h3>
                <p className="text-sm text-muted-foreground">Test your knowledge</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/community" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Discussion Forum</h3>
                <p className="text-sm text-muted-foreground">Join discussions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Progress</CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>Your performance across subjects this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentSubjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Completed Math Quiz Chapter 4</p>
                    <p className="text-sm text-muted-foreground">Score: 92% • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Joined Physics Study Group</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Asked AI Tutor about Chemistry</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Don't forget these deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{task.subject}</p>
                      <p className="text-xs text-primary font-medium mt-1">{task.due}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask your AI tutor anything, anytime
                </p>
                <Link to="/ai-tutor">
                  <Button className="w-full">Chat with AI Tutor</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
