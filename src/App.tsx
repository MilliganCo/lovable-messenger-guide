import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppProvider, useApp } from "@/contexts/AppContext";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/pages/Onboarding";
import ChatList from "@/pages/ChatList";
import ChatView from "@/pages/ChatView";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isOnboarded } = useApp();

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background shadow-xl">
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={isOnboarded ? <Navigate to="/chats" /> : <Onboarding />} />
          <Route path="/chats" element={isOnboarded ? <ChatList /> : <Navigate to="/" />} />
          <Route path="/chat/:chatId" element={isOnboarded ? <ChatView /> : <Navigate to="/" />} />
          <Route path="/settings" element={isOnboarded ? <Settings /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isOnboarded && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
