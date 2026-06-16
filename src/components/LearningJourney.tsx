import { ScrollReveal } from "@/components/ScrollReveal";

const LEARNING_ITEMS = [
  "Debian (Daily Driver)",
  "Kali Linux (Security Auditing)",
  "Windows 11 (Vulnerable AD Target)",
  "VirtualBox Hypervisor",
];

export default function LearningJourney() {
  return (
    <section id="learning" className="py-16 sm:py-24 md:py-32 bg-bg-secondary/50" aria-labelledby="learning-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <span className="section-number">07</span>
            <h2 id="learning-title" className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
              Cybersecurity & Linux
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Practical labs, virtual environments, and system exploration.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal delay={100}>
            <div className="glass-card p-4 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-3">
                Virtual Security Lab
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {LEARNING_ITEMS.map((item) => (
                  <li key={item} className="rounded-2xl bg-bg-primary/60 border border-border-subtle p-3 sm:p-4">
                    <p className="text-sm font-medium text-text-primary">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-2">
                    Security Operations
                  </p>
                  <h3 className="text-xl font-semibold text-text-primary">
                    Hands-on penetration testing and networking.
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-sm text-text-secondary">
                {/* Daily Environment */}
                <div>
                  <p className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Daily Environment
                  </p>
                  <p className="pl-3.5">
                    <strong>Debian Linux:</strong> Primary operating system for all development, shell scripting, and kernel exploration.
                  </p>
                </div>

                {/* Virtual Lab */}
                <div>
                  <p className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Virtual Lab
                  </p>
                  <ul className="pl-3.5 space-y-1">
                    <li><strong>Kali Linux:</strong> Dedicated offensive security and auditing environment.</li>
                    <li><strong>Windows 11 VM:</strong> Purpose-built vulnerable target for Active Directory testing.</li>
                  </ul>
                </div>

                {/* Security Tools */}
                <div>
                  <p className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Security Tools
                  </p>
                  <div className="pl-3.5 flex flex-wrap gap-2">
                    {["Nmap", "Packet Analysis", "Network Discovery", "SMB Enumeration"].map(tool => (
                      <span key={tool} className="text-xs font-mono px-2 py-1 rounded bg-bg-primary border border-border-subtle">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Learning Areas */}
                <div>
                  <p className="text-sm font-semibold text-text-primary flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Learning Areas
                  </p>
                  <ul className="pl-3.5 space-y-1 grid sm:grid-cols-2 gap-x-4">
                    <li>Linux Administration</li>
                    <li>Networking Fundamentals</li>
                    <li>System Security</li>
                    <li>Practical Cybersecurity</li>
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
