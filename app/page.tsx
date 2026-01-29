"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ===================== Types ===================== */
type Project = { title: string; key: string; href: string };

/* ===================== Constants ===================== */
const UMBER = "#4a1f14";
const GAP = 65;
const MID_GAP = Math.round(GAP * 0.5);
const RULE_INSET_PX = 0; // <-- add this

const PROJECTS: Project[] = [
  // Motion
  { title: "Diary of a Song: Ed Sheeran’s ‘Shape of You’", key: "diary-ed-sheeran", href: "#" },
  { title: "NYT Social Content", key: "olympics-ar", href: "#" },
  { title: "Zhiyun XS", key: "zhiyun-xs", href: "#" },
  { title: "Seeking Pluto's Frigid Heart", key: "pluto", href: "#" },

  // Design (Editorial Design)
  { title: "PLAY Magazine", key: "play-magazine", href: "#" },
  { title: "Families Funding the Election", key: "donors", href: "#" },
  { title: "Sow, et al. v. City of New York", key: "sow-et-al", href: "#" },
  { title: "Usain Bolt and the Fastest Men in the World", key: "usain-bolt", href: "#" },

  // Interactive
  { title: "David Bowie in Three Dimensions", key: "david-bowie-3d", href: "#" },
  { title: "Google: Virtual Reality", key: "google-headsets", href: "#" },
  { title: "Instagram: Augmented Reality", key: "meta-ar", href: "#" },

  // Infographics / Reconstruction
  { title: "Reconstructing the Bronx Fire", key: "bronx-fire", href: "/work/bronx-fire" },
  { title: "How the Dixie Fire Created Its Own Weather", key: "dixie-fire-weather", href: "#" },
  { title: "Why the Mexico City Metro Collapsed", key: "mexican-metro", href: "#" },

  // CV
  { title: "CV", key: "cv", href: "#" },
];

const IMAGES: Record<string, { src: string; alt: string; width: number; height: number }> = {
  "bronx-fire": { src: "/bronx_cover.webp", alt: "Reconstructing the Bronx Fire", width: 800, height: 600 },
  "sow-et-al": { src: "/protests_1.webp", alt: "Sow, et al. – Protests still", width: 800, height: 600 },
  "diary-ed-sheeran": { src: "/edsheeran_cover.webp", alt: "Diary of a Song: Shape of You", width: 800, height: 600 },
  "zhiyun-xs": { src: "/zhiyun_cover.webp", alt: "Zhiyun XS", width: 800, height: 600 },
  "dixie-fire-weather": { src: "/dixie_placeholder.webp", alt: "Dixie Fire Weather", width: 800, height: 600 },
  pluto: { src: "/pluto_2.webp", alt: "Seeking Pluto's Frigid Heart", width: 600, height: 600 },
  "olympics-ar": { src: "/olympics_cover.webp", alt: "NYT Social Content", width: 800, height: 600 },
  "usain-bolt": { src: "/sprint_2.webp", alt: "Usain Bolt and the Fastest Men in the World", width: 700, height: 500 },
  "google-headsets": { src: "/dixie_placeholder.webp", alt: "Google Headsets (placeholder)", width: 800, height: 600 },
  "meta-ar": { src: "/dixie_placeholder.webp", alt: "Meta AR (placeholder)", width: 800, height: 600 },
};

const DESCRIPTIONS: Record<string, string> = {
  "diary-ed-sheeran":
    "Client: The New York Times<br /><br />Animated data visualization deconstructing how Ed Sheeran, Johnny McDaid, and Steve Mac built the most-streamed track of 2017. Over 3.8 million views. <br /><br /><a href='https://www.youtube.com/watch?v=ZpMNJbt3QDE&t=349s' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "olympics-ar":
    "Client: The New York Times<br /><br />Breaking down the movements that make them great. Sunisa Lee is unmatched on the uneven bars, and there’s nothing Adam Ondra can’t climb.",
  "zhiyun-xs":
    "Client: Snakk Studio<br /><br />Product visualization and launch campaign for the Smooth-XS.<br /><br /><a href='https://www.youtube.com/watch?v=Ui87X-vDba0' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "pluto":
    "Client: The New York Times<br /><br />Follow New Horizons glide through space and set foot on an alien world, three billion miles from the warmth of the sun.<br /><br /><a href='https://www.nytimes.com/video/science/100000004657443/seeking-plutos-frigid-heart.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",

  "play-magazine":
    "Client: PLAY Magazine<br /><br />Designed the visual identity for the inaugural issue of PLAY, a cookbook-magazine featuring recipes, essays, and artwork from a community of queer chefs, writers, and artists.<br /><br /><a href='https://play.metalabel.com/' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "donors":
    "Client: The New York Times<br /><br />Data visualization revealing how just 158 families supplied nearly half of the early money in the race for the White House.<br /><br /><a href='https://www.nytimes.com/interactive/2015/10/11/us/politics/2016-presidential-election-super-pac-donors.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "sow-et-al":
    "Client: National Lawyers Guild<br /><br />Graphic analysis uncovering widespread and pervasive constitutional violations by the NYPD during the 2020 George Floyd protests. The work was used as key evidence in a successful class-action lawsuit.<br /><br /><a href='https://situ.nyc/research/projects/sow-et-al-v-city-of-new-york-et-al' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "mexican-metro":
    "Client: The New York Times<br /><br />Data visualization showing the serious construction flaws behind a tragedy that threatened two of Mexico’s most prominent figures.<br /><br /><a href='https://www.nytimes.com/interactive/2021/06/12/world/americas/mexico-city-train-crash.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",

  "david-bowie-3d":
    "Client: The New York Times<br /><br />A closer look at Bowie’s meticulous eye for detail and the way he defied gender and social conventions in the blockbuster museum retrospective, <em>David Bowie Is.</em><br /><br /><a href='https://www.nytimes.com/interactive/2018/03/20/arts/design/bowie-costumes-ar-3d-ul.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "google-headsets": "Client: TK<br /><br />TK.",
  "meta-ar": "Client: TK<br /><br />TK.",

  "bronx-fire":
    "Client: The New York Times<br /><br />The main fire-safety system failed in a Bronx apartment building, and 17 residents lost their lives. Through smoke analysis and architectural reconstruction, viewers are stepped through how the tragedy unfolded.<br /><br /><a href='https://www.nytimes.com/interactive/2022/07/08/nyregion/bronx-fire-nyc.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "dixie-fire-weather":
    "Client: The New York Times<br /><br />High-resolution radar data, picking up ash particles and water droplets, is used to reconstruct a 3-D model of the Dixie Fire to visualize how it created its own weather.<br /><br /><a href='https://www.nytimes.com/interactive/2021/10/19/climate/dixie-fire-storm-clouds-weather.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "usain-bolt":
    "Client: The New York Times<br /><br />How does Bolt compare to every Olympic medalist since 1896? To answer that, a massive track with 88 lanes shows every medal ever awarded in the 100-meter dash in the modern Olympics.<br /><br /><a href='https://www.nytimes.com/interactive/2016/08/15/sports/olympics/usain-bolt-and-120-years-of-sprinting-history.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",

  cv: "",
};

const ROLE_BY_KEY: Record<string, string> = {
  "diary-ed-sheeran": "TK",
  "zhiyun-xs": "TK",
  pluto: "TK",
  "olympics-ar": "TK",

  "play-magazine": "TK",
  donors: "TK",
  "sow-et-al": "TK",
  "mexican-metro": "TK",

  "david-bowie-3d": "TK",
  "google-headsets": "TK",
  "meta-ar": "TK",

  "bronx-fire": "TK",
  "dixie-fire-weather": "TK",
  "usain-bolt": "TK",
};

const MEDIA_PCT: Partial<Record<string, number>> = {
  "diary-ed-sheeran": 75,
  "zhiyun-xs": 75,
  "pluto": 75,
  "olympics-ar": 85,

  "david-bowie-3d": 85,
  "google-headsets": 85,
  "meta-ar": 85,

  "play-magazine": 85,
  "donors": 90,
  "sow-et-al": 70,
  "usain-bolt": 90,

  "bronx-fire": 90,
  "dixie-fire-weather": 75,
  "mexican-metro": 85,

};

const getPct = (key: string) => MEDIA_PCT[key] ?? 100;

/* ===================== Tags (left nav) ===================== */
const DEFAULT_TAGS: string[] = ["Data Viz"];

const TAGS_BY_KEY: Partial<Record<string, string[]>> = {
  "diary-ed-sheeran": ["2D Motion | Explainer"],
  "olympics-ar": ["Motion System | Social"],
  "zhiyun-xs": ["3D Motion | Commercial"],
  pluto: ["3D Motion | Explainer"],
  "david-bowie-3d": ["3D Graphics | Editorial"],
  "google-headsets": ["3D Graphics | Documentary"],
  "meta-ar": ["3D Graphics | Social"],
  "play-magazine": ["Art Direction | Print"],
  donors: ["Information Design | Editorial"],
  "sow-et-al": ["Visual Evidence | Legal"],
  "usain-bolt": ["3D Design | Explainer"],
  "bronx-fire": ["3D Motion | Explainer"],
  "dixie-fire-weather": ["3D Motion | Explainer"],
  "mexican-metro": ["3D Graphics | Editorial"],
};

const TAG_UI = {
  indentPx: 22,
  activeTopGapPx: 1,
  rowGapPx: 6,
  fontSizePx: 9,
  lineHeight: 1,
  maxHeightPx: 24,
  textClass: "text-red-500 dark:text-red-400",
};

const getTagsForKey = (key: string) => TAGS_BY_KEY[key] ?? DEFAULT_TAGS;

/* ===================== Category lists (explicit order) ===================== */
const MOTION_KEYS = ["diary-ed-sheeran", "olympics-ar", "zhiyun-xs", "pluto"] as const;
const EDITORIAL_DESIGN_KEYS = ["play-magazine", "donors", "sow-et-al", "usain-bolt"] as const;
const INTERACTIVE_KEYS = ["david-bowie-3d", "google-headsets", "meta-ar"] as const;
const RECONSTRUCTION_KEYS = ["bronx-fire", "dixie-fire-weather", "mexican-metro"] as const;

const MOTION_LIST = PROJECTS.filter((p) => (MOTION_KEYS as readonly string[]).includes(p.key));
const EDITORIAL_DESIGN_LIST = PROJECTS.filter((p) => (EDITORIAL_DESIGN_KEYS as readonly string[]).includes(p.key));
const INTERACTIVE_LIST = PROJECTS.filter((p) => (INTERACTIVE_KEYS as readonly string[]).includes(p.key));
const RECONSTRUCTION_LIST = PROJECTS.filter((p) => (RECONSTRUCTION_KEYS as readonly string[]).includes(p.key));

/* ===================== Helpers ===================== */
function extractClient(html: string): string {
  const m = html.match(/Client:\s*([^<]+)/i);
  return (m?.[1] ?? "TK").trim() || "TK";
}
function stripLeadingClientLine(html: string): string {
  return html.replace(/^Client:\s*[^<]+<br\s*\/><br\s*\/>/i, "");
}

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

/* ===================== Width helper ===================== */
function Sized({
  pct,
  children,
  onClick,
  ariaLabel,
}: {
  pct: number;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const style = { "--pct": `${pct}%` } as Record<"--pct", string> & CSSProperties;

  if (!onClick) {
    return (
      <div className="w-full flex justify-center">
        <div className="pct-box" style={style}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <button type="button" onClick={onClick} aria-label={ariaLabel} className="group relative pct-box bg-transparent p-0 cursor-pointer" style={style}>
        {children}
        <span
          aria-hidden
          className="hover-ring-red pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ boxShadow: "inset 0 0 0 2px rgb(239 68 68)" }}
        />
      </button>
    </div>
  );
}

/* ===================== Stable stroke wrapper (prevents remount flicker) ===================== */
const STROKE_RADIUS = "0.5rem";
const STROKE_SHADOW_GRAY = "inset 0 0 0 2px rgba(128,128,128,0.65)";
const STROKE_SHADOW_RED = "inset 0 0 0 2px rgb(239 68 68)";

function StrokeBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block overflow-hidden rounded-lg w-full">
      {children}
      <span
        aria-hidden
        className="hover-stroke-gray pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0"
        style={{ boxShadow: STROKE_SHADOW_GRAY, borderRadius: STROKE_RADIUS }}
      />
      <span
        aria-hidden
        className="hover-stroke-red pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ boxShadow: STROKE_SHADOW_RED, borderRadius: STROKE_RADIUS }}
      />
    </div>
  );
}

/* ===================== Page ===================== */
export default function Home() {
  const [activeKey, setActiveKey] = useState<string>(PROJECTS[0]?.key ?? "");
  const activeKeyRef = useRef(activeKey);
  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

  const [detailsOpenKey, setDetailsOpenKey] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ===================== CV panel collapse state (DESKTOP) ===================== */
  const [cvOpen, setCvOpen] = useState(false);
  const CV_OPEN_W = "clamp(13rem,17vw,19rem)";
  const CV_CLOSED_W = "3.5rem";

  const mainRef = useRef<HTMLElement | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastProgrammaticRef = useRef(0);

  const scrollEndTimerRef = useRef<number | null>(null);
  const scrollingRef = useRef(false);


  const [mobileHeaderH, setMobileHeaderH] = useState(128);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  const toggleDetails = useCallback((key: string) => {
    setDetailsOpenKey((prev) => (prev === key ? null : key));
  }, []);

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

    const EXTRA_TOP_GAP = 12;

    const measureAndSync = () => {
      const header = mobileHeaderRef.current;
      const scroller = scrollAreaRef.current;
      if (!header || !scroller) return;

      const prev = header.style.height;
      header.style.height = "auto";
      const natural = header.getBoundingClientRect().height;
      header.style.height = prev;

      setMobileHeaderH((prevH) => {
        const next = Math.max(prevH, natural);
        scroller.style.paddingTop = `${next + EXTRA_TOP_GAP}px`;
        header.style.height = `${next}px`;
        return next;
      });
    };

    const raf = requestAnimationFrame(measureAndSync);
    const ro = new ResizeObserver(() => measureAndSync());
    if (mobileHeaderRef.current) ro.observe(mobileHeaderRef.current);

    const onResize = () => measureAndSync();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile, activeKey]);

   /* ========= Scroll spy: update activeKey LIVE while scrolling ========= */
useEffect(() => {
  const scroller = scrollAreaRef.current;
  if (!scroller) return;

  const EDGE_THRESHOLD = 8;
  const IGNORE_MS_AFTER_PROGRAMMATIC = 280;

  let raf = 0;

  const setScrollingFlag = (on: boolean) => {
    const node = mainRef.current;
    if (!node) return;
    node.dataset.scrolling = on ? "1" : "0";
  };

  const computeAndCommitKey = () => {
    const now = performance.now();
    if (now - lastProgrammaticRef.current < IGNORE_MS_AFTER_PROGRAMMATIC) return;

    const { scrollTop, scrollHeight, clientHeight } = scroller;

    // edges
    let nextKey: string | undefined;
    if (scrollTop <= EDGE_THRESHOLD) {
      nextKey = VISIBLE_KEYS[0];
    } else {
      const maxTop = scrollHeight - clientHeight;
      if (maxTop - scrollTop <= EDGE_THRESHOLD) {
        nextKey = VISIBLE_KEYS[VISIBLE_KEYS.length - 1];
      } else {
        const centerY = scrollTop + clientHeight / 2;

        let bestKey = activeKeyRef.current || VISIBLE_KEYS[0];
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

        nextKey = bestKey;
      }
    }

    if (nextKey && activeKeyRef.current !== nextKey) {
      activeKeyRef.current = nextKey;
      setActiveKey(nextKey);
    }
  };

  const onScroll = () => {
    // update active key during scroll (throttled to rAF)
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        computeAndCommitKey();
      });
    }

    // flag scrolling (CSS hover suppression)
    if (!scrollingRef.current) {
      scrollingRef.current = true;
      setScrollingFlag(true);
    }

    // end-of-scroll flag reset (does NOT gate activeKey anymore)
    if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = window.setTimeout(() => {
      scrollingRef.current = false;
      setScrollingFlag(false);
    }, 140);
  };

  // init
  setScrollingFlag(false);
  computeAndCommitKey();

  scroller.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    scroller.removeEventListener("scroll", onScroll);
    if (raf) cancelAnimationFrame(raf);
    if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
  };
}, [VISIBLE_KEYS]);



  const scrollToKey = useCallback((key: string) => {
    const el = itemRefs.current[key];
    const scroller = scrollAreaRef.current;
    if (!el || !scroller) return;

    lastProgrammaticRef.current = performance.now();
    const target = el.offsetTop + el.offsetHeight / 2 - scroller.clientHeight / 2;
    scroller.scrollTo({ top: target, behavior: "smooth" });

    activeKeyRef.current = key;
    setActiveKey(key);

    window.setTimeout(() => {
      lastProgrammaticRef.current = 0;
    }, 320);
  }, []);



  const nonCVProjects = useMemo(() => {
    const order = [
      ...(MOTION_KEYS as readonly string[]),
      ...(INTERACTIVE_KEYS as readonly string[]),
      ...(EDITORIAL_DESIGN_KEYS as readonly string[]),
      ...(RECONSTRUCTION_KEYS as readonly string[]),
    ];

    const byKey = new Map(PROJECTS.map((p) => [p.key, p] as const));
    return order.map((k) => byKey.get(k)).filter(Boolean) as Project[];
  }, []);

  return (
    <main
      ref={mainRef}
      data-scrolling="0"
      className="relative h-screen overflow-x-hidden overflow-y-hidden bg-background text-foreground"
    >
      <style>{`
        .pct-box {
          width: 100%;
        }
        @media (min-width: 640px) {
          .pct-box {
            width: var(--pct);
          }
        }
        .custom-scrollbar .simplebar-content-wrapper {
          overscroll-behavior-y: contain;
        }
        .slide-inner {
          width: 100%;
        }
        @media (min-width: 640px) {
          .slide-inner {
            width: var(--slide-pct, 100%);
          }
        }
        html,
        body {
          overflow-x: hidden;
        }
        .custom-scrollbar .simplebar-content-wrapper {
          overflow-x: hidden !important;
        }
        .custom-scrollbar .simplebar-content {
          overflow-x: hidden !important;
        }

        /* Disable hover highlight flicker while scrolling */
        main[data-scrolling="1"] .hover-stroke-red,
        main[data-scrolling="1"] .hover-ring-red {
          opacity: 0 !important;
        }
        main[data-scrolling="1"] .hover-stroke-gray {
          opacity: 1 !important;
        }
        main[data-scrolling="1"] .hover-border {
          border-color: rgba(128, 128, 128, 0.65) !important;
          transition: none !important;
        }
      `}</style>

      <div className="relative z-10 w-full h-full">
        <div className="flex flex-col sm:flex-row items-start gap-0 h-full min-h-0">
          {/* Left */}
          <aside className="w-[245px] shrink-0 sticky top-0 self-start pr-1 hidden sm:block">
            <div className="mb-10 pl-[2px]">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">Grothjan Studio</h2>
            </div>

            <div
  className="h-px"
  style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }}
/>


            <div className="px-3 mt-3 mb-4">
              <p className="text-[18px] leading-[1.2] text-foreground/80 text-left">
                Emmy Award-Winning <br />
                Creative Director, <br /> Motion Designer, <br /> &amp; Journalist
              </p>

              <p className="text-[12px] leading-relaxed text-foreground/80 text-left mt-3">
                Reach Out:{" "}
                <a href="mailto:evangrothjan@gmail.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                  evangrothjan@gmail.com
                </a>
              </p>

              <div className="-mx-3 mt-3">
  <div
    className="h-px"
    style={{
      backgroundColor: UMBER,
      width: `calc(100% - ${RULE_INSET_PX * 2}px)`,
      marginLeft: "auto",
      marginRight: "auto",
    }}
  />
</div>




              <div className="mt-3">
                <div className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Clients</div>
                <p className="text-[10px] leading-relaxed text-foreground/80">
                  Bloomberg, DMA United, Google, Human Rights Watch, HAVAS, Meta, Microsoft, MTV, National Lawyers Guild, The New York Times, Vogue, Vox
                </p>
              </div>
            </div>

            <div
  className="h-px"
  style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }}
/>


            <div className="px-3 mt-4">
              <ul className="space-y-4 text-left">
                {[
                  { label: "Motion", list: MOTION_LIST },
                  { label: "Interactive", list: INTERACTIVE_LIST },
                  { label: "Editorial Design", list: EDITORIAL_DESIGN_LIST },
                  { label: "Reconstruction", list: RECONSTRUCTION_LIST },
                ].map(({ label, list }) => (
                  <li key={label} className="w-full">
                    <div className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">{label}</div>
                    <ul className="space-y-[0.1rem]">
                      {list.map(({ title, key }) => {
                        const active = activeKey === key;
                        const tags = getTagsForKey(key);

                        return (
                          <li key={key} className="flex flex-col">
                            <div className="flex items-start gap-2">
                              <span
                                aria-hidden
                                className="w-2.5 h-2.5 flex-none rounded-full transition-transform duration-200 ease-out"
                                style={{
                                  backgroundColor: active ? "rgb(220 38 38)" : "transparent",
                                  transform: active ? "scale(1)" : "scale(0.8)",
                                  marginTop: "calc((1.125rem - 0.625rem) / 2)",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setDetailsOpenKey(null);
                                  scrollToKey(key);
                                }}
                                className="block text-[10px] leading-[1.125rem] text-foreground/90 hover:text-red-500 dark:hover:text-red-400 text-left whitespace-nowrap cursor-pointer"
                              >
                                {title}
                              </button>
                            </div>

                            <div
                              className="overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
                              style={{
                                maxHeight: active ? TAG_UI.maxHeightPx : 0,
                                opacity: active ? 1 : 0,
                                marginTop: active ? TAG_UI.activeTopGapPx : 0,
                              }}
                            >
                              <div
                                style={{
                                  paddingLeft: TAG_UI.indentPx,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  columnGap: TAG_UI.rowGapPx,
                                  rowGap: 2,
                                }}
                              >
                                {tags.map((t) => (
                                  <span key={t} className={TAG_UI.textClass} style={{ fontSize: TAG_UI.fontSizePx, lineHeight: TAG_UI.lineHeight }}>
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Vertical divider */}
          <div className="w-px h-full hidden sm:block" style={{ backgroundColor: UMBER }} />

          {/* Middle */}
          <div className="flex-1 min-w-0 min-h-0 h-full">
            <SimpleBar
              scrollableNodeProps={{ ref: scrollAreaRef }}
              style={{ height: "100%" }}
              className="w-full sm:max-w-[1200px] sm:mx-auto pt-[50px] sm:pt-0 pb-20 sm:pb-3 flex flex-col items-stretch sm:items-center border-b custom-scrollbar h-full overflow-x-hidden px-0"
              autoHide={false}
            >
              {/* Mobile header */}
              <div
                ref={mobileHeaderRef}
                className="mobile-header sm:hidden fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-black border-b px-3 py-2 overflow-hidden"
                style={{ borderColor: UMBER, height: `${mobileHeaderH}px` }}
              >
                <h2 className="text-[12px] font-medium text-red-500 dark:text-red-400">
                  {activeKey === "cv" ? "CV" : PROJECTS.find((pp) => pp.key === activeKey)?.title}
                </h2>
              </div>

              {/* Desktop header */}
              <div className="hidden sm:block w-full text-left">
                <div className="mb-10 pl-[2px]">
                  <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">Select Projects</h2>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />
              </div>

              {nonCVProjects.map((p, idx) => {
                const img = IMAGES[p.key];
                const pct = getPct(p.key);
                const isExpanded = detailsOpenKey === p.key;
                const extraTopMobileFirst = isMobile && idx === 0 ? 20 : 0;

                const toggle = () => toggleDetails(p.key);
                const client = extractClient(DESCRIPTIONS[p.key] ?? "");
                const mediaAria = `Toggle details for ${p.title}`;

                const Media = (() => {
                  // PLAY
                  if (p.key === "play-magazine") {
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[70%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                                <Image src="/play_1.webp" alt="PLAY Magazine – 1" width={1600} height={1100} className="pointer-events-none select-none object-contain w-full h-auto block" />
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[30%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full max-w-[320px] aspect-square mx-auto">
                                <Image src="/play_2.webp" alt="PLAY Magazine – 2" width={900} height={900} className="pointer-events-none select-none object-cover w-full h-full block" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // DONORS
                  if (p.key === "donors") {
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[40%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                                <video src="/monopoly.webm" autoPlay muted loop playsInline preload="metadata" className="pointer-events-none select-none object-contain w-full h-auto block" />
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[60%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                                <Image src="/election_2.webp" alt="Families Funding the 2016 Election" width={1600} height={1100} className="pointer-events-none select-none object-contain w-full h-auto block" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // MEXICO METRO (single video)
if (p.key === "mexican-metro") {
  return (
    <Sized pct={pct}>
      <button
        type="button"
        onClick={toggle}
        aria-label={mediaAria}
        className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none"
      >
        <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
          <video
            src="/metro.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="pointer-events-none select-none object-contain w-full h-auto block"
          />
        </div>
      </button>
    </Sized>
  );
}


                  // DIXIE
                  if (p.key === "dixie-fire-weather") {
                    return (
                      <Sized pct={pct}>
                        <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                            <SmartVideo srcBase="/dixie_final" className="pointer-events-none select-none object-contain w-full h-auto block" preload="metadata" />
                          </div>
                        </button>
                      </Sized>
                    );
                  }

                  // ED SHEERAN
                  if (p.key === "diary-ed-sheeran") {
                    return (
                      <Sized pct={pct}>
                        <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                            <SmartVideo srcBase="/edsheeran_final" className="pointer-events-none select-none object-contain w-full h-auto block" preload="metadata" />
                          </div>
                        </button>
                      </Sized>
                    );
                  }

                  // BRONX
                  if (p.key === "bronx-fire") {
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[38%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full aspect-square">
                                <video src="/bronx_final.webm" autoPlay muted loop playsInline preload="metadata" className="pointer-events-none select-none object-cover w-full h-full block" />
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={toggle}
                              aria-label={mediaAria}
                              className="group bg-transparent p-0 cursor-pointer basis-[62%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
                            >
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                                <Image src="/bronx_2.webp" alt="Reconstructing the Bronx Fire – still" width={1600} height={1100} className="pointer-events-none select-none object-contain w-full h-auto block" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // PLUTO
                  if (p.key === "pluto") {
                    return (
                      <Sized pct={pct}>
                        <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                            <SmartVideo srcBase="/pluto_final" className="pointer-events-none select-none object-contain w-full h-auto block" preload="metadata" />
                          </div>
                        </button>
                      </Sized>
                    );
                  }

                  // NYT SOCIAL (use top-level StrokeBox to avoid remount flicker)
if (p.key === "olympics-ar") {
  return (
    <Sized pct={pct}>
      <div className="w-full flex justify-center">
        <div className="flex w-full max-w-full items-center justify-center gap-12">
          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group bg-transparent p-0 cursor-pointer basis-[50%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <div className="w-full max-w-[320px] mx-auto">
              <StrokeBox>
                <div className="relative w-full aspect-[9/16]">
                  <video
                    src="/sunisa.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </StrokeBox>
            </div>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group bg-transparent p-0 cursor-pointer basis-[50%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <div className="w-full max-w-[320px] mx-auto">
              <StrokeBox>
                <div className="relative w-full aspect-[9/16]">
                  <video
                    src="/ondra.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </StrokeBox>
            </div>
          </button>
        </div>
      </div>
    </Sized>
  );
}

 // BOWIE (border hugs media; right stays vertically centered) — NO HOOKS
if (p.key === "david-bowie-3d") {
  const setRate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.playbackRate = 0.7;
  };

  return (
    <Sized pct={pct}>
      <div className="w-full flex justify-center">
        <div className="flex w-full max-w-full items-center justify-center gap-6">
          {/* mobile (portrait-ish) */}
          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group flex items-center bg-transparent p-0 cursor-pointer basis-[30%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <StrokeBox>
              <video
                src="/bowie-mobile.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                className="pointer-events-none select-none w-full h-auto block object-contain"
              />
            </StrokeBox>
          </button>

          {/* desktop (wider) */}
          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group flex items-center bg-transparent p-0 cursor-pointer basis-[70%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <StrokeBox>
              <video
                src="/bowie-desktop.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                onLoadedMetadata={setRate}
                onPlay={setRate}
                className="pointer-events-none select-none w-full h-auto block object-contain"
              />
            </StrokeBox>
          </button>
        </div>
      </div>
    </Sized>
  );
}


                  // META AR
                  if (p.key === "meta-ar") {
                    const RADIUS = "0.5rem";
                    const SHADOW_GRAY = "inset 0 0 0 2px rgba(128,128,128,0.65)";
                    const SHADOW_RED = "inset 0 0 0 2px rgb(239 68 68)";

                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer basis-[50%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none">
                              <div className="relative inline-block overflow-hidden rounded-lg w-full max-w-[320px] mx-auto">
                                <div className="w-full aspect-[9/16]">
                                  <video src="/instaAR_1.webm" autoPlay muted loop playsInline preload="metadata" className="pointer-events-none select-none w-full h-full object-contain block" />
                                </div>
                                <span aria-hidden className="hover-stroke-gray pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0" style={{ boxShadow: SHADOW_GRAY, borderRadius: RADIUS }} />
                                <span aria-hidden className="hover-stroke-red pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ boxShadow: SHADOW_RED, borderRadius: RADIUS }} />
                              </div>
                            </button>

                            <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer basis-[50%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none">
                              <div className="relative inline-block overflow-hidden rounded-lg w-full max-w-[320px] mx-auto">
                                <div className="w-full aspect-[9/16]">
                                  <video src="/instaAR_2.webm" autoPlay muted loop playsInline preload="metadata" className="pointer-events-none select-none w-full h-full object-contain block" />
                                </div>
                                <span aria-hidden className="hover-stroke-gray pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0" style={{ boxShadow: SHADOW_GRAY, borderRadius: RADIUS }} />
                                <span aria-hidden className="hover-stroke-red pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" style={{ boxShadow: SHADOW_RED, borderRadius: RADIUS }} />
                              </div>
                            </button>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // GOOGLE VR (make the border wrap the IMAGE box, not the aspect container)
if (p.key === "google-headsets") {
  return (
    <Sized pct={pct}>
      <div className="w-full flex justify-center">
        <div className="flex w-full max-w-full items-center justify-center gap-6">
          {/* left image (Cardboard) */}
          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group bg-transparent p-0 cursor-pointer basis-[34%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <div className="hover-border inline-block w-full overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500">
              <Image
                src="/cardboard.jpg"
                alt="Google VR – Cardboard"
                width={1200}
                height={800}
                sizes="(min-width: 640px) 34vw, 90vw"
                className="pointer-events-none select-none object-contain w-full h-auto block"
              />
            </div>
          </button>
          {/* right video (unchanged layout lock) */}
          <button
            type="button"
            onClick={toggle}
            aria-label={mediaAria}
            className="group bg-transparent p-0 cursor-pointer basis-[66%] shrink min-w-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            <div className="w-full overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500">
              <div className="relative w-full aspect-[16/9]">
                <video
                  src="/antarctica_final.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="pointer-events-none select-none absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </Sized>
  );
}

                  // ZHIYUN
                  if (p.key === "zhiyun-xs") {
                    return (
                      <Sized pct={pct}>
                        <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                            <SmartVideo srcBase="/zhiyun_final" className="pointer-events-none select-none object-contain w-full h-auto block" preload="metadata" />
                          </div>
                        </button>
                      </Sized>
                    );
                  }

                  // SOW
                  if (p.key === "sow-et-al") {
                    return (
                      <Sized pct={pct}>
                        <button type="button" onClick={toggle} aria-label={mediaAria} className="group bg-transparent p-0 cursor-pointer w-full outline-none focus:outline-none focus-visible:outline-none">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] transition-colors duration-150 group-hover:border-red-500 group-focus-visible:border-red-500 w-full">
                            <Image src="/protests_1.webp" alt="Sow, et al. – George Floyd Protests" width={1200} height={900} className="pointer-events-none select-none object-contain w-full h-auto block" />
                          </div>
                        </button>
                      </Sized>
                    );
                  }
                  // Fallback (single image)
                  if (img) {
                    return (
                      <Sized pct={pct} onClick={toggle} ariaLabel={mediaAria}>
                        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="object-contain w-full" priority={idx === 0} />
                      </Sized>
                    );
                  }
                  return (
                    <Sized pct={pct} onClick={toggle} ariaLabel={mediaAria}>
                      <Image src="/dixie_placeholder.webp" alt="Placeholder" width={800} height={600} className="object-contain w-full h-auto" />
                    </Sized>
                  );
                })();
                return (
                  <div
                    key={p.key}
                    data-key={p.key}
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[p.key] = el;
                    }}
                    className="w-full flex flex-col items-center relative"
                  >
                    {idx === 0 && <div style={{ height: MID_GAP + extraTopMobileFirst }} />}

                    <div className="w-full outline-none">{Media}</div>

                    {/* Always-visible summary */}
                    <Sized pct={pct}>
                      <button type="button" onClick={toggle} className="w-full bg-transparent p-0 text-left cursor-pointer" aria-expanded={isExpanded} aria-controls={`details-${p.key}`}>
                        <div className="pt-4 px-3 sm:px-0 text-[10px] leading-relaxed text-red-500 dark:text-red-400">
                          <div className="text-left" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                            <div>
                              <span className="opacity-80">Role:</span> {ROLE_BY_KEY[p.key] ?? "TK"}
                            </div>
                            <div className="mt-1">
                              <span className="opacity-80">Client:</span> {client}
                            </div>
                          </div>
                        </div>
                      </button>
                    </Sized>

                    {/* Animated expand/collapse details */}
                    <div
                      id={`details-${p.key}`}
                      className={["w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out", isExpanded ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"].join(" ")}
                    >
                      <Sized pct={pct}>
                        <div className="pt-6 px-3 sm:px-0 text-[10px] leading-relaxed text-red-500 dark:text-red-400">
                          <div className="text-left" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                            <div className="h-4" />
                            <div dangerouslySetInnerHTML={{ __html: stripLeadingClientLine(DESCRIPTIONS[p.key] ?? "") }} />

                            {p.key === "pluto" && isExpanded && (
                              <div className="mt-6">
                                <video src="/deathFlights_final.webm" autoPlay muted loop playsInline preload="metadata" className="object-contain w-full h-auto" />
                              </div>
                            )}
                          </div>
                        </div>
                      </Sized>
                    </div>

                    {/* Separator */}
                    <div className="flex flex-col items-center w-full">
                      <div style={{ height: MID_GAP }} />
                      <div
  className="h-px w-full"
  style={{
    backgroundColor: UMBER,
    marginLeft: RULE_INSET_PX,
    marginRight: RULE_INSET_PX,
    transform: `translateY(${isExpanded ? 8 : 0}px)`,
    transition: "transform 180ms ease-in-out",
    willChange: "transform",
  }}
/>

                      <div style={{ height: MID_GAP }} />
                    </div>
                  </div>
                );
              })}

              {/* Mobile-only CV */}
              <div
                ref={(el) => {
                  itemRefs.current["cv"] = el;
                }}
                className="sm:hidden w-full px-3 pt-4 pb-16 text-[10px] leading-relaxed"
              >
                {/* ... unchanged CV content ... */}
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

                <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />


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

                <div className="-mx-3">
                  <div className="h-px my-4 w-full sm:my-3" style={{ backgroundColor: UMBER }} />
                </div>

                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Clients</h3>
                  <p className="text-[10px]">
                    Bloomberg, DMA United, Google, Human Rights Watch, HAVAS, Meta, Microsoft, MTV, National Lawyers Guild, The New York Times, Vogue, Vox
                  </p>
                </div>
              </div>
            </SimpleBar>
          </div>

          {/* Vertical divider */}
          <div className="w-px h-full hidden sm:block" style={{ backgroundColor: UMBER }} />

          {/* Right (CV) */}
          <div className="hidden sm:block sticky top-0 self-start shrink-0 h-full relative transition-[width] duration-300 ease-in-out" style={{ width: cvOpen ? CV_OPEN_W : CV_CLOSED_W }}>
            <button type="button" aria-label={cvOpen ? "Collapse CV panel" : "Expand CV panel"} onClick={() => setCvOpen((p) => !p)} className="absolute inset-0 z-30 bg-transparent cursor-pointer" />

            <aside className="relative h-full overflow-hidden text-[10px] leading-relaxed px-1" style={{ width: CV_OPEN_W }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCvOpen((p) => !p);
                }}
                className="w-full flex items-center gap-[1.75px] pl-[2px] mb-2 select-none"
                aria-label={cvOpen ? "Collapse CV panel" : "Expand CV panel"}
                aria-expanded={cvOpen}
              >
                {cvOpen ? <ChevronLeft className="w-4 h-4 text-black dark:text-white stroke-[1.25]" /> : <ChevronRight className="w-4 h-4 text-black dark:text-white stroke-[1.25]" />}
                <span className="text-[14px] tracking-wide text-black dark:text-white opacity-80">CV</span>
              </button>

              {/* ... unchanged CV panel content ... */}
              <div className="relative overflow-hidden" style={{ width: CV_OPEN_W }}>
                <div className={["transition-opacity duration-200", cvOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}>
                  <div className="h-8" />
                  <div
  className="h-[1px] mb-4 -mt-[2px]"
  style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }}
/>


                  <div className={["transition-transform duration-300 ease-in-out", cvOpen ? "translate-x-0" : "translate-x-full"].join(" ")}>
                    <div className="translate-y-[-2px]">
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

                      <div className="h-px my-4 w-full" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />


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
                    <div className="w-full mt-4 mb-4">
                      <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
