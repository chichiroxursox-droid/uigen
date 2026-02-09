import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-neutral-50 to-white py-20 px-6 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700 mb-8 border border-neutral-200">
          <Sparkles className="w-4 h-4" />
          AI-Powered Component Generator
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-6">
          Build React Components
          <br />
          <span className="text-neutral-600">with AI</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Describe your component in plain English and watch as Claude generates,
          edits, and refines your React code with live preview—all in your browser.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={onGetStarted}
          className="text-base h-12 px-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          Start Creating
        </Button>

        {/* Sub-text */}
        <p className="text-sm text-neutral-500 mt-4">
          No installation required • Free to use
        </p>
      </div>
    </section>
  );
}
