import { ScrollReveal } from '@/components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32" aria-label="About Me">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <span className="section-number">01</span>
          <h2 className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>About Me</h2>
          <p className="text-text-secondary max-w-2xl">
            Building scalable software, exploring system internals, and pushing the boundaries of continuous learning.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 mb-8 sm:mb-12" />
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {/* Professional Timeline */}
              <div className="glass-card p-6 relative">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-blue mb-6">
                  The Journey
                </p>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent-blue before:via-accent-purple before:to-transparent">
                  {[
                    { title: "Computer Science Engineering", desc: "Started B.E. at Excel Engineering College, laying the foundation in algorithms, OS concepts, and structured problem solving." },
                    { title: "Web Development", desc: "Built full-stack web applications to understand the complete request-response lifecycle and client-server architecture." },
                    { title: "Java & Spring Boot", desc: "Adopted the Spring ecosystem to engineer robust, stateless, and scalable backend enterprise services." },
                    { title: "Linux Migration", desc: "Moved exclusively to Debian as a daily driver. Dove deep into shell scripting, kernel configurations, and system hardening." },
                    { title: "Cybersecurity Labs", desc: "Established local virtual environments (Kali, Windows 11) to study active directory vulnerabilities and network enumeration." },
                  ].map((item, index) => (
                    <div key={item.title} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-accent-blue bg-bg-primary absolute left-0 md:left-1/2 -translate-x-1/2" />
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] pl-4 md:pl-0">
                        <div className={`p-4 rounded-xl bg-bg-tertiary border border-border-subtle group-hover:border-accent-blue/30 transition-colors ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                          <h4 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4">
              <div className="glass-card p-4 sm:p-6">
                <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                  Engineering Focus
                </p>
                <p className="text-sm text-text-primary leading-relaxed mb-4">
                  I specialize in backend architecture using the Spring Boot ecosystem, heavily emphasizing API design, stateless authentication, and secure database interactions. 
                </p>
                <p className="text-sm text-text-primary leading-relaxed">
                  As a Linux enthusiast and active cybersecurity learner, I ensure that the systems I build are not only highly available but fundamentally secure from the kernel up.
                </p>
              </div>

              <div className="glass-card p-4 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-2">Current degree</p>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  B.E. Computer Science Engineering
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Excel Engineering College, Anna University
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-bg-tertiary p-3 border border-border-subtle">
                    <p className="text-xs uppercase tracking-[0.24em] text-text-secondary mb-1">CGPA</p>
                    <p className="text-lg font-semibold text-text-primary">8.55</p>
                  </div>
                  <div className="rounded-2xl bg-bg-tertiary p-3 border border-border-subtle">
                    <p className="text-xs uppercase tracking-[0.24em] text-text-secondary mb-1">Graduation</p>
                    <p className="text-lg font-semibold text-text-primary">2029</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
