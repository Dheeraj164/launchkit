"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";

// Modular components
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-200 shadow-sm">
    {children}
  </span>
);

const CTA = ({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: Url;
  variant?: string;
}) => (
  <Link
    href={href}
    className={`${
      variant === "primary"
        ? "bg-black text-white"
        : "bg-gray-200 text-gray-900"
    } px-6 py-2 rounded-lg shadow hover:opacity-90 transition`}>
    {children}
  </Link>
);

const Section = ({
  title,
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <section className="max-w-4xl w-full mb-16">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="text-gray-700 dark:text-gray-200">{children}</div>
  </section>
);

export default function CaseStudyPage() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <Head>
        <title>
          Cross-Platform Real-Time Display Extension — Case Study | Dheeraj
          Gowda
        </title>
        <meta
          name="description"
          content="End-to-end case study: WebRTC P2P streaming, React Native, Flutter Desktop, Supabase signaling."
        />
        <meta
          property="og:title"
          content="Cross-Platform Real-Time Display Extension System"
        />
        <meta
          property="og:description"
          content="A low-latency P2P screen extension system built with WebRTC, React Native, Flutter Desktop and Supabase."
        />
        <meta property="og:image" content="/og-webrtc-case-study.png" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center px-6 py-12 transition-colors duration-300">
        {/* Header with dark mode toggle */}
        <header className="w-full max-w-6xl flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dheeraj Gowda — Case Studies</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Real-time systems · WebRTC · Cross-platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm">
              {dark ? "Light mode" : "Dark mode"}
            </button>
            <CTA href="#download" variant="secondary">
              Download PDF
            </CTA>
          </div>
        </header>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-3">
            Cross-Platform Real-Time Display Extension System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            (WebRTC · React Native · Flutter Desktop · Supabase)
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            A high-performance, low-latency P2P system that extends desktop
            screens to mobile devices. Built end-to-end by a single engineer.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              "WebRTC",
              "Realtime Streaming",
              "Cross-Platform",
              "Flutter Desktop",
              "Supabase",
              "NAT Traversal",
            ].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <CTA href="#demo" variant="primary">
              ▶ Watch Demo
            </CTA>
            <CTA href="#download" variant="secondary">
              📄 Download PDF Case Study
            </CTA>
          </div>
        </motion.section>

        {/* Overview + Two-column challenge/solution */}
        <Section title="Overview">
          <p>
            This project delivers a real-time display extension experience
            similar to Duet Display. I designed and built the entire system as
            the sole engineer — mobile (React Native + Expo), desktop (Flutter
            Desktop), WebRTC P2P media + data channels, and Supabase signaling &
            auth.
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>iOS & Android mobile apps (React Native)</li>
            <li>macOS & Windows desktop apps (Flutter)</li>
            <li>WebRTC for low-latency media & data</li>
            <li>Supabase for auth and real-time signaling</li>
          </ul>
        </Section>

        <section className="max-w-4xl w-full mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                Extend desktop display with <strong>sub-100ms</strong> latency
              </li>
              <li>Maintain low backend cost by leveraging P2P</li>
              <li>Ship cross-platform MVP as a single developer</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">My Solution</h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200 space-y-1">
              <li>
                WebRTC P2P media + data channels for streaming and control
              </li>
              <li>Supabase realtime for signaling (offer/answer + ICE)</li>
              <li>
                React Native for mobile, Flutter Desktop for capture/encode
              </li>
              <li>Google STUN for NAT discovery (TURN added in production)</li>
            </ul>
          </div>
        </section>

        {/* Architecture diagram with polished brand colors placeholder */}
        <Section title="System Architecture">
          <motion.div
            initial={{ scale: 0.98, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="rounded-xl shadow-md border overflow-hidden">
            {/* Replace with the polished diagram image. The image path below is a placeholder. */}
            <Image
              src="/A_flowchart_diagram_in_the_digital_illustration_vi.png"
              alt="Architecture diagram"
              className="w-full h-auto object-cover"
              height={100}
              width={100}
            />
          </motion.div>

          <p className="mt-4">
            Flow: Desktop captures → encodes → creates SDP offer → sends offer
            to Supabase → Mobile receives offer & returns answer → both exchange
            ICE candidates via Supabase → STUN helps discover public IPs →
            WebRTC P2P established → media + control data flow P2P.
          </p>
        </Section>

        {/* Technical deep dive with modular code snippets area */}
        <Section title="Technical Deep Dive">
          <h3 className="font-semibold mb-2">Signaling (Supabase)</h3>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">{`// example: push offer to Supabase
supabase.from('signals').insert({ type: 'offer', sdp: offer.sdp, session_id });

// listen for answer
supabase.from('signals').on('INSERT', payload => { if(payload.new.type==='answer') pc.setRemoteDescription(payload.new.sdp)});
`}</pre>

          <h3 className="font-semibold mb-2 mt-4">RTCPeerConnection config</h3>
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">{`const pc = new RTCPeerConnection({
  iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ]
});
`}</pre>
        </Section>

        {/* Challenges & trade-offs */}
        <Section title="Challenges & Trade-offs">
          <ul className="list-disc ml-6 space-y-1">
            <li>Quality vs latency — used adaptive bitrate and FPS caps</li>
            <li>
              STUN-only during MVP → added TURN in production for enterprise
            </li>
            <li>Desktop CPU spikes — plan to use GPU encoding (NVENC/Metal)</li>
            <li>Flutter capturer speed — future custom capturer plugin</li>
          </ul>
        </Section>

        {/* Outcome & CTA */}
        <Section title="Outcome">
          <p>
            Delivered a functional cross-platform MVP with ~30–80ms latency,
            near-zero backend bandwidth cost, and a clear path to production
            scale (TURN, SFU, GPU encoding).
          </p>
          <div className="mt-6 flex gap-3">
            <CTA href="#demo">Watch Demo</CTA>
            <CTA href="#contact" variant="secondary">
              Contact Me
            </CTA>
          </div>
        </Section>

        {/* Hidden PDF download and print-ready section */}
        <div id="download" className="w-full max-w-4xl mb-24">
          <h2 className="text-xl font-bold mb-3">
            PDF Case Study (Print Friendly)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click the button below to generate a clean PDF of this case study
            suitable for emailing or attaching to proposals. The export uses a
            print stylesheet to ensure the layout is compact and professional.
          </p>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-black text-white rounded-lg">
            Download / Print PDF
          </button>
        </div>

        {/* Two more case-study page links (skeletons) */}
        <section className="max-w-4xl w-full mb-16">
          <h2 className="text-2xl font-bold mb-4">Other Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/case-studies/stock-visualization"
              className="p-6 border rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold">
                Stock Data Visualization (Next.js + Recharts)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Interactive charts, custom visualizations, and performance tuned
                rendering for large datasets.
              </p>
            </a>

            <a
              href="/case-studies/secure-delivery-box"
              className="p-6 border rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold">
                Secure Smart Delivery Box (IoT + Firebase)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                OTP-based access, camera triggers, servo control, and real-time
                delivery verification.
              </p>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-6xl text-center text-sm text-gray-600 dark:text-gray-400 py-8">
          <p>
            © {new Date().getFullYear()} Dheeraj Gowda — Real-time systems &
            full-stack engineering
          </p>
        </footer>
      </div>
    </div>
  );
}
