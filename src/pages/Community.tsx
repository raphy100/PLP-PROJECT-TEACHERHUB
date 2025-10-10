import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  Home,
  Search,
  MessageSquare,
  ThumbsUp,
  Reply,
  TrendingUp,
} from "lucide-react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      role: "Student",
      subject: "Mathematics",
      title: "Need help with quadratic equations",
      content: "I'm having trouble understanding how to solve quadratic equations using the quadratic formula. Can someone explain the steps?",
      likes: 12,
      replies: 5,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "Prof. Michael Chen",
      role: "Teacher",
      subject: "Physics",
      title: "Tips for understanding Newton's Laws",
      content: "Here are some practical examples that can help you better understand Newton's three laws of motion...",
      likes: 28,
      replies: 8,
      time: "5 hours ago",
    },
    {
      id: 3,
      author: "Emma Davis",
      role: "Student",
      subject: "Chemistry",
      title: "Study group for organic chemistry?",
      content: "Looking for students interested in forming a study group for organic chemistry. DM me if interested!",
      likes: 15,
      replies: 12,
      time: "1 day ago",
    },
  ];

  const trendingTopics = [
    { name: "Exam Preparation", count: 45 },
    { name: "Study Tips", count: 38 },
    { name: "Math Help", count: 32 },
    { name: "Science Projects", count: 28 },
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
                <Button variant="default" className="gap-2">
                  <Users className="h-4 w-4" />
                  Community
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community Forum</h1>
          <p className="text-muted-foreground text-lg">Connect, share, and learn together</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Create Post */}
            <Card className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start a Discussion
                </Button>
              </CardContent>
            </Card>

            {/* Categories Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="math">Math</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
                <TabsTrigger value="study">Study Groups</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-6">
                {posts.map((post) => (
                  <Card key={post.id} className="border-2 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-white">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{post.author}</h3>
                              <Badge variant="outline" className="text-xs">
                                {post.role}
                              </Badge>
                              <Badge className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                                {post.subject}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                            <CardDescription>{post.content}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <button className="flex items-center gap-2 hover:text-primary transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-primary transition-colors">
                          <Reply className="h-4 w-4" />
                          <span>{post.replies} replies</span>
                        </button>
                        <span className="ml-auto">{post.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Trending Topics</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-sm">{topic.name}</span>
                    <Badge variant="secondary">{topic.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-secondary/10 to-accent/10">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-semibold mb-2">Community Guidelines</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Be respectful, helpful, and supportive to create a positive learning environment
                </p>
                <Button variant="outline" className="w-full">
                  Read Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Active Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Alex Thompson', 'Maria Garcia', 'James Wilson'].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{name}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 ml-auto" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
