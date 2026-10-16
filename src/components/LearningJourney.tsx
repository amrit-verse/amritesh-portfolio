'use client';

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const VIRTUAL_LAB_ENV = [
  { 
    name: "Debian 13 (Host Workstation)", 
    badge: "Daily Driver",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    role: "HP Pavilion Aero 13 laptop (AMD Ryzen 7 7735U, Linux 6.12 kernel). Terminal-first workflow, systemd, and dotfiles in git." 
  },
  { 
    name: "debian13 (QEMU/KVM Guest)", 
    badge: "Isolated VM",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    role: "Dedicated testing virtual machine managed via virt-manager and virsh (2 vCPUs, 2 GiB RAM, AppArmor security driver)." 
  },
  { 
    name: "virbr0 (NAT Virtual Bridge)", 
    badge: "Private Subnet",
    badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/25",
    role: "Kernel virtual bridge on 192.168.122.1/24 with dnsmasq DHCP (.2–.254) providing isolated host-to-guest networking." 
  },
  { 
    name: "Docker Engine (v26.1)", 
    badge: "Containers",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/25",
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
};

export default function LearningJourney() {
  const [activeSnippet, setActiveSnippet] = useState<'nmap' | 'virsh' | 'network'>('nmap');

  return (
    <section id="learning" className="py-16 sm:py-24 md:py-32 bg-[#080a0f]/60 border-y border-zinc-800/60" aria-labelledby="learning-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <p className="section-number mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              04 // SYSTEMS LAB &amp; VIRTUALIZATION
            </p>
            <h2 id="learning-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Linux Workstation &amp; Security Lab
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm sm:text-base max-w-2xl leading-relaxed">
              How I practice systems administration and defensive security: isolated virtual networks, packet captures, and daily Linux workflows.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Virtual Topology */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-5 sm:p-6 h-full flex flex-col justify-between border border-zinc-800/80">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Virtual Topology // QEMU &amp; KVM
                </p>

                {/* ASCII Topology Diagram */}
                <div className="mb-5 p-3 rounded-xl bg-[#090b11] border border-zinc-800/90 font-mono text-[0.6875rem] text-zinc-300 overflow-x-auto leading-relaxed">
                  <p className="text-zinc-200 font-bold mb-1">[ Debian 13 Host (HP Aero 13: 10.111.125.x) ]</p>
                  <p className="text-zinc-500 pl-4">│  (Type-1 KVM Kernel Driver)</p>
                  <p className="text-zinc-200 pl-4">▼</p>
                  <p className="text-zinc-200">[ Isolated Bridge: virbr0 (192.168.122.1/24 NAT) ]</p>
                  <div className="flex gap-4 pl-4 pt-1 text-zinc-400">
                    <div>
                      <p className="text-emerald-400 font-bold">┌─&gt; [ debian13 QEMU Guest ]</p>
                      <p className="text-zinc-500 text-[0.625rem]">2 vCPUs · 2 GiB RAM · AppArmor</p>
                    </div>
                    <div>
                      <p className="text-zinc-200 font-bold">└─&gt; [ Docker Engine Containers ]</p>
                      <p className="text-zinc-500 text-[0.625rem]">v26.1 · Isolated Microservices</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 mb-6">
                  {VIRTUAL_LAB_ENV.map((item) => (
                    <div key={item.name} className="rounded-xl bg-[#0b0e14] border border-zinc-800/80 p-3 sm:p-3.5">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-white">{item.name}</p>
                        <span className={`text-[0.625rem] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor || "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[0.6875rem] text-zinc-400 leading-relaxed">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-4">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">Practice &amp; Challenge Profiles</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://tryhackme.com/p/amriteshmishra729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-md bg-[#0e121a] border border-zinc-800 text-rose-300 hover:border-rose-500/40 hover:text-white transition-all"
                  >
                    <span>TryHackMe Profile</span>
                    <span className="text-rose-400">→</span>
                  </a>
                  <a
                    href="https://www.hackerrank.com/profile/amriteshmishra71"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-md bg-[#0e121a] border border-zinc-800 text-emerald-300 hover:border-emerald-500/40 hover:text-white transition-all"
                  >
                    <span>HackerRank Profile</span>
                    <span className="text-emerald-400">→</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Diagnostic Inspector */}
          <ScrollReveal delay={180}>
            <div className="glass-card p-5 sm:p-6 border border-zinc-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-1">
                      Live Terminal Diagnostics
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Inspect Real Diagnostic Traces
                    </h3>
                  </div>
                  <span className="text-[0.625rem] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Host Isolated
                  </span>
                </div>

                {/* Tab selector — swipeable on mobile */}
                <div className="flex items-center gap-1.5 mb-3 p-1 rounded-lg bg-[#07090f] border border-zinc-800 font-mono text-xs overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('nmap')}
                    className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                      activeSnippet === 'nmap'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Nmap 7.95 Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('virsh')}
                    className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                      activeSnippet === 'virsh'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    virsh dominfo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSnippet('network')}
                    className={`shrink-0 px-2.5 py-1 rounded transition-all ${
                      activeSnippet === 'network'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    virbr0 net-xml
                  </button>
                </div>

                {/* Terminal Window */}
                <div className="p-3.5 rounded-xl bg-[#07080d] border border-zinc-800/90 font-mono text-[0.6875rem] text-zinc-300 space-y-2 overflow-x-auto">
                  <p className="text-emerald-400 font-semibold">{TERMINAL_SNIPPETS[activeSnippet].command}</p>
                  <pre className="text-zinc-400 leading-relaxed whitespace-pre font-mono">
                    {TERMINAL_SNIPPETS[activeSnippet].output}
                  </pre>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/80">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Defensive Learning Focus:</strong> All packet inspection is conducted inside isolated private virtual bridges (`virbr0`) so experimental probes never touch college networks.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
