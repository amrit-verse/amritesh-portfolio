'use client';

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const VIRTUAL_LAB_ENV = [
  { 
    name: "Debian 13 (Host Workstation)", 
    badge: "Daily Driver",
    role: "HP Pavilion Aero 13 laptop (AMD Ryzen 7 7735U, Linux 6.12 kernel). Terminal-first workflow, systemd, and dotfiles in git." 
  },
  { 
    name: "debian13 (QEMU/KVM Guest)", 
    badge: "Isolated VM",
    role: "Dedicated testing virtual machine managed via virt-manager and virsh (2 vCPUs, 2 GiB RAM, AppArmor security driver)." 
  },
  { 
    name: "virbr0 (NAT Virtual Bridge)", 
    badge: "Private Subnet",
    role: "Kernel virtual bridge on 192.168.122.1/24 with dnsmasq DHCP (.2–.254) providing isolated host-to-guest networking." 
  },
  { 
    name: "Docker Engine (v26.1)", 
    badge: "Containers",
    role: "Local containerized environments for databases and microservices without cluttering host Debian packages." 
  },
];

const TERMINAL_SNIPPETS = {
  nmap: {
    command: "$ nmap -sT -p 22,80,5432,8080 127.0.0.1",
    output: `Starting Nmap 7.95 ( https://nmap.org ) at 2026-10-16 23:16 IST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000093s latency).

PORT     STATE  SERVICE
22/tcp   closed ssh
80/tcp   closed http
5432/tcp open   postgresql
8080/tcp closed http-proxy

Nmap done: 1 IP address (1 host up) scanned in 0.02 seconds`,
  },
  virsh: {
    command: "$ virsh -c qemu:///system dominfo debian13",
    output: `Id:             -
Name:           debian13
OS Type:        hvm
State:          shut off
CPU(s):         2
Max memory:     2097152 KiB (2 GiB)
Used memory:    2097152 KiB
Persistent:     yes
Security model: apparmor`,
  },
  network: {
    command: "$ virsh -c qemu:///system net-dumpxml default",
    output: `<network>
  <name>default</name>
  <bridge name='virbr0' stp='on' delay='0'/>
  <mac address='52:54:00:b2:15:0f'/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.122.2' end='192.168.122.254'/>
    </dhcp>
  </ip>
</network>`,
  },
  threatdesk: {
    command: "$ pytest tests/test_scoring.py -v --tb=short",
    output: `tests/test_scoring.py::test_66_deterministic_rules PASSED [ 24%]
tests/test_scoring.py::test_negative_scoring_official_assets PASSED [ 52%]
tests/test_scoring.py::test_zero_code_exec_logistic_evaluator PASSED [ 80%]
tests/test_scoring.py::test_evidence_ledger_integrity PASSED [100%]

============================== 357 passed in 99.86s ==============================`,
  },
};

export default function LearningJourney() {
  const [activeSnippet, setActiveSnippet] = useState<'nmap' | 'virsh' | 'network' | 'threatdesk'>('nmap');

  return (
    <section id="learning" className="py-16 sm:py-24 md:py-32 bg-bg-primary border-y border-border-subtle" aria-labelledby="learning-title">
      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze shadow-[0_0_8px_var(--color-accent-bronze-glow)]" />
              DIMENSION 03 // INVESTIGATE &amp; SYSTEMS LAB
            </p>
            <h2 id="learning-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-text-primary mb-3">
              Linux Workstation &amp; Security Lab
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm max-w-2xl leading-relaxed">
              How I practice systems administration, packet captures, and deterministic threat defense: isolated virtual hypervisor testbeds and daily Linux workflows.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Virtual Topology */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-5 sm:p-6 h-full flex flex-col justify-between border border-border-subtle bg-bg-card shadow-card rounded-2xl">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze mb-4 flex items-center gap-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze" />
                  Virtual Topology // QEMU &amp; KVM
                </p>

                {/* ASCII Topology Diagram */}
                <div className="mb-5 p-3 rounded-xl bg-bg-primary border border-border-subtle font-mono text-[0.6875rem] text-text-primary overflow-x-auto no-scrollbar leading-relaxed">
                  <p className="text-text-primary font-bold mb-1">[ Debian 13 Host (HP Aero 13) ]</p>
                  <p className="text-text-tertiary pl-4">│  (Type-1 KVM Kernel Driver)</p>
                  <p className="text-accent-bronze pl-4">▼</p>
                  <p className="text-text-primary">[ Isolated Bridge: virbr0 (192.168.122.1/24 NAT) ]</p>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pl-4 pt-1 text-text-secondary">
                    <div>
                      <p className="text-accent-bronze font-bold">┌─&gt; [ debian13 QEMU Guest ]</p>
                      <p className="text-text-tertiary text-[0.625rem]">2 vCPUs · 2 GiB RAM · AppArmor</p>
                    </div>
                    <div>
                      <p className="text-text-primary font-bold">└─&gt; [ Docker Engine Containers ]</p>
                      <p className="text-text-tertiary text-[0.625rem]">v26.1 · Isolated Microservices</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 mb-6">
                  {VIRTUAL_LAB_ENV.map((item) => (
                    <div key={item.name} className="rounded-xl bg-bg-secondary border border-border-subtle p-3 sm:p-3.5">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-text-primary">{item.name}</p>
                        <span className="text-[0.625rem] font-mono px-1.5 py-0.5 rounded border bg-bg-tertiary text-accent-bronze border-border-subtle">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[0.6875rem] text-text-secondary leading-relaxed">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4">
                <p className="text-xs font-mono uppercase tracking-wider text-accent-bronze mb-2 font-bold">Practice &amp; Challenge Profiles</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://tryhackme.com/p/amriteshmishra729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary hover:border-accent-bronze transition-all"
                  >
                    <span>TryHackMe Profile</span>
                    <span className="text-accent-bronze">→</span>
                  </a>
                  <a
                    href="https://www.hackerrank.com/profile/amriteshmishra71"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary hover:border-accent-bronze transition-all"
                  >
                    <span>HackerRank Profile</span>
                    <span className="text-accent-bronze">→</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Diagnostic Inspector */}
          <ScrollReveal delay={180}>
            <div className="glass-card p-5 sm:p-6 border border-border-subtle bg-bg-card shadow-card rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-bronze mb-1 font-bold">
                      Live Terminal Diagnostics
                    </p>
                    <h3 className="text-base sm:text-lg font-display font-bold text-text-primary">
                      Inspect Real Diagnostic Traces
                    </h3>
                  </div>
                  <span className="text-[0.625rem] font-mono px-2 py-0.5 rounded bg-bg-secondary text-accent-bronze border border-border-subtle">
                    Host Isolated
                  </span>
                </div>

                {/* Tab selector */}
                <div className="flex items-center gap-1.5 mb-3 p-1 rounded-xl bg-bg-primary border border-border-subtle font-mono text-xs overflow-x-auto max-w-full no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('nmap')}
                    className={`shrink-0 px-2.5 py-1 rounded-lg transition-all ${
                      activeSnippet === 'nmap'
                        ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Nmap 7.95 Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('threatdesk')}
                    className={`shrink-0 px-2.5 py-1 rounded-lg transition-all ${
                      activeSnippet === 'threatdesk'
                        ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    ThreatDesk Pytest (357)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('virsh')}
                    className={`shrink-0 px-2.5 py-1 rounded-lg transition-all ${
                      activeSnippet === 'virsh'
                        ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    virsh dominfo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('network')}
                    className={`shrink-0 px-2.5 py-1 rounded-lg transition-all ${
                      activeSnippet === 'network'
                        ? 'bg-accent-primary text-bg-primary font-semibold shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    virbr0 net-xml
                  </button>
                </div>

                {/* Terminal Window */}
                <div className="p-3.5 rounded-xl bg-bg-primary border border-border-subtle font-mono text-[0.6875rem] text-text-primary space-y-2 overflow-x-auto">
                  <p className="text-accent-bronze font-semibold">{TERMINAL_SNIPPETS[activeSnippet].command}</p>
                  <pre className="text-text-secondary leading-relaxed whitespace-pre font-mono">
                    {TERMINAL_SNIPPETS[activeSnippet].output}
                  </pre>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">Defensive Engineering Focus:</strong> Packet inspection is conducted inside isolated private virtual bridges (`virbr0`) and deterministic rule engines (`ThreatDesk`), leaving zero external footprint.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
