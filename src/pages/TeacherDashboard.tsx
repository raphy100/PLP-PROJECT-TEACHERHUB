import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Brain,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  HelpCircle,
  GraduationCap,
  Home,
  Calendar,
  BarChart3,
} from "lucide-react";

const TeacherDashboard = () => {
  const myClasses = [
    { name: "Mathematics 101", students: 32, color: "bg-primary" },
    { name: "Physics Advanced", students: 24, color: "bg-secondary" },
    { name: "Chemistry Basics", students: 28, color: "bg-accent" },
  ];

  const recentActivities = [
    { action: "New assignment submitted", class: "Math 101", time: "10 minutes ago" },
    { action: "Student question in community", class: "Physics", time: "1 hour ago" },
    { action: "Lesson notes generated", class: "Chemistry", time: "2 hours ago" },
  ];

  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      const name = (user as any)?.user_metadata?.full_name || (user as any)?.email || null;
      setFullName(name);
    })();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
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
              <Link to="/community">
                <Button variant="ghost" className="gap-2">
                  <Users className="h-4 w-4" />
                  Community
                </Button>
              </Link>
              <Link to="/lesson-generator">
                <Button variant="ghost" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Lessons
                </Button>
              </Link>
              <Link to="/question-generator">
                <Button variant="ghost" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Questions
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2">
              <div className="text-sm">{fullName ?? "Guest"}</div>
            </div>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
              Logout
            </button>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-primary text-white">
                {fullName ? fullName.split(" ").map(n => n[0]).slice(0,2).join("") : "G"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome{fullName ? `, ${fullName}` : ", Teacher"}! 👨‍🏫</h1>
          <p className="text-muted-foreground text-lg">Manage your classes and inspire students</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/lesson-generator" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Create Lesson</h3>
                <p className="text-sm text-muted-foreground">AI-powered notes</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/question-generator" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-1">Generate Quiz</h3>
                <p className="text-sm text-muted-foreground">Auto questions</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/community" className="block">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Community</h3>
                <p className="text-sm text-muted-foreground">Help students</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-muted-foreground">View insights</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Classes */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Classes</CardTitle>
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>Manage your courses and students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myClasses.map((cls) => (
                  <Card key={cls.name} className="border hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${cls.color}/10 flex items-center justify-center`}>
                            <BookOpen className={`h-6 w-6 text-${cls.color.split('-')[1]}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{cls.name}</h3>
                            <p className="text-sm text-muted-foreground">{cls.students} students</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.class} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">84</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-3xl font-bold text-secondary">12</p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-3xl font-bold text-accent">95%</p>
                  <p className="text-sm text-muted-foreground">Avg Completion</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">AI Tools Ready</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create lessons and quizzes in seconds
                </p>
                <Link to="/lesson-generator">
                  <Button className="w-full">Try AI Tools</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
