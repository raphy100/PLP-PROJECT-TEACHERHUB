import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Community from "./pages/Community";
import LessonGenerator from "./pages/LessonGenerator";
import QuestionGenerator from "./pages/QuestionGenerator";
import AITutor from "./pages/AITutor";
import StudentQuiz from "./pages/StudentQuiz";
import StudentChat from "./pages/StudentChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/lesson-generator" element={<LessonGenerator />} />
          <Route path="/question-generator" element={<QuestionGenerator />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/student-quiz" element={<StudentQuiz />} />
          <Route path="/student-chat" element={<StudentChat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
