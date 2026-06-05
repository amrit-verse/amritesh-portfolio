import { ScrollReveal } from '@/components/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32" aria-label="About Me">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <span className="section-number">01</span>
          <h2 className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>About Me</h2>
          <p className="text-text-secondary max-w-2xl">
            A focused computer science student building software and systems skills with language discipline and practical labs.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4 mb-12" />
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card p-4 sm:p-6">
                  <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                    Roots
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed">
                    Born in Rautahat, Nepal, and began the academic journey with SEE at Jana Jyoti Secondary School.
                  </p>
                </div>
                <div className="glass-card p-4 sm:p-6">
                  <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                    Secondary Education
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed">
                    Completed Science (PCM) in 2022 at Xavier International Secondary School, Kathmandu.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card p-4 sm:p-6">
                  <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                    Language Credentials
                  </p>
                  <ul className="text-sm text-text-primary space-y-2 leading-relaxed">
                    <li>JL-NAT N5 certification</li>
                    <li>Duolingo English Test score: 105</li>
                  </ul>
                </div>
                <div className="glass-card p-4 sm:p-6">
                  <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                    Current Focus
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed">
                    Pursuing B.E. Computer Science Engineering at Excel Engineering College, affiliated with Anna University.
                  </p>
                </div>
              </div>

              <div className="glass-card p-4 sm:p-6">
                <p className="text-sm text-text-secondary uppercase tracking-[0.24em] mb-3">
                  Academic Performance
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-text-primary">3.60 / 4.00</p>
                    <p className="text-sm text-text-secondary">SEE GPA</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-text-primary">3.27 / 4.00</p>
                    <p className="text-sm text-text-secondary">PCM GPA</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4">
              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-accent-blue mb-2">Current degree</p>
                <h3 className="text-2xl font-semibold text-text-primary mb-2">
                  B.E. Computer Science Engineering
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Excel Engineering College, affiliated to Anna University, India.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-bg-tertiary p-4 border border-border-subtle">
                    <p className="text-xs uppercase tracking-[0.24em] text-text-secondary mb-2">CGPA</p>
                    <p className="text-xl font-semibold text-text-primary">8.55</p>
                  </div>
                  <div className="rounded-2xl bg-bg-tertiary p-4 border border-border-subtle">
                    <p className="text-xs uppercase tracking-[0.24em] text-text-secondary mb-2">Expected graduation</p>
                    <p className="text-xl font-semibold text-text-primary">2029</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <p className="text-sm text-text-primary leading-relaxed">
                  I focus on translating learning into practical software projects, while strengthening systems awareness and security fundamentals.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
