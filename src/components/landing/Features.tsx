import { Wand2, Eye, FileCode, Zap } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description:
      "Describe your component in natural language and let Claude's advanced AI turn your ideas into clean, functional React code.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "See your components come to life instantly with real-time rendering. No build steps, no waiting—just instant feedback.",
  },
  {
    icon: FileCode,
    title: "Virtual File System",
    description:
      "Work with a complete virtual file system in your browser. Create, edit, and organize multiple files without touching your local disk.",
  },
  {
    icon: Zap,
    title: "Iterative Refinement",
    description:
      "Chat with Claude to refine your components. Add features, fix bugs, or adjust styling—all through natural conversation.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-6 bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            Everything you need to build faster
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            UIGen combines cutting-edge AI with an intuitive interface to make
            component development effortless.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-lg border border-neutral-200 bg-neutral-50/50 p-8 hover:border-neutral-300 hover:shadow-md transition-all"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-900 text-white mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
