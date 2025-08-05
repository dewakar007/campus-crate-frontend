import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DashboardLost from "./pages/DashboardLost";
import DashboardFound from "./pages/DashboardFound";
import PostLost from "./pages/PostLost";
import PostFound from "./pages/PostFound";
import ItemDetail from "./pages/ItemDetail";
import Admin from "./pages/Admin";
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
          <Route path="/dashboard/lost" element={<DashboardLost />} />
          <Route path="/dashboard/found" element={<DashboardFound />} />
          <Route path="/post-lost" element={<PostLost />} />
          <Route path="/post-found" element={<PostFound />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
