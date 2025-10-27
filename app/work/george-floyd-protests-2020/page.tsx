"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ===================== Types ===================== */
type Project = { title: string; key: string; href: string };
type Slide =
  | { type?: "image"; src: string; alt: string; width: number; height: number; className?: string }
  | { type: "video"; src: string; alt: string; width: number; height: number; className?: string };

/* ===================== Constants ===================== */
const UMBER = "#4a1f14";
const GAP = 65;

/* Mobile image sizing hint for next/image */
const IMG_SIZES = "(max-width: 639px) 100vw, (min-width: 640px) 75vw";

const PROJECTS: Project[] = [
  // Civic
  { title: "The Death Flights", key: "death-flights", href: "/work/the-death-flights" },
  { title: "Deportation-Industrial Complex", key: "immigration-industrial-complex", href: "#" },
  { title: "Families Funding the 2016 Election", key: "donors", href: "#" },
  { title: "Reconstructing the Bronx Fire", key: "bronx-fire", href: "/work/bronx-fire" },
  { title: "Sow, et al. v. City of New York, et al.", key: "sow-et-al", href: "#" },
  { title: "Why the Mexico City Metro Collapsed", key: "mexican-metro", href: "#" },

  // Culture
  { title: "David Bowie in Three Dimensions", key: "david-bowie-3d", href: "#" },
  { title: "Diary of a Song: Ed Sheeran’s ‘Shape of You’", key: "diary-ed-sheeran", href: "#" },
  { title: "PLAY Magazine", key: "play-magazine", href: "#" },
  { title: "Zhiyun XS", key: "zhiyun-xs", href: "#" },

  // Science
  { title: "The Antarctica Dispatches", key: "antarctica", href: "#" },
  { title: "How the Dixie Fire Created Its Own Weather", key: "dixie-fire-weather", href: "#" },
  { title: "Inside CERN's Large Hadron Collider", key: "cern", href: "#" },
  { title: "Seeking Pluto's Frigid Heart", key: "pluto", href: "#" },

  // Sports
  { title: "The Gymnast. The Climber.", key: "olympics-ar", href: "#" },
  { title: "Usain Bolt and the Fastest Men in the World", key: "usain-bolt", href: "#" },

  // CV
  { title: "CV", key: "cv", href: "#" },
];

const IMAGES: Record<string, { src: string; alt: string; width: number; height: number }> = {
  "bronx-fire": { src: "/bronx_cover.webp", alt: "Reconstructing the Bronx Fire", width: 800, height: 600 },
  "sow-et-al": { src: "/protests_1.webp", alt: "Sow, et al. – Protests still", width: 800, height: 600 },
  "death-flights": { src: "/deathFlights_2.webp", alt: "The Death Flights Still", width: 800, height: 600 },
  "mexican-metro": { src: "/mm_compressed.webp", alt: "Why the Mexico City Metro Collapsed", width: 600, height: 600 },

  "david-bowie-3d": { src: "/bowie_compressed.webp", alt: "David Bowie in Three Dimensions", width: 800, height: 600 },
  "diary-ed-sheeran": { src: "/edsheeran_cover.webp", alt: "Diary of a Song: Shape of You", width: 800, height: 600 },
  "play-magazine": { src: "/play_1.webp", alt: "PLAY Magazine", width: 700, height: 500 },
  "zhiyun-xs": { src: "/zhiyun_cover.webp", alt: "Zhiyun XS", width: 800, height: 600 },

  "dixie-fire-weather": { src: "/dixie_placeholder.webp", alt: "Dixie Fire Weather", width: 800, height: 600 },
  cern: { src: "/cern_2.webp", alt: "Inside CERN's Large Hadron Collider", width: 800, height: 600 },
  pluto: { src: "/pluto_2.webp", alt: "Seeking Pluto's Frigid Heart", width: 600, height: 600 },

  "olympics-ar": { src: "/olympics_cover.webp", alt: "The Gymnast. The Climber.", width: 800, height: 600 },
  "usain-bolt": { src: "/sprint_2.webp", alt: "Usain Bolt and the Fastest Men in the World", width: 700, height: 500 },
};

const DESCRIPTIONS: Record<string, string> = {
  "immigration-industrial-complex":
    "Client: Lawfare<br /><br />Simplifying the complex network of relationships that make up the deportation-industrial complex.",
  "bronx-fire":
    "Client: The New York Times<br /><br />When the main fire-safety system catastrophically failed in a Bronx apartment building, 17 residents lost their lives.\nThrough smoke analysis and architectural reconstruction, this piece steps viewers through how the tragedy unfolded.<br /><br /><a href='https://www.nytimes.com/interactive/2022/07/08/nyregion/bronx-fire-nyc.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "sow-et-al":
    "Client: National Lawyers Guild<br /><br />Graphic analysis uncovering widespread and pervasive constitutional violations by the NYPD during the 2020 George Floyd protests. \nUsed as key evidence in a successful class-action lawsuit.<br /><br /><a href='https://situ.nyc/research/projects/sow-et-al-v-city-of-new-york-et-al' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "death-flights":
    "Client: Centro Prodh<br /><br />Visual reconstruction of one of the most clandestine programs of Mexico’s so-called Dirty War, bringing testimony to life and revealing the systematic nature of the Death Flights in a nationally aired documentary.<br /><br /><a href='https://www.youtube.com/watch?v=nfGLrxIJcPQ' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "donors":
    "Client: The New York Times<br /><br />Data visualization revealing how just 158 families supplied nearly half of the early money in the race for the White House.<br /><br /><a href='https://www.nytimes.com/interactive/2015/10/11/us/politics/2016-presidential-election-super-pac-donors.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "david-bowie-3d":
    "Client: The New York Times<br /><br />A close look at Bowie’s meticulous eye for detail and the way he defied gender and social conventions in his blockbuster museum retrospective, *David Bowie Is.*<br /><br /><a href='https://www.nytimes.com/interactive/2018/03/20/arts/design/bowie-costumes-ar-3d-ul.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "diary-ed-sheeran":
    "Client: The New York Times<br /><br />Animated data visualizations deconstruct how Ed Sheeran, Johnny McDaid, and Steve Mac built the most-streamed track of 2017.<br /><br /><a href='https://www.youtube.com/watch?v=ZpMNJbt3QDE&t=349s' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "play-magazine":
    "Client: PLAY Magazine<br /><br />Designed the visual identity for the inaugural issue of PLAY, a cookbook-magazine featuring recipes, essays, and artwork from a community of queer chefs, writers, and artists.<br /><br /><a href='https://play.metalabel.com/' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "zhiyun-xs": "Client: Snakk Studio<br /><br />Product visualization and launch campaign for the Smooth-XS.<br /><br /><a href='https://www.youtube.com/watch?v=Ui87X-vDba0' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "mexican-metro":
    "Client: The New York Times<br /><br />An analysis shows the serious construction flaws behind a tragedy that threatened two of Mexico’s most prominent figures.<br /><br /><a href='https://www.nytimes.com/interactive/2021/06/12/world/americas/mexico-city-train-crash.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "dixie-fire-weather":
    "Client: The New York Times<br /><br />See how the Dixie Fire created its own weather. Using high-resolution radar data, which picked up ash particles from smoke plumes and water droplets from clouds, a 3-D model of the Dixie Fire’s massive thunderclouds was constructed.<br /><br /><a href='https://www.nytimes.com/interactive/2021/10/19/climate/dixie-fire-storm-clouds-weather.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "antarctica":
    "Client: The New York Times<br /><br />A four-part documentary series exploring life and science in Antarctica – on, above, and below the ice.<br /><br /><a href='https://www.nytimes.com/2018/07/18/climate/the-antarctica-series.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "pluto":
    "Client: The New York Times<br /><br />Follow New Horizons glide through space and set foot on an alien world, three billion miles from the warmth of the sun.<br /><br /><a href='https://www.nytimes.com/video/science/100000004657443/seeking-plutos-frigid-heart.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "cern":
    "Client: The New York Times<br /><br />Immersive documentary exploring particle collisions at CERN’s Large Hadron Collider.<br /><br /><a href='https://www.nytimes.com/2018/12/21/science/inside-cerns-large-hadron-collider.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "usain-bolt":
    "Client: The New York Times<br /><br />How does Bolt compare to the full Olympic field in the 100-meter dash – not just this year, but against every Olympic medalist since 1896? To answer that question, a massive track was created with 88 lanes – one for every medal awarded in the 100-meter dash in the modern Olympics.<br /><br /><a href='https://www.nytimes.com/interactive/2016/08/15/sports/olympics/usain-bolt-and-120-years-of-sprinting-history.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "olympics-ar":
    "Client: The New York Times<br /><br />Breaking down the movements that make them great. Sunisa Lee is unmatched on the uneven bars, and there’s nothing Adam Ondra can’t climb.",
  cv: "",
};

const MEDIA_PCT: Partial<Record<string, number>> = {
  // Civic
  "immigration-industrial-complex": 75,
  "bronx-fire": 100,
  "sow-et-al": 85,
  "death-flights": 100,
  "donors": 75,
  "mexican-metro": 85,
  // Culture
  "david-bowie-3d": 85,
  "diary-ed-sheeran": 100,
  "play-magazine": 75,
  "zhiyun-xs": 50,
  // Science
  "dixie-fire-weather": 100,
  cern: 85,
  pluto: 100,
  antarctica: 90,
  // Sports
  "olympics-ar": 85,
  "modern-games": 100,
  "usain-bolt": 100,
};

const CULTURE_KEYS = ["david-bowie-3d", "play-magazine", "zhiyun-xs", "diary-ed-sheeran"] as const;
const SPORTS_KEYS = ["usain-bolt", "olympics-ar", "modern-games"] as const;
const SCIENCE_KEYS = ["dixie-fire-weather", "pluto", "antarctica", "cern"] as const;
const CIVIC_KEYS = ["immigration-industrial-complex", "bronx-fire", "death-flights", "donors", "sow-et-al", "mexican-metro"] as const;

const DIAMOND_KEYS = ["bronx-fire", "sow-et-al", "death-flights"] as const;

/* === Badge only for these === */
const CASE_STUDY_KEYS = new Set<string>(["bronx-fire", "sow-et-al", "death-flights"]);

/* ===================== Helpers ===================== */
const sortByTitle = (a: Project, b: Project) => {
  const stripThe = (t: string) => t.replace(/^The\s+/i, "").trim();
  return stripThe(a.title).localeCompare(stripThe(b.title));
};
const CULTURE_LIST = PROJECTS.filter((p) => (CULTURE_KEYS as readonly string[]).includes(p.key)).sort(sortByTitle);
const SPORTS_LIST = PROJECTS.filter((p) => (SPORTS_KEYS as readonly string[]).includes(p.key)).sort(sortByTitle);
const SCIENCE_LIST = PROJECTS.filter((p) => (SCIENCE_KEYS as readonly string[]).includes(p.key)).sort(sortByTitle);
const CIVIC_LIST = PROJECTS.filter((p) => (CIVIC_KEYS as readonly string[]).includes(p.key)).sort(sortByTitle);

const getPct = (key: string) => MEDIA_PCT[key] ?? 100;

/* ===================== Tiny lazy-mount helper (IntersectionObserver) ===================== */
function Lazy({
  rootMargin = "300px",
  children,
}: {
  rootMargin?: string;
  children: (inView: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{children(inView)}</div>;
}

/* ===================== Small helper for robust video loading ===================== */
function SmartVideo({
  srcBase,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "none", // default to none; we switch to 'metadata' when inView
  poster,
  inView = true, // NEW
}: {
  srcBase: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
  poster?: string;
  inView?: boolean;
}) {
  const vref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = vref.current;
    if (!el) return;
    if (!inView) {
      el.pause();
    } else if (autoPlay) {
      el.play().catch(() => {});
    }
  }, [inView, autoPlay]);

  return (
    <video
      ref={vref}
      autoPlay={autoPlay && inView}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={inView ? (preload === "none" ? "metadata" : preload) : "none"}
      className={className}
      poster={poster}
    >
      {inView && (
        <>
          <source src={`${srcBase}.webm`} type="video/webm" />
          <source src={`${srcBase}.mp4`} type="video/mp4" />
        </>
      )}
    </video>
  );
}

/* ===================== Reusable Looping Carousel ===================== */
function LoopingCarousel({
  slides,
  slideWidthPercent = 100,
  autoplayMs,
}: {
  slides: Slide[];
  slideWidthPercent?: number;
  autoplayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!autoplayMs) return;
    stopTimer();
    timerRef.current = setInterval(() => {
      setLocked(true);
      setIsTransitioning(true);
      setIndex((p) => p + 1);
    }, autoplayMs);
  }, [autoplayMs, stopTimer]);

  useEffect(() => {
    if (!autoplayMs) return;

    // random delay between 0–3 seconds so slideshows start out of sync
    const initialDelay = Math.random() * 3000;

    const start = () => {
      startTimer();
      const onVis = () => (document.hidden ? stopTimer() : startTimer());
      document.addEventListener("visibilitychange", onVis);
      return () => {
        stopTimer();
        document.removeEventListener("visibilitychange", onVis);
      };
    };

    const timeout = setTimeout(start, initialDelay);

    return () => {
      clearTimeout(timeout);
      stopTimer();
    };
  }, [autoplayMs, startTimer, stopTimer]);

  const total = slides.length;
  const containerPct = (total + 2) * 100;

  const SlideNode = (s: Slide, i: number) => {
    const common = `object-contain h-auto w-full max-w-none sm:w-[${slideWidthPercent}%] ${s.className ?? ""}`;
    return (
      <div key={i} className="w-full flex justify-center flex-shrink-0">
        {s.type === "video" ? (
          <video src={s.src} autoPlay muted loop playsInline preload="metadata" className={common} />
        ) : (
          <Image src={s.src} alt={s.alt} width={s.width} height={s.height} className={common} sizes={IMG_SIZES} loading="lazy" />
        )}
      </div>
    );
  };

  const handlePrev = () => {
    if (locked) return;
    stopTimer();
    setLocked(true);
    setIsTransitioning(true);
    setIndex((p) => p - 1);
    startTimer();
  };

  const handleNext = () => {
    if (locked) return;
    stopTimer();
    setLocked(true);
    setIsTransitioning(true);
    setIndex((p) => p + 1);
    startTimer();
  };

  return (
    <div className="relative w-full flex justify-center overflow-hidden">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ width: `${containerPct}%`, transform: `translateX(-${(index + 1) * 100}%)` }}
        onTransitionEnd={() => {
          setLocked(false);
          if (index === -1) {
            setIsTransitioning(false);
            setIndex(total - 1);
          } else if (index === total) {
            setIsTransitioning(false);
            setIndex(0);
          } else {
            setIsTransitioning(true);
          }
        }}
      >
        {SlideNode(slides[total - 1], -1)}
        {slides.map((s, i) => SlideNode(s, i))}
        {SlideNode(slides[0], total)}
      </div>

      <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer" aria-label="Previous">
        <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
      </button>
      <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer" aria-label="Next">
        <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
      </button>
    </div>
  );
}

/* ===================== Width helper ===================== */
function Sized({ pct, children }: { pct: number; children: React.ReactNode }) {
  const style = { "--pct": `${pct}%` } as CSSProperties & Record<"--pct", string>;
  return (
    <div className="w-full flex justify-center">
      <div className="pct-box" style={style}>
        {children}
      </div>
    </div>
  );
}

/* ===================== Case Study Badge (hover reveal) ===================== */
function CaseStudyBadge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <span className="bg-white/75 border border-[#4a1f14] text-[#4a1f14] px-3 py-1.5 rounded-sm lowercase leading-none">
        case study
      </span>
    </div>
  );
}

/* ===================== Page ===================== */
export default function Home() {
  const [activeKey, setActiveKey] = useState<string>(PROJECTS[0]?.key ?? "");
  const [isMobile, setIsMobile] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // NEW: track last programmatic scroll timestamp (used by spy pause window)
  const lastProgrammaticRef = useRef(0);

  // Keys that actually render as sections; include CV on mobile so header shows "CV"
  const VISIBLE_KEYS = useMemo(() => {
    const base = PROJECTS.filter((p) => p.key !== "cv").map((p) => p.key);
    return isMobile ? [...base, "cv"] : base;
  }, [isMobile]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const header = document.querySelector(".mobile-header") as HTMLElement | null;
    const scroller = scrollAreaRef.current;

    if (header && scroller) {
      const EXTRA_TOP_GAP = 12; // breathing room between description and top image
      const updatePadding = () => {
        scroller.style.paddingTop = `${header.offsetHeight + EXTRA_TOP_GAP}px`;
      };
      updatePadding();

      const resizeObserver = new ResizeObserver(updatePadding);
      resizeObserver.observe(header);

      window.addEventListener("resize", updatePadding);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updatePadding);
      };
    }
  }, [isMobile]);

  /* ========= Smooth center-based scroll spy (edge overrides) ========= */
  useEffect(() => {
    const scroller = scrollAreaRef.current;
    if (!scroller) return;

    const STABLE_MS = 70;
    const MAX_LAG_MS = 180;
    const IGNORE_MS_AFTER_PROGRAMMATIC = 280;
    const EDGE_THRESHOLD = 8; // snap when within 8px of top/bottom

    let raf = 0;
    let candidateKey = activeKey;
    let candidateSince = performance.now();
    let lastUpdate = candidateSince;

    const measure = (now: number) => {
      raf = 0;

      // briefly pause spy right after programmatic scrolls
      if (now - lastProgrammaticRef.current < IGNORE_MS_AFTER_PROGRAMMATIC) return;

      const { scrollTop, scrollHeight, clientHeight } = scroller;

      // --- Edge overrides so it never "sticks" on fling-to-ends ---
      if (scrollTop <= EDGE_THRESHOLD) {
        const firstKey = VISIBLE_KEYS[0];
        if (activeKey !== firstKey) setActiveKey(firstKey);
        candidateKey = firstKey;
        candidateSince = now;
        lastUpdate = now;
        return;
      }
      const maxTop = scrollHeight - clientHeight;
      if (maxTop - scrollTop <= EDGE_THRESHOLD) {
        const lastKey = VISIBLE_KEYS[VISIBLE_KEYS.length - 1];
        if (activeKey !== lastKey) setActiveKey(lastKey);
        candidateKey = lastKey;
        candidateSince = now;
        lastUpdate = now;
        return;
      }
      // -------------------------------------------------------------

      const centerY = scrollTop + clientHeight / 2;

      let bestKey = candidateKey;
      let bestDist = Infinity;

      for (const key of VISIBLE_KEYS) {
        const el = itemRefs.current[key];
        if (!el) continue;
        const mid = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestKey = key;
        }
      }

      // Eagerly accept new candidate
      if (bestKey !== candidateKey) {
        candidateKey = bestKey;
        candidateSince = now;
      }

      const stableEnough = now - candidateSince >= STABLE_MS;
      const lagging = now - lastUpdate >= MAX_LAG_MS;

      if ((stableEnough || lagging) && activeKey !== candidateKey) {
        setActiveKey(candidateKey);
        lastUpdate = now;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    // initial kick
    onScroll();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeKey, VISIBLE_KEYS]);

  // Smooth programmatic scrolling + mark timestamp so spy pauses briefly
  const scrollToKey = useCallback((key: string) => {
    const el = itemRefs.current[key];
    const scroller = scrollAreaRef.current;
    if (!el || !scroller) return;

    lastProgrammaticRef.current = performance.now();

    // Center the element inside the custom scroller
    const target = el.offsetTop + el.offsetHeight / 2 - scroller.clientHeight / 2;
    scroller.scrollTo({ top: target, behavior: "smooth" });
    setActiveKey(key);

    // small safety window if user interrupts mid-scroll
    setTimeout(() => {
      lastProgrammaticRef.current = 0;
    }, 320);
  }, []);

  /* ===================== Slides ===================== */
  const playSlides: Slide[] = useMemo(
    () => [
      { src: "/play_1.webp", alt: "PLAY Slide 1", width: 700, height: 500 },
      { src: "/play_2.webp", alt: "PLAY Slide 2", width: 700, height: 500 },
      { src: "/play_3.webp", alt: "PLAY Slide 3", width: 700, height: 500 },
      { src: "/play_4.webp", alt: "PLAY Slide 4", width: 700, height: 500 },
    ],
    []
  );

  const donorsSlides: Slide[] = useMemo(
    () => [
      { src: "/election_1_2.webp", alt: "The Families Funding the 2016 Election – Slide 1", width: 1200, height: 800 },
      { src: "/election_2.webp", alt: "The Families Funding the 2016 Election – Slide 2", width: 1200, height: 800 },
      { src: "/election_3.webp", alt: "The Families Funding the 2016 Election – Slide 3", width: 1200, height: 800 },
    ],
    []
  );

  const usainSlides: Slide[] = [
    { type: "video", src: isMobile ? "/sprint_mobile.webm" : "/sprint_1.webm", alt: "Usain Bolt Sprint 1", width: 700, height: 500 },
    { type: "image", src: "/sprint_2.webp", alt: "Usain Bolt Sprint 2", width: 700, height: 500 },
    { type: "image", src: "/sprint_3.webp", alt: "Usain Bolt Sprint 3", width: 700, height: 500 },
  ];

  const mariupolSlides: Slide[] = [
    { src: "/mariupol_1.webp", alt: "Mariupol Slide 1", width: 800, height: 600 },
    { src: "/mariupol_2.webp", alt: "Mariupol Slide 2", width: 800, height: 600 },
  ];

  const deathSlides: Slide[] = [
    { type: "video", src: "/deathFlights_compressed.webm", alt: "Death Flights Video", width: 800, height: 600 },
    { type: "image", src: "/deathFlights_2.webp", alt: "Death Flights Still", width: 800, height: 600 },
  ];

  const dixieSlides: Slide[] = [
    { type: "video", src: "/dixie_compressed_1.webm", alt: "Dixie Fire – Clip 1", width: 1280, height: 720 },
    { type: "video", src: "/dixie_compressed_2.webm", alt: "Dixie Fire – Clip 2", width: 1280, height: 720 },
  ];

  const mexicoMetroSlides: Slide[] = useMemo(
    () => [
      { src: "/mm_1.webp", alt: "Mexico City Metro – 1", width: 1600, height: 900 },
      { src: "/mm_2.webp", alt: "Mexico City Metro – 2", width: 1600, height: 900 },
      { src: "/mm_3.webp", alt: "Mexico City Metro – 3", width: 1600, height: 900 },
    ],
    []
  );

  /* ===================== Render ===================== */
  return (
    <main className="h-screen overflow-x-hidden sm:overflow-x-visible overflow-y-hidden bg-background text-foreground">
      <style jsx global>{`
        .pct-box { width: 100%; }
        @media (min-width: 640px) { .pct-box { width: var(--pct); } }
        .custom-scrollbar .simplebar-content-wrapper { overscroll-behavior-y: contain; }
      `}</style>

      <div className="w-full h-full">
        <div className="flex flex-col sm:flex-row items-start gap-0 h-full min-h-0">
          {/* Left */}
          <aside ref={leftRef} className="w-[245px] shrink-0 sticky top-0 self-start pr-1 hidden sm:block">
            <div className="mb-10 pl-[2px]">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">Grothjan Studio</h2>
            </div>

            <div className="h-px" style={{ backgroundColor: UMBER }} />

            <div className="px-3 mt-3 mb-4">
              <p className="text-[10px] leading-relaxed text-foreground/80 text-left">
                Pulitzer-Finalist and Emmy Award-Winning Data Visualization and Information Design. <br />
                Contact:{" "}
                <a href="mailto:evangrothjan@gmail.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                  evangrothjan@gmail.com
                </a>
              </p>
            </div>

            <div className="h-px" style={{ backgroundColor: UMBER }} />

            <div className="px-3 mt-4">
              <ul className="space-y-[0.1rem] text-left">
                {[{ label: "Civic", list: CIVIC_LIST }, { label: "Culture", list: CULTURE_LIST }, { label: "Science", list: SCIENCE_LIST }, { label: "Sports", list: SPORTS_LIST }].map(
                  ({ label, list }) =>
                    list.length ? (
                      <li key={label} className="w-full">
                        <div className="text-neutral-600 dark:text-neutral-400 uppercase text-xs my-2">{label}</div>
                        <ul className="space-y-[0.1rem]">
                          {list.map(({ title, key }) => {
                            const active = activeKey === key;
                            const isDiamond = (DIAMOND_KEYS as readonly string[]).includes(key);
                            const size = isDiamond ? "w-2 h-2" : "w-2.5 h-2.5";
                            return (
                              <li key={key} className={`flex items-start gap-2 ${isDiamond ? "pl-[2px]" : ""}`}>
                                <span
                                  aria-hidden
                                  className={`${size} flex-none transition-transform duration-200 ease-out ${isDiamond ? "" : "rounded-full"}`}
                                  style={{
                                    backgroundColor: active ? "rgb(220 38 38)" : "transparent",
                                    transform: `${active ? "scale(1)" : "scale(0.8)"} ${isDiamond ? "rotate(45deg)" : ""}`,
                                    marginTop: "calc((1.125rem - 0.625rem) / 2)",
                                  }}
                                />
                                <button
                                  onClick={() => scrollToKey(key)}
                                  className="block text-[10px] leading-[1.125rem] text-foreground/90 hover:text-red-500 dark:hover:text-red-400 text-left whitespace-nowrap cursor-pointer"
                                >
                                  {title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ) : null
                )}
              </ul>
            </div>

            <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />

            {DESCRIPTIONS[activeKey] && (
              <div
                className="px-3 text-[10px] leading-relaxed text-red-500 dark:text-red-400"
                dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[activeKey] }}
              />
            )}
          </aside>

          {/* Vertical divider */}
          <div className="w-px h-full hidden sm:block" style={{ backgroundColor: UMBER }} />

          {/* Middle */}
          <div className="flex-1 min-w-0 min-h-0 h-full">
            <SimpleBar
              scrollableNodeProps={{ ref: scrollAreaRef }}
              style={{ height: "100%" }}
              className="w-full sm:max-w-[1200px] sm:mx-auto pt-[50px] sm:pt-0 pb-20 sm:pb-3 flex flex-col items-stretch sm:items-center border-b custom-scrollbar h-full overflow-x-hidden sm:overflow-x-visible px-0"
              autoHide={false}
            >
              <style>{`.simplebar-content-wrapper + .border-b { border-bottom-color: ${UMBER}; }`}</style>

              {/* Mobile header */}
              <div className="mobile-header sm:hidden fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-black border-b px-3 py-2" style={{ borderColor: UMBER }}>
                <h2 className="text-[12px] font-medium text-red-500 dark:text-red-400">
                  {activeKey === "cv" ? "CV" : PROJECTS.find((p) => p.key === activeKey)?.title}
                </h2>

                {activeKey !== "cv" && DESCRIPTIONS[activeKey] && (
                  <div
                    className="text-[10px] leading-relaxed text-foreground/80 mt-1"
                    dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[activeKey] }}
                  />
                )}
              </div>

              {/* Desktop header */}
              <div className="hidden sm:block w-full text-left">
                <div className="mb-10 pl-[2px]">
                  <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">Select Projects</h2>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: UMBER }} />
              </div>

              {PROJECTS.filter((p) => p.key !== "cv").map((p, idx) => {
                const img = IMAGES[p.key];
                const pct = getPct(p.key);

                // Hover-only for the marked case-study keys
                const showCaseStudy = CASE_STUDY_KEYS.has(p.key);

                const Placeholder = (
                  <Sized pct={pct}>
                    <div className="aspect-[16/9] border border-dashed grid place-items-center text-[10px]" style={{ borderColor: `${UMBER}99`, color: `${UMBER}cc` }}>
                      Media coming soon
                    </div>
                  </Sized>
                );

                return (
                  <div
                    key={p.key}
                    data-key={p.key}
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[p.key] = el;
                    }}
                    className="w-full flex flex-col items-center"
                  >
                    {idx === 0 && <div style={{ height: GAP }} />}

                    {/* Media wrapper is a hover group so the badge fades in */}
                    <div className="relative group">
                      {p.key === "play-magazine" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={playSlides} slideWidthPercent={100} autoplayMs={8000} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : p.key === "donors" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={donorsSlides} slideWidthPercent={100} autoplayMs={8000} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : p.key === "mexican-metro" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={mexicoMetroSlides} slideWidthPercent={100} autoplayMs={8000} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : p.key === "usain-bolt" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={usainSlides} slideWidthPercent={100} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : p.key === "dixie-fire-weather" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={dixieSlides} slideWidthPercent={100} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : p.key === "diary-ed-sheeran" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => (
                              <SmartVideo srcBase="/edsheeran_compressed" className="object-contain w-full h-auto" preload="none" inView={inView} />
                            )}
                          </Lazy>
                        </Sized>
                      ) : p.key === "death-flights" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => (
                              <Link href="/work/the-death-flights" aria-label="Open The Death Flights project" className="block cursor-pointer">
                                <SmartVideo srcBase="/deathFlights_compressed" className="object-contain w-full h-auto" preload="none" inView={inView} />
                              </Link>
                            )}
                          </Lazy>
                        </Sized>
                      ) : p.key === "sow-et-al" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) =>
                              inView ? (
                                <Link href="/work/george-floyd-protests-2020" aria-label="Open Sow, et al. v. City of New York, et al." className="block cursor-pointer">
                                  <Image
                                    src="/protests_1.webp"
                                    alt="Sow, et al. – George Floyd Protests"
                                    width={800}
                                    height={600}
                                    className="object-contain w-full h-auto"
                                    sizes={IMG_SIZES}
                                    loading="lazy"
                                  />
                                </Link>
                              ) : (
                                <div className="aspect-[4/3] w-full" />
                              )
                            }
                          </Lazy>
                        </Sized>
                      ) : p.key === "bronx-fire" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => (
                              <Link href="/work/bronx-fire" aria-label="Open Reconstructing the Bronx Fire" className="block cursor-pointer">
                                <SmartVideo srcBase="/bronx_compressed_2" className="object-contain w-full h-auto" preload="none" inView={inView} />
                              </Link>
                            )}
                          </Lazy>
                        </Sized>
                      ) : p.key === "olympics-ar" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => (
                              <SmartVideo srcBase="/olympicsAR_compressed_2" className="object-contain w-full h-auto" preload="none" inView={inView} />
                            )}
                          </Lazy>
                        </Sized>
                      ) : p.key === "pluto" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => <SmartVideo srcBase="/pluto_compressed" className="object-contain w-full h-auto" preload="none" inView={inView} />}
                          </Lazy>
                        </Sized>
                      ) : p.key === "antarctica" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => <SmartVideo srcBase="/antarctica" className="object-contain w-full h-auto" preload="none" inView={inView} />}
                          </Lazy>
                        </Sized>
                      ) : p.key === "david-bowie-3d" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => (
                              <SmartVideo
                                srcBase="/bowie"
                                className="object-contain w-full h-auto"
                                preload="none"
                                loop
                                autoPlay
                                muted
                                playsInline
                                inView={inView}
                              />
                            )}
                          </Lazy>
                        </Sized>
                      ) : p.key === "immigration-industrial-complex" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => <SmartVideo srcBase="/iic" className="object-contain w-full h-auto" preload="none" inView={inView} />}
                          </Lazy>
                        </Sized>
                      ) : p.key === "zhiyun-xs" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) => <SmartVideo srcBase="/zhiyun_compressed" className="object-contain w-full h-auto" preload="none" inView={inView} />}
                          </Lazy>
                        </Sized>
                      ) : p.key === "mariupol" ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="500px">
                            {(inView) => (inView ? <LoopingCarousel slides={mariupolSlides} slideWidthPercent={100} /> : <div className="aspect-[16/9] w-full" />)}
                          </Lazy>
                        </Sized>
                      ) : img ? (
                        <Sized pct={pct}>
                          <Lazy rootMargin="400px">
                            {(inView) =>
                              inView ? (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={img.width}
                                  height={img.height}
                                  className="object-contain w-full"
                                  priority={idx === 0}
                                  sizes={IMG_SIZES}
                                  loading={idx === 0 ? "eager" : "lazy"}
                                />
                              ) : (
                                <div className="aspect-[16/9] w-full" />
                              )
                            }
                          </Lazy>
                        </Sized>
                      ) : p.key === "antarctica" || p.key === "cern" || p.key === "david-bowie-3d" || p.key === "modern-games" ? (
                        Placeholder
                      ) : null}

                      {/* Hover-only CASE STUDY badge */}
                      {showCaseStudy && <CaseStudyBadge />}
                    </div>

                    {/* Divider with equal buffers */}
                    <div className="flex flex-col items-center w-full">
                      <div style={{ height: GAP }} />
                      <div className="h-px w-full" style={{ backgroundColor: UMBER }} />
                      <div
                        style={{
                          height:
                            isMobile && idx === PROJECTS.filter((p) => p.key !== "cv").length - 1
                              ? 0
                              : GAP,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Mobile-only CV (full-bleed lines, extra bottom padding) */}
              <div
                ref={(el) => {
                  itemRefs.current["cv"] = el;
                }}
                className="sm:hidden w-full px-3 pt-4 pb-14 text-[10px] leading-relaxed"
              >
                <div className="mb-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Group Exhibitions</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>Prada Foundation, 2025 Venice Biennali, <em>Diagrams</em> <br /> 2025</li>
                    <li>Architekturmuseum der TUM, <em>Visual Investigations</em> <br /> 2024</li>
                  </ul>
                </div>

                {/* full-bleed line */}
                <div className="-mx-3">
                  <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />
                </div>

                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Select Awards</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>Pulitzer Finalist, <em>Bronx Fire</em> <br /> 2023</li>
                    <li>SND Bronze, <em>Bronx Fire</em> <br /> 2023</li>
                    <li>SND Silver, <em>Dixie Fire</em> <br /> 2022</li>
                    <li>Emmy Winner, <em>One Building, One Bomb</em> <br /> 2019</li>
                    <li>SND &amp; Malofiej Medals, <em>Apollo 11</em> <br /> 2019</li>
                    <li>World Press Photo, <em>Under a Cracked Sky</em> <br /> 2018</li>
                  </ul>
                </div>

                {/* full-bleed line */}
                <div className="-mx-3">
                  <div className="h-px my-4 w-full sm:my-3" style={{ backgroundColor: UMBER }} />
                </div>

                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Clients</h3>
                  <p className="text-[10px]">
                    Bloomberg, Human Rights Watch, Meta, MTV, National Lawyers Guild, The New York Times, Vogue, Vox
                  </p>
                </div>
              </div>
            </SimpleBar>
          </div>

          {/* Vertical divider */}
          <div className="w-px h-full hidden sm:block" style={{ backgroundColor: UMBER }} />

          {/* Right (CV) */}
          <aside className="basis-[clamp(13rem,17vw,19rem)] max-w-[22rem] grow-0 shrink-0 sticky top-0 self-start text-[10px] leading-relaxed px-1 hidden sm:block">
            <div className="mb-10">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">CV</h2>
            </div>

            {/* Move the top line + below up slightly; keep the "CV" title fixed */}
            <div className="translate-y-[-2px]">
              <div className="h-px mb-4 w-full" style={{ backgroundColor: UMBER }} />

              <div className="w-full mt-4 mb-4">
                <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Group Exhibitions</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>Prada Foundation, Venice Biennali, <em>Diagrams</em> <br /> 2025</li>
                    <li>Architekturmuseum TUM, <em>Visual Investigations</em> <br /> 2024</li>
                  </ul>
                </div>
              </div>

              <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />

              <div className="w-full mt-4 mb-4">
                <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Select Awards</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>Pulitzer Finalist, <em>Bronx Fire</em> <br /> 2023</li>
                    <li>SND Bronze, <em>Bronx Fire</em> <br /> 2023</li>
                    <li>SND Silver, <em>Dixie Fire</em> <br /> 2022</li>
                    <li>Emmy Winner, <em>One Building, One Bomb</em> <br /> 2019</li>
                    <li>SND &amp; Malofiej Medals, <em>Apollo 11</em> <br /> 2019</li>
                    <li>World Press Photo, <em>Under a Cracked Sky</em> <br /> 2018</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />

            <div className="w-full mt-4 mb-4">
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Clients</h3>
              </div>
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <p className="text-[10px]">Bloomberg, Human Rights Watch, Meta, MTV, National Lawyers Guild, The New York Times, Vogue, Vox</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
