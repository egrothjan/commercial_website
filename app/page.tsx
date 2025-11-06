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
  "diary-ed-sheeran": { src: "/edsheeran_cover.webp", alt: "Diary of a Song: Shape of You", width: 800, height: 600 },

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
    "Client: The New York Times<br /><br />The main fire-safety system failed in a Bronx apartment building, and 17 residents lost their lives. Through smoke analysis and architectural reconstruction, viewers are stepped through how the tragedy unfolded.<br /><br /><a href='https://www.nytimes.com/interactive/2022/07/08/nyregion/bronx-fire-nyc.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "sow-et-al":
    "Client: National Lawyers Guild<br /><br />Graphic analysis uncovering widespread and pervasive constitutional violations by the NYPD during the 2020 George Floyd protests. The work was used as key evidence in a successful class-action lawsuit.<br /><br /><a href='https://situ.nyc/research/projects/sow-et-al-v-city-of-new-york-et-al' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "death-flights":
    "Client: Centro Prodh<br /><br />Visual reconstruction of one of the most clandestine programs of Mexico’s so-called Dirty War, revealing the systematic nature of the Death Flights in a nationally aired documentary.<br /><br /><a href='https://www.youtube.com/watch?v=nfGLrxIJcPQ' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "donors":
    "Client: The New York Times<br /><br />Data visualization revealing how just 158 families supplied nearly half of the early money in the race for the White House.<br /><br /><a href='https://www.nytimes.com/interactive/2015/10/11/us/politics/2016-presidential-election-super-pac-donors.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "david-bowie-3d":
    "Client: The New York Times<br /><br />A closer look at Bowie’s meticulous eye for detail and the way he defied gender and social conventions in the blockbuster museum retrospective, *David Bowie Is.*<br /><br /><a href='https://www.nytimes.com/interactive/2018/03/20/arts/design/bowie-costumes-ar-3d-ul.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "diary-ed-sheeran":
    "Client: The New York Times<br /><br />Animated data visualization deconstructing how Ed Sheeran, Johnny McDaid, and Steve Mac built the most-streamed track of 2017.<br /><br /><a href='https://www.youtube.com/watch?v=ZpMNJbt3QDE&t=349s' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "play-magazine":
    "Client: PLAY Magazine<br /><br />Designed the visual identity for the inaugural issue of PLAY, a cookbook-magazine featuring recipes, essays, and artwork from a community of queer chefs, writers, and artists.<br /><br /><a href='https://play.metalabel.com/' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "zhiyun-xs": "Client: Snakk Studio<br /><br />Product visualization and launch campaign for the Smooth-XS.<br /><br /><a href='https://www.youtube.com/watch?v=Ui87X-vDba0' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "mexican-metro":
    "Client: The New York Times<br /><br />Data visualization showing the serious construction flaws behind a tragedy that threatened two of Mexico’s most prominent figures.<br /><br /><a href='https://www.nytimes.com/interactive/2021/06/12/world/americas/mexico-city-train-crash.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "dixie-fire-weather":
    "Client: The New York Times<br /><br />High-resolution radar data, picking up ash particles and water droplets, is used to reconstruct a 3-D model of the Dixie Fire to visualize how it created its own weather.<br /><br /><a href='https://www.nytimes.com/interactive/2021/10/19/climate/dixie-fire-storm-clouds-weather.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "antarctica":
    "Client: The New York Times<br /><br />A four-part documentary series exploring life and science in Antarctica – on, above, and below the ice.<br /><br /><a href='https://www.nytimes.com/2018/07/18/climate/the-antarctica-series.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "pluto":
    "Client: The New York Times<br /><br />Follow New Horizons glide through space and set foot on an alien world, three billion miles from the warmth of the sun.<br /><br /><a href='https://www.nytimes.com/video/science/100000004657443/seeking-plutos-frigid-heart.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "cern":
    "Client: The New York Times<br /><br />Immersive documentary exploring particle collisions at CERN’s Large Hadron Collider.<br /><br /><a href='https://www.nytimes.com/2018/12/21/science/inside-cerns-large-hadron-collider.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "usain-bolt":
    "Client: The New York Times<br /><br />How does Bolt compare to every Olympic medalist since 1896? To answer that, a massive track with 88 lanes shows every medal ever awarded in the 100-meter dash in the modern Olympics.<br /><br /><a href='https://www.nytimes.com/interactive/2016/08/15/sports/olympics/usain-bolt-and-120-years-of-sprinting-history.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
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
  "usain-bolt": 100,
};

const CULTURE_KEYS = ["david-bowie-3d", "play-magazine", "zhiyun-xs", "diary-ed-sheeran"] as const;
const SPORTS_KEYS = ["usain-bolt", "olympics-ar"] as const;
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

/* ===================== Small helper for robust video loading ===================== */
function SmartVideo({
  srcBase,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  poster,
}: {
  srcBase: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
  poster?: string;
}) {
  return (
    <video autoPlay={autoPlay} muted={muted} loop={loop} playsInline={playsInline} preload={preload} className={className} poster={poster}>
      <source src={`${srcBase}.webm`} type="video/webm" />
      <source src={`${srcBase}.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
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

  // Timer refs typed for DOM environment
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!autoplayMs) return;
    stopTimer();
    timerRef.current = window.setInterval(() => {
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

    const timeout = window.setTimeout(start, initialDelay);

    return () => {
      window.clearTimeout(timeout);
      stopTimer();
    };
  }, [autoplayMs, startTimer, stopTimer]);

  const total = slides.length;
  const containerPct = (total + 2) * 100;

  // width control via CSS var (prevents Tailwind dynamic-class lint)
  const slideStyle = { "--slide-pct": `${slideWidthPercent}%` } as Record<"--slide-pct", string> & CSSProperties;

  const SlideNode = (s: Slide, i: number) => (
    <div key={i} className="w-full flex justify-center flex-shrink-0">
      {s.type === "video" ? (
        <video
          src={s.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`object-contain h-auto max-w-none slide-inner ${s.className ?? ""}`}
          style={slideStyle}
        />
      ) : (
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          className={`object-contain h-auto max-w-none slide-inner ${s.className ?? ""}`}
          style={slideStyle}
        />
      )}
    </div>
  );

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
  const style = { "--pct": `${pct}%` } as Record<"--pct", string> & CSSProperties;
  return (
    <div className="w-full flex justify-center">
      <div className="pct-box" style={style}>
        {children}
      </div>
    </div>
  );
}

/* ===================== Case Study Badges ===================== */
/** Desktop/hover badge (non-interactive, fades in on hover) */
function CaseStudyBadgeHover() {
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

/** Mobile-only clickable badge overlay (~35% smaller) */
function CaseStudyBadgeMobile({ href, aria }: { href: string; aria: string }) {
  return (
    <Link
      href={href}
      aria-label={aria}
      className="sm:hidden absolute bottom-3 left-3 z-10"
    >
      <span
        className="
          inline-block transform scale-124  /* ~25% smaller safely */
          bg-white/75 border border-[#4a1f14] text-[#4a1f14]
          px-2 py-1 text-[9px]              /* tighter padding & text to reach ~35% total */
          rounded-sm lowercase leading-none shadow
          origin-bottom-left
        "
      >
        case study
      </span>
    </Link>
  );
}

/* ===================== Page ===================== */
export default function Home() {
  const [activeKey, setActiveKey] = useState<string>(PROJECTS[0]?.key ?? "");
  const [isMobile, setIsMobile] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // track last programmatic scroll timestamp (used by spy pause window)
  const lastProgrammaticRef = useRef(0);

  // Stable mobile header (freeze box height; grow to tallest)
  const [mobileHeaderH, setMobileHeaderH] = useState(128);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  // Keys that actually render as sections (exclude CV here on desktop)
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

  // Keep mobile header height stable; cache tallest; sync scroller padding
useEffect(() => {
  if (!isMobile) return;

  const EXTRA_TOP_GAP = 12;

  const measureAndSync = () => {
    const header = mobileHeaderRef.current;
    const scroller = scrollAreaRef.current;
    if (!header || !scroller) return; // guard INSIDE the function

    // Measure natural height
    const prev = header.style.height;
    header.style.height = "auto";
    const natural = header.getBoundingClientRect().height; // safer than offsetHeight
    header.style.height = prev;

    // Update using functional set to avoid stale closure,
    // and do padding/height writes in the same tick.
    setMobileHeaderH((prevH) => {
      const next = Math.max(prevH, natural);
      scroller.style.paddingTop = `${next + EXTRA_TOP_GAP}px`;
      // lock the header box to the tallest seen so far (prevents jitter)
      header.style.height = `${next}px`;
      return next;
    });
  };

  // Initial measure after paint
  const raf = requestAnimationFrame(measureAndSync);

  // React to header content changes
  const ro = new ResizeObserver(() => measureAndSync());
  if (mobileHeaderRef.current) ro.observe(mobileHeaderRef.current);

  // React to viewport changes
  const onResize = () => measureAndSync();
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("resize", onResize);
  };
// Recompute when content swaps in the header (activeKey) or mobile mode flips.
}, [isMobile, activeKey]);


  /* ========= Smooth center-based scroll spy (edge overrides) ========= */
  useEffect(() => {
    const scroller = scrollAreaRef.current;
    if (!scroller) return;

    const STABLE_MS = 70;
    const MAX_LAG_MS = 180;
    const IGNORE_MS_AFTER_PROGRAMMATIC = 280;
    const EDGE_THRESHOLD = 8;

    let raf = 0;
    let candidateKey = activeKey;
    let candidateSince = performance.now();
    let lastUpdate = candidateSince;

    const measure = (now: number) => {
      raf = 0;

      if (now - lastProgrammaticRef.current < IGNORE_MS_AFTER_PROGRAMMATIC) return;

      const { scrollTop, scrollHeight, clientHeight } = scroller;

      // Edge snap
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

    onScroll();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeKey, VISIBLE_KEYS]);

  // Smooth programmatic scrolling + brief spy pause
  const scrollToKey = useCallback((key: string) => {
    const el = itemRefs.current[key];
    const scroller = scrollAreaRef.current;
    if (!el || !scroller) return;

    lastProgrammaticRef.current = performance.now();

    const target = el.offsetTop + el.offsetHeight / 2 - scroller.clientHeight / 2;
    scroller.scrollTo({ top: target, behavior: "smooth" });
    setActiveKey(key);

    window.setTimeout(() => {
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

  // Mobile-first source for sprint video
  const usainSlides: Slide[] = useMemo(
    () => [
      {
        type: "video",
        src: isMobile ? "/sprint_mobile.webm" : "/sprint_final.webm",
        alt: "Usain Bolt Sprint 1",
        width: 700,
        height: 500,
      },
      { type: "image", src: "/sprint_2.webp", alt: "Usain Bolt Sprint 2", width: 700, height: 500 },
      { type: "image", src: "/sprint_3.webp", alt: "Usain Bolt Sprint 3", width: 700, height: 500 },
    ],
    [isMobile]
  );

  const mexicoMetroSlides: Slide[] = useMemo(
    () => [
      { src: "/mm_1.webp", alt: "Mexico City Metro – 1", width: 1600, height: 900 },
      { src: "/mm_2.webp", alt: "Mexico City Metro – 2", width: 1600, height: 900 },
      { src: "/mm_3.webp", alt: "Mexico City Metro – 3", width: 1600, height: 900 },
    ],
    []
  );

  /* ===================== Render ===================== */
  const nonCVProjects = PROJECTS.filter((p) => p.key !== "cv");
  const lastIndex = nonCVProjects.length - 1;

  return (
    <main className="h-screen overflow-x-hidden sm:overflow-x-visible overflow-y-hidden bg-background text-foreground">
      <style jsx global>{`
        .pct-box { width: 100%; }
        @media (min-width: 640px) { .pct-box { width: var(--pct); } }
        .custom-scrollbar .simplebar-content-wrapper { overscroll-behavior-y: contain; }
        .slide-inner { width: 100%; }
        @media (min-width: 640px) { .slide-inner { width: var(--slide-pct, 100%); } }
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
                Pulitzer-Finalist and Emmy Award-Winning design & animation. <br />
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
              {/* Mobile header (fixed height box; grows to tallest) */}
              <div
                ref={mobileHeaderRef}
                className="mobile-header sm:hidden fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-black border-b px-3 py-2 overflow-hidden"
                style={{ borderColor: UMBER, height: `${mobileHeaderH}px` }}
              >
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

              {nonCVProjects.map((p, idx) => {
                const img = IMAGES[p.key];
                const pct = getPct(p.key);
                const showCaseStudy = CASE_STUDY_KEYS.has(p.key);

                const Placeholder = (
                  <Sized pct={pct}>
                    <div className="aspect-[16/9] border border-dashed grid place-items-center text-[10px]" style={{ borderColor: `${UMBER}99`, color: `${UMBER}cc` }}>
                      Media coming soon
                    </div>
                  </Sized>
                );

                // Extra top buffer above the FIRST project (Death Flights) on MOBILE only
                const extraTopMobileFirst = isMobile && idx === 0 ? 20 : 0;

                return (
                  <div
                    key={p.key}
                    data-key={p.key}
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[p.key] = el;
                    }}
                    className="w-full flex flex-col items-center"
                  >
                    {idx === 0 && <div style={{ height: GAP + extraTopMobileFirst }} />}

                    {/* Media wrapper is a hover group so the desktop badge fades in */}
                    <div className="relative group">
                      {p.key === "play-magazine" ? (
                        <Sized pct={pct}>
                          <LoopingCarousel slides={playSlides} slideWidthPercent={100} autoplayMs={8000} />
                        </Sized>
                      ) : p.key === "donors" ? (
                        <Sized pct={pct}>
                          <LoopingCarousel slides={donorsSlides} slideWidthPercent={100} autoplayMs={8000} />
                        </Sized>
                      ) : p.key === "mexican-metro" ? (
                        <Sized pct={pct}>
                          <LoopingCarousel slides={mexicoMetroSlides /* typo guard not needed if correct var */ as unknown as Slide[]} slideWidthPercent={100} autoplayMs={8000} />
                        </Sized>
                      ) : null}

                      {p.key === "play-magazine" || p.key === "mexican-metro" || p.key === "donors" ? null : p.key === "usain-bolt" ? (
                        <Sized pct={pct}>
                          <LoopingCarousel slides={usainSlides} slideWidthPercent={100} />
                        </Sized>
                      ) : p.key === "dixie-fire-weather" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/dixie_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "diary-ed-sheeran" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/edsheeran_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "death-flights" ? (
                        <Sized pct={pct}>
                          <Link href="/work/the-death-flights" aria-label="Open The Death Flights project" className="block cursor-pointer">
                            <SmartVideo srcBase="/deathFlights_final" className="object-contain w-full h-auto" preload="metadata" />
                          </Link>
                        </Sized>
                      ) : p.key === "sow-et-al" ? (
                        <Sized pct={pct}>
                          <Link href="/work/george-floyd-protests-2020" aria-label="Open Sow, et al. v. City of New York, et al." className="block cursor-pointer">
                            <Image src="/protests_1.webp" alt="Sow, et al. – George Floyd Protests" width={800} height={600} className="object-contain w-full h-auto" />
                          </Link>
                        </Sized>
                      ) : p.key === "bronx-fire" ? (
                        <Sized pct={pct}>
                          <Link href="/work/bronx-fire" aria-label="Open Reconstructing the Bronx Fire" className="block cursor-pointer">
                            <SmartVideo srcBase="/bronx_final" className="object-contain w-full h-auto" preload="metadata" />
                          </Link>
                        </Sized>
                      ) : p.key === "olympics-ar" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/olympicsAR_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "pluto" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/pluto_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "antarctica" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/antarctica_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "david-bowie-3d" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/bowie_final" className="object-contain w-full h-auto" preload="metadata" loop autoPlay muted playsInline />
                        </Sized>
                      ) : p.key === "immigration-industrial-complex" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/iic_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : p.key === "zhiyun-xs" ? (
                        <Sized pct={pct}>
                          <SmartVideo srcBase="/zhiyun_final" className="object-contain w-full h-auto" preload="metadata" />
                        </Sized>
                      ) : img ? (
                        <Sized pct={pct}>
                          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="object-contain w-full" priority={idx === 0} />
                        </Sized>
                      ) : p.key === "antarctica" || p.key === "cern" || p.key === "david-bowie-3d" ? (
                        Placeholder
                      ) : null}

                      {/* Desktop hover badge */}
                      {showCaseStudy && <CaseStudyBadgeHover />}

                      {/* Mobile clickable badge for the three case-study projects */}
                      {showCaseStudy && (
                        <CaseStudyBadgeMobile
                          href={
                            p.key === "death-flights"
                              ? "/work/the-death-flights"
                              : p.key === "bronx-fire"
                              ? "/work/bronx-fire"
                              : "/work/george-floyd-protests-2020"
                          }
                          aria={
                            p.key === "death-flights"
                              ? "Open The Death Flights case study"
                              : p.key === "bronx-fire"
                              ? "Open Reconstructing the Bronx Fire case study"
                              : "Open Sow, et al. v. City of New York, et al. case study"
                          }
                        />
                      )}
                    </div>

                    {/* Divider with equal buffers (always keep bottom gap, including last, on mobile) */}
                    <div className="flex flex-col items-center w-full">
                      <div style={{ height: GAP }} />
                      <div className="h-px w-full" style={{ backgroundColor: UMBER }} />
                      <div style={{ height: GAP }} />
                    </div>
                  </div>
                );
              })}

              {/* Mobile-only CV (full-bleed lines, extra bottom padding to keep some room after clients) */}
              <div
                ref={(el) => {
                  itemRefs.current["cv"] = el;
                }}
                className="sm:hidden w-full px-3 pt-4 pb-16 text-[10px] leading-relaxed"
              >
                <div className="mb-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Group Exhibitions</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>
                      Prada Foundation, 2025 Venice Biennali, <em>Diagrams</em> <br /> 2025
                    </li>
                    <li>
                      Architekturmuseum der TUM, <em>Visual Investigations</em> <br /> 2024
                    </li>
                  </ul>
                </div>

                {/* full-bleed line */}
                <div className="-mx-3">
                  <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />
                </div>

                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Select Awards</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>
                      Pulitzer Finalist, <em>Bronx Fire</em> <br /> 2023
                    </li>
                    <li>
                      SND Bronze, <em>Bronx Fire</em> <br /> 2023
                    </li>
                    <li>
                      SND Silver, <em>Dixie Fire</em> <br /> 2022
                    </li>
                    <li>
                      Emmy Winner, <em>One Building, One Bomb</em> <br /> 2019
                    </li>
                    <li>
                      SND &amp; Malofiej Medals, <em>Apollo 11</em> <br /> 2019
                    </li>
                    <li>
                      World Press Photo, <em>Under a Cracked Sky</em> <br /> 2018
                    </li>
                  </ul>
                </div>

                {/* full-bleed line */}
                <div className="-mx-3">
                  <div className="h-px my-4 w-full sm:my-3" style={{ backgroundColor: UMBER }} />
                </div>

                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Clients</h3>
                  <p className="text-[10px]">Bloomberg, Human Rights Watch, Meta, MTV, National Lawyers Guild, The New York Times, Vogue, Vox</p>
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

            <div className="translate-y-[-2px]">
              <div className="h-px mb-4 w-full" style={{ backgroundColor: UMBER }} />

              <div className="w-full mt-4 mb-4">
                <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Group Exhibitions</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>
                      Prada Foundation, Venice Biennali, <em>Diagrams</em> <br /> 2025
                    </li>
                    <li>
                      Architekturmuseum TUM, <em>Visual Investigations</em> <br /> 2024
                    </li>
                  </ul>
                </div>
              </div>

              <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER }} />

              <div className="w-full mt-4 mb-4">
                <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Select Awards</h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>
                      Pulitzer Finalist, <em>Bronx Fire</em> <br /> 2023
                    </li>
                    <li>
                      SND Bronze, <em>Bronx Fire</em> <br /> 2023
                    </li>
                    <li>
                      SND Silver, <em>Dixie Fire</em> <br /> 2022
                    </li>
                    <li>
                      Emmy Winner, <em>One Building, One Bomb</em> <br /> 2019
                    </li>
                    <li>
                      SND &amp; Malofiej Medals, <em>Apollo 11</em> <br /> 2019
                    </li>
                    <li>
                      World Press Photo, <em>Under a Cracked Sky</em> <br /> 2018
                    </li>
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
