import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookCall from "./components/bookCall";
import ScrollToTop from "./components/ScrollToTop";

import ResumeReview from '@/pages/ResumeReview';
import ResumeRebuild from './pages/ResumeRebuild';
import CheatSheetPrep from './pages/CheatSheetPrep';
import PortfolioTemplates from './pages/PortfolioTemplates';
import MockInterview from '@/pages/MockInterview';
import Structure from './pages/Structure';
import SuccessStories from './pages/SuccessStories';
import Testimonials from './pages/Testimonials';

const queryClient = new QueryClient();

// Component to handle GA4 page tracking on route change
const GA4PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Fire GA4 page view on every route change
    if (window.gtag) {
      window.gtag('config', 'G-GPNHGQXM20', {
        page_path: location.pathname + location.search,
      });
    }

    // Capture UTM params on landing page or any page with query params
    const params = new URLSearchParams(location.search);
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');
    const utm_content = params.get('utm_content');

    if (utm_source && window.gtag) {
      window.gtag('event', 'utm_params', {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
        content: utm_content,
      });
    }
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GA4PageTracking />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/resume-review" element={<ResumeReview />} />
          <Route path="/resume-rebuild" element={<ResumeRebuild />} />
          <Route path="/portfolio-templates" element={<PortfolioTemplates />} />
          <Route path="/cheat-sheet-prep" element={<CheatSheetPrep />} />
          <Route path="/mock-interviews" element={<MockInterview />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
