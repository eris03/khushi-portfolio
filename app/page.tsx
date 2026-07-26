"use client";

import { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ArtAI from "@/components/ArtAI";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Progress from "@/components/Progress";

export default function Page() {
  const [ready, setReady] = useState(false);

  // hold the page still while the K is being painted
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  const done = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={done} />
      <Cursor />
      <SmoothScroll />
      <Atmosphere />
      <Progress />
      <Nav ready={ready} />

      <main className="relative">
        <Hero ready={ready} />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <ArtAI />
        <Experience />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
