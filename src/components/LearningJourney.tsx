import { ScrollReveal } from "@/components/ScrollReveal";

const LEARNING_ITEMS = [
  "Linux Internals",
  "Cybersecurity Fundamentals",
  "Network Enumeration",
  "Virtual Security Labs",
];

export default function LearningJourney() {
  return (
    <section id="learning" className="py-24 md:py-32 bg-bg-secondary/50" aria-labelledby="learning-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-number">07</span>
            <h2 id="learning-title" className="text-3xl md:text-4xl font-bold mb-3">
              Learning Journey
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Ongoing learning and practical lab experience.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal delay={100}>
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-3">
                Current Learning
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {LEARNING_ITEMS.map((item) => (
                  <li key={item} className="rounded-2xl bg-bg-primary/60 border border-border-subtle p-4">
                    <p className="text-sm font-medium text-text-primary">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-5 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-2">
                    Home Security Lab
                  </p>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Practical exploration in a safe lab environment.
                  </h3>
                </div>
              </div>

              <div className="space-y-5 text-sm text-text-secondary">
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-2">Host System</p>
                  <p>Debian Linux</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text-primary mb-2">Virtual Machines</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Kali Linux</li>
                    <li>Windows 11</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text-primary mb-2">Tools Currently Exploring</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Nmap</li>
                    <li>SMB Enumeration</li>
                    <li>Linux Networking</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
