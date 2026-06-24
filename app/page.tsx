"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { Icon } from "@iconify/react";

/* ===================== Types ===================== */
type Project = { title: string; key: string; href: string };

/* ===================== Constants ===================== */
const UMBER = "#4a1f14";
const GAP = 65;
const MID_GAP = Math.round(GAP * 0.9);

const DESC_TOP_PAD = 16; // matches old pt-4 (16px)
const DESC_BAND_HALF = Math.round((DESC_TOP_PAD + MID_GAP) / 2);

const RULE_INSET_PX = 0;

const PROJECTS: Project[] = [
  // Motion
  { title: "Diary of a Song: Ed Sheeran’s ‘Shape of You’", key: "diary-ed-sheeran", href: "#" },
  { title: "NYT Social Content", key: "olympics-ar", href: "#" },
  { title: "Zhiyun XS", key: "zhiyun-xs", href: "#" },
  { title: "Seeking Pluto's Frigid Heart", key: "pluto", href: "#" },

  // Design (Editorial Design)
  { title: "PLAY Magazine", key: "play-magazine", href: "#" },
  { title: "Families Funding the Election", key: "donors", href: "#" },
  { title: "Usain Bolt and the Fastest Men in the World", key: "usain-bolt", href: "#" },

  // Interactive
  { title: "David Bowie in Three Dimensions", key: "david-bowie-3d", href: "#" },
  { title: "Google: Virtual Reality", key: "google-headsets", href: "#" },
  { title: "Instagram: Augmented Reality", key: "meta-ar", href: "#" },

  // CV
  { title: "CV", key: "cv", href: "#" },
];

const IMAGES: Record<string, { src: string; alt: string; width: number; height: number }> = {
  "bronx-fire": { src: "/bronx_cover.webp", alt: "Reconstructing the Bronx Fire", width: 800, height: 600 },
  "diary-ed-sheeran": { src: "/edsheeran_cover.webp", alt: "Diary of a Song: Shape of You", width: 800, height: 600 },
  "zhiyun-xs": { src: "/zhiyun_cover.webp", alt: "Zhiyun XS", width: 800, height: 600 },
  "dixie-fire-weather": { src: "/dixie_placeholder.webp", alt: "Dixie Fire Weather", width: 800, height: 600 },
  pluto: { src: "/pluto_2.webp", alt: "Seeking Pluto's Frigid Heart", width: 600, height: 600 },
  "olympics-ar": { src: "/olympics_cover.webp", alt: "NYT Social Content", width: 800, height: 600 },
  "google-headsets": { src: "/dixie_placeholder.webp", alt: "Google Headsets (placeholder)", width: 800, height: 600 },
};

const DESCRIPTIONS: Record<string, string> = {
  "diary-ed-sheeran":
    "Client: The New York Times | Explainer<br /><br />Animated data visualization deconstructing how Ed Sheeran, Johnny McDaid, and Steve Mac built the most-streamed track of 2017. Over 3.8 million views. <br /><br /><a href='https://www.youtube.com/watch?v=ZpMNJbt3QDE&t=349s' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "olympics-ar":
    "Client: The New York Times | Social<br /><br />Breaking down the movements that make them great. Sunisa Lee is unmatched on the uneven bars and there’s nothing Adam Ondra can’t climb.",
  "zhiyun-xs":
    "Client: Zhiyun | Commercial<br /><br />Product visualization and launch campaign for Zhiyun's Smooth-XS.<br /><br /><a href='https://www.youtube.com/watch?v=Ui87X-vDba0' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "pluto":
    "Client: The New York Times | Documentary<br /><br />Follow New Horizons through space and set foot on an alien world, three billion miles from the warmth of the sun.<br /><br /><a href='https://www.nytimes.com/video/science/100000004657443/seeking-plutos-frigid-heart.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "play-magazine":
    "Client: PLAY Magazine | Print<br /><br />Visual identity for the inaugural issue of PLAY, a cookbook-magazine featuring recipes, essays, and artwork from a community of queer chefs and artists.<br /><br /><a href='https://play.metalabel.com/' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "donors":
    "Client: The New York Times | Explainer<br /><br />How just 158 families supplied nearly half of the early money in the race for the 2016 White House.<br /><br /><a href='https://www.nytimes.com/interactive/2015/10/11/us/politics/2016-presidential-election-super-pac-donors.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "david-bowie-3d":
    "Client: The New York Times | Product<br /><br />Bowie’s meticulous eye for detail and flaunting of gender and social norms in the blockbuster museum retrospective, <em>David Bowie Is.</em><br /><br /><a href='https://www.nytimes.com/interactive/2018/03/20/arts/design/bowie-costumes-ar-3d-ul.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "google-headsets":
    "Client: Google | Product<br /><br />NYT and Google teamed up to mail over a million Google Cardboard headsets to subscribers, giving a platform to 360-degree documentary storytelling.",
  "meta-ar":
    "Client: Meta | Product<br /><br />NYT partnered with Instagram to publish reporting directly inside the camera. Augmented Reality lets the reporting behave like an object in the world.<br /><br /><a href='https://rd.nytimes.com/projects/augmented-reality-storytelling/' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",
  "usain-bolt":
    "Client: The New York Times | Editorial<br /><br />How does Bolt compare to every Olympic medalist since 1896? A massive track shows every medal ever awarded in the 100-meter dash.<br /><br /><a href='https://www.nytimes.com/interactive/2016/08/15/sports/olympics/usain-bolt-and-120-years-of-sprinting-history.html' target='_blank' rel='noopener noreferrer'>LINK HERE</a>",

  cv: "",
};

const ROLE_BY_KEY: Record<string, string> = {
  "diary-ed-sheeran": "Art Direction, 2D Motion Design",
  "olympics-ar": "Art Direction, Multimedia Design",
  "zhiyun-xs": "3D Motion Design",
  "pluto": "3D Motion Design",

  "david-bowie-3d": "Technical Supervisor, 3D Production",
  "google-headsets": "Technical Supervisor, 3D Production",
  "meta-ar": "Art Direction, Production",

  "play-magazine": "Art Direction, 3D Design",
  "donors": "Information Design",
  "usain-bolt": "Data Visualization",
};

const MEDIA_PCT: Partial<Record<string, number>> = {
  "diary-ed-sheeran": 90,
  "zhiyun-xs": 90,
  "pluto": 90,
  "olympics-ar": 90,

  "david-bowie-3d": 90,
  "google-headsets": 90,
  "meta-ar": 90,

  "play-magazine": 90,
  "donors": 90,
  "usain-bolt": 90,
};

const getPct = (key: string) => MEDIA_PCT[key] ?? 100;

/* ===================== Tags (left nav) ===================== */
const DEFAULT_TAGS: string[] = ["Data Viz"];

const TAGS_BY_KEY: Partial<Record<string, string[]>> = {
  "diary-ed-sheeran": ["2D Motion | Explainer"],
  "olympics-ar": ["Multimedia Design | Social"],
  "zhiyun-xs": ["3D Motion | Commercial"],
  "pluto": ["3D Motion | Explainer"],
  "david-bowie-3d": ["3D Graphics | Editorial"],
  "google-headsets": ["3D Graphics | Documentary"],
  "meta-ar": ["3D Graphics | Social"],
  "play-magazine": ["Art Direction | Print"],
  donors: ["Information Design | Editorial"],
  "usain-bolt": ["3D Design | Explainer"],
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
const EDITORIAL_DESIGN_KEYS = ["play-magazine", "donors", "usain-bolt"] as const;
const INTERACTIVE_KEYS = ["david-bowie-3d", "google-headsets", "meta-ar"] as const;

const MOTION_LIST = PROJECTS.filter((p) => (MOTION_KEYS as readonly string[]).includes(p.key));
const EDITORIAL_DESIGN_LIST = PROJECTS.filter((p) => (EDITORIAL_DESIGN_KEYS as readonly string[]).includes(p.key));
const INTERACTIVE_LIST = PROJECTS.filter((p) => (INTERACTIVE_KEYS as readonly string[]).includes(p.key));

/* ===================== Helpers ===================== */
function extractClient(html: string): string {
  const m = html.match(/Client:\s*([^<]+)/i);
  return (m?.[1] ?? "TK").trim() || "TK";
}
function stripLeadingClientLine(html: string): string {
  return html.replace(/^Client:\s*[^<]+<br\s*\/><br\s*\/>/i, "");
}

function extractFirstHref(html: string): string | null {
  const m = html.match(/href=['"]([^'"]+)['"]/i);
  return m?.[1] ?? null;
}
function stripAllLinks(html: string): string {
  return html
    .replace(/<a\b[^>]*>.*?<\/a>/gi, "")
    .replace(/(\s*<br\s*\/?>\s*)+$/gi, "")
    .trim();
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
}: {
  pct: number;
  children: React.ReactNode;
}) {
  const style = { "--pct": `${pct}%` } as Record<"--pct", string> & CSSProperties;

  return (
    <div className="w-full flex justify-center">
      <div className="pct-box" style={style}>
        {children}
      </div>
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
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: STROKE_SHADOW_GRAY, borderRadius: STROKE_RADIUS }}
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

  const [isMobile, setIsMobile] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastProgrammaticRef = useRef(0);

  const scrollEndTimerRef = useRef<number | null>(null);
  const scrollingRef = useRef(false);

const VISIBLE_KEYS = useMemo(() => {
  const base = [
    ...(MOTION_KEYS as readonly string[]),
    ...(INTERACTIVE_KEYS as readonly string[]),
    ...(EDITORIAL_DESIGN_KEYS as readonly string[]),
  ];
  return isMobile ? [...base, "cv"] : base;
}, [isMobile]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          computeAndCommitKey();
        });
      }

      if (!scrollingRef.current) {
        scrollingRef.current = true;
        setScrollingFlag(true);
      }

      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
        setScrollingFlag(false);
      }, 140);
    };

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
            width: min(var(--pct), 96%);
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

        .desc-link {
          color: rgb(59 130 246);
          text-decoration: underline;
        }
        .desc-link:hover {
          color: rgb(37 99 235);
        }
      `}</style>

      <div className="relative z-10 w-full h-full">
        <div className="flex flex-col sm:flex-row items-start gap-0 h-full min-h-0">
          {/* Left */}
          <aside className="w-[245px] shrink-0 sticky top-0 self-start pr-1 hidden sm:block">
            <div className="mb-5 pl-[12px]">
              <h2
                className="text-[14px] tracking-wide text-black dark:text-white opacity-80"
                style={{ fontFamily: '"proxima-nova", sans-serif' }}
              >
                grothjan studio
              </h2>
            </div>

            <div className="h-px" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />

            <div className="px-3 mt-3 mb-4">
              <p
                className="text-[18px] leading-[1.2] text-foreground/80 text-left"
                style={{ fontFamily: '"proxima-nova-thin", sans-serif', fontWeight: 100 }}
              >
                Emmy Award-Winning <br />
                Filmmaker &amp; Journalist
              </p>

              <p className="text-[10px] leading-relaxed text-foreground/80 text-left mt-2">
                Grothjan Studio is an art direction, animation, and design practice led by Evan Grothjan, an Emmy-winning filmmaker with seven years at the New York Times.
                <br />
                <br />
                The studio builds motion, editorial, and interactive work that turns complex ideas into clear, striking visual stories.
              </p>

              <p className="text-[10px] leading-relaxed text-foreground/80 text-left mt-3">
                For reporting &amp; investigative work,
                <br />
                visit{" "}
                <a
                  href="https://www.grothjan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  grothjan &rarr;
                </a>
              </p>

              <div className="flex gap-1 items-center mt-3">
                <a
                  href="https://www.linkedin.com/in/evan-g-09772b57/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Icon
                    icon="mdi:linkedin"
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  />
                </a>

                <a
                  href="https://x.com/EvanGrothjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <Icon
                    icon="ri:twitter-x-fill"
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  />
                </a>

                <a
                  href="mailto:evangrothjan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <Icon
                    icon="ic:outline-email"
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  />
                </a>
              </div>

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

            <div className="h-px" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />

            <div className="px-3 mt-4">
              <ul className="space-y-4 text-left">
                {[
                  { label: "Motion", list: MOTION_LIST },
                  { label: "Interactive", list: INTERACTIVE_LIST },
                  { label: "Editorial Design", list: EDITORIAL_DESIGN_LIST },
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
                                className="w-[5px] h-[5px] flex-none rounded-full transition-transform duration-200 ease-out"
                                style={{
                                  backgroundColor: active ? "rgb(220 38 38)" : "transparent",
                                  transform: active ? "scale(1)" : "scale(0.8)",
                                  marginTop: "calc((1.125rem - 0.3125rem) / 2)",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
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
              className="w-full pb-20 sm:pb-3 flex flex-col items-stretch border-b custom-scrollbar h-full overflow-x-hidden px-0"
              autoHide={false}
            >
              {/* Mobile header */}
              <div className="sm:hidden w-full px-4 pt-7 pb-5">
                <h2
                  className="text-[11px] tracking-[0.18em] uppercase text-foreground/55"
                  style={{ fontFamily: '"proxima-nova", sans-serif' }}
                >
                  grothjan studio
                </h2>

                <h1
                  className="mt-3 text-[27px] leading-[1.1] text-foreground"
                  style={{ fontFamily: '"proxima-nova-thin", sans-serif', fontWeight: 100 }}
                >
                  Emmy Award-Winning
                  <br />
                  Filmmaker &amp; Journalist
                </h1>

                <p className="mt-4 text-[13px] leading-[1.55] text-foreground/80">
                  Grothjan Studio is an art direction, animation, and design practice led by Evan Grothjan, an Emmy-winning filmmaker with seven years at the New York Times.
                  <br />
                  <br />
                  The studio builds motion, editorial, and interactive work that turns complex ideas into clear, striking visual stories.
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/evan-g-09772b57/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Icon
                      icon="mdi:linkedin"
                      className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    />
                  </a>
                  <a
                    href="https://x.com/EvanGrothjan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X"
                  >
                    <Icon
                      icon="ri:twitter-x-fill"
                      className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    />
                  </a>
                  <a
                    href="mailto:evangrothjan@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                  >
                    <Icon
                      icon="ic:outline-email"
                      className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    />
                  </a>
                </div>
              </div>

              <div className="sm:hidden w-full h-px" style={{ backgroundColor: UMBER }} />

              <div className="sm:hidden h-5" />

              {/* Desktop header */}
              <div className="hidden sm:block w-full text-left">
                <div className="mb-5 pl-[12px]">
                  <h2
                    className="text-[14px] tracking-wide text-black dark:text-white opacity-80"
                    style={{ fontFamily: '"proxima-nova", sans-serif' }}
                  >
                    select work
                  </h2>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: UMBER, marginLeft: RULE_INSET_PX, marginRight: RULE_INSET_PX }} />
              </div>

              {nonCVProjects.map((p, idx) => {
                const img = IMAGES[p.key];
                const pct = getPct(p.key);
                const rawDesc = DESCRIPTIONS[p.key] ?? "";
                const client = extractClient(rawDesc);

                const stripped = stripLeadingClientLine(rawDesc);
                const linkHref = extractFirstHref(stripped);
                const baseDesc = stripAllLinks(stripped);

                const descHtml = linkHref
                  ? `${baseDesc} <a href="${linkHref}" target="_blank" rel="noopener noreferrer" class="desc-link">LINK</a>`
                  : baseDesc;

                const Media = (() => {
                  // PLAY
                  if (p.key === "play-magazine") {
                    if (isMobile) {
                      return (
                        <Sized pct={pct}>
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <Image
                              src="/play_1.webp"
                              alt="PLAY Magazine"
                              width={1600}
                              height={1100}
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                            />
                          </div>
                        </Sized>
                      );
                    }
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <div className="bg-transparent p-0 basis-[70%] shrink min-w-0">
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                                <Image
                                  src="/play_1.webp"
                                  alt="PLAY Magazine – 1"
                                  width={1600}
                                  height={1100}
                                  className="pointer-events-none select-none object-contain w-full h-auto block"
                                />
                              </div>
                            </div>

                            <div className="bg-transparent p-0 basis-[30%] shrink min-w-0">
                              <div className="overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full max-w-[320px] aspect-square mx-auto">
                                <Image
                                  src="/play_2.webp"
                                  alt="PLAY Magazine – 2"
                                  width={900}
                                  height={900}
                                  className="pointer-events-none select-none object-cover w-full h-full block"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // DONORS
                  if (p.key === "donors") {
                    if (isMobile) {
                      return (
                        <Sized pct={pct}>
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <video
                              src="/monopoly.webm"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                            />
                          </div>
                        </Sized>
                      );
                    }
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <div className="bg-transparent p-0 basis-[40%] shrink min-w-0">
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                                <video
                                  src="/monopoly.webm"
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  className="pointer-events-none select-none object-contain w-full h-auto block"
                                />
                              </div>
                            </div>

                            <div className="bg-transparent p-0 basis-[60%] shrink min-w-0">
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                                <Image
                                  src="/election_2.webp"
                                  alt="Families Funding the 2016 Election"
                                  width={1600}
                                  height={1100}
                                  className="pointer-events-none select-none object-contain w-full h-auto block"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // USAIN BOLT (two stills side-by-side)
                  if (p.key === "usain-bolt") {
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
                            {/* LEFT: smaller */}
                            <div className="bg-transparent p-0 basis-[42%] shrink min-w-0">
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                                <Image
                                  src="/sprint_2.webp"
                                  alt="Usain Bolt – sprint still 2"
                                  width={1400}
                                  height={900}
                                  className="pointer-events-none select-none object-contain w-full h-auto block"
                                />
                              </div>
                            </div>

                            {/* RIGHT: bigger */}
                            <div className="bg-transparent p-0 basis-[58%] shrink min-w-0 flex justify-center">
                              <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                                <Image
                                  src="/sprint_final.webp"
                                  alt="Usain Bolt – sprint final"
                                  width={1400}
                                  height={900}
                                  className="pointer-events-none select-none block w-full h-auto"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // ED SHEERAN
                  if (p.key === "diary-ed-sheeran") {
                    return (
                      <Sized pct={pct}>
                        <div className="bg-transparent p-0 w-full">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <SmartVideo
                              srcBase="/edsheeran_final"
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                              preload="metadata"
                            />
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // PLUTO
                  if (p.key === "pluto") {
                    return (
                      <Sized pct={pct}>
                        <div className="bg-transparent p-0 w-full">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <SmartVideo
                              srcBase="/pluto_final"
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                              preload="metadata"
                            />
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // NYT SOCIAL
                  if (p.key === "olympics-ar") {
                    if (isMobile) {
                      return (
                        <Sized pct={pct}>
                          <div className="w-full mx-auto" style={{ maxWidth: "clamp(240px, 70vw, 420px)" }}>
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
                        </Sized>
                      );
                    }
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-12">
                            <div className="bg-transparent p-0 basis-[50%] shrink min-w-0">
                              <div className="w-full mx-auto" style={{ maxWidth: "clamp(240px, 20vw, 520px)" }}>
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
                            </div>

                            <div className="bg-transparent p-0 basis-[50%] shrink min-w-0">
                              <div className="w-full mx-auto" style={{ maxWidth: "clamp(240px, 20vw, 520px)" }}>
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
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // BOWIE (NO hooks)
                  if (p.key === "david-bowie-3d") {
                    const setRate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
                      e.currentTarget.playbackRate = 0.7;
                    };

                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <div className="flex items-center bg-transparent p-0 basis-[30%] shrink min-w-0">
                              <div className="mx-auto" style={{ width: "clamp(170px, 12vw, 320px)" }}>
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
                              </div>
                            </div>

                            <div className="flex items-center bg-transparent p-0 basis-[70%] shrink min-w-0">
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
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // INSTAGRAM AR
                  if (p.key === "meta-ar") {
                    return (
                      <Sized pct={pct}>
                        <div className="bg-transparent p-0 w-full">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <video
                              src="/instaAR_3.webm"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                            />
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // GOOGLE VR
                  if (p.key === "google-headsets") {
                    return (
                      <Sized pct={pct}>
                        <div className="w-full flex justify-center">
                          <div className="flex w-full max-w-full items-center justify-center gap-6">
                            <div className="bg-transparent p-0 basis-[34%] shrink min-w-0">
                              <div className="inline-block w-full overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)]">
                                <Image
                                  src="/cardboard.jpg"
                                  alt="Google VR – Cardboard"
                                  width={1200}
                                  height={800}
                                  sizes="(min-width: 640px) 34vw, 90vw"
                                  className="pointer-events-none select-none object-contain w-full h-auto block"
                                />
                              </div>
                            </div>

                            <div className="bg-transparent p-0 basis-[66%] shrink min-w-0">
                              <div className="w-full overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)]">
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
                            </div>
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // ZHIYUN
                  if (p.key === "zhiyun-xs") {
                    return (
                      <Sized pct={pct}>
                        <div className="bg-transparent p-0 w-full">
                          <div className="inline-block overflow-hidden rounded-lg border-2 border-[rgba(128,128,128,0.65)] w-full">
                            <SmartVideo
                              srcBase="/zhiyun_final"
                              className="pointer-events-none select-none object-contain w-full h-auto block"
                              preload="metadata"
                            />
                          </div>
                        </div>
                      </Sized>
                    );
                  }

                  // Fallback (single image)
                  if (img) {
                    return (
                      <Sized pct={pct}>
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          className="object-contain w-full"
                          priority={idx === 0}
                        />
                      </Sized>
                    );
                  }

                  return (
                    <Sized pct={pct}>
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
                    {idx === 0 && <div style={{ height: isMobile ? 0 : MID_GAP }} />}

                    <div className="w-full outline-none">{Media}</div>

                    <Sized pct={pct}>
                      {/* Mobile (matches personal_website styling) */}
                      <div className="sm:hidden px-3 pt-3 pb-4 text-black dark:text-white">
                        <div className="text-[18px] leading-[1.08]" style={{ fontWeight: 400 }}>
                          {p.title}
                        </div>

                        <div
                          className="mt-2 text-[14px] leading-[1.3] text-black/85 dark:text-white/85"
                          style={{ fontWeight: 400 }}
                          dangerouslySetInnerHTML={{ __html: descHtml }}
                        />

                        <div className="mt-2 text-[11px] leading-[1.3] text-black/65 dark:text-white/65" style={{ fontWeight: 400 }}>
                          <span className="text-black dark:text-white">Client:</span>{" "}
                          <span>{client}</span>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div className="hidden sm:block sm:px-0 text-[12px] leading-relaxed text-red-500 dark:text-red-400">
                        <div style={{ height: DESC_BAND_HALF }} />

                        <div className="w-full flex justify-center">
                          <div className="inline-flex flex-row items-center gap-14">
                            {/* left: role/client */}
                            <div className="shrink-0 w-[16rem] whitespace-nowrap">
                              <div>
                                <span className="opacity-80">Role:</span>{" "}
                                <span className="font-semibold">{ROLE_BY_KEY[p.key] ?? "TK"}</span>
                              </div>
                              <div className="mt-0">
                                <span className="opacity-80">Client:</span>{" "}
                                <span className="font-semibold">{client}</span>
                              </div>
                            </div>

                            {/* right: description */}
                            <div className="min-w-0 w-[32rem] max-w-[32rem] text-red-500 dark:text-red-400">
                              <div dangerouslySetInnerHTML={{ __html: descHtml }} />
                            </div>
                          </div>
                        </div>

                        <div style={{ height: DESC_BAND_HALF }} />
                      </div>
                    </Sized>

                    {/* Separator (desktop only between projects) */}
                    <div className="flex flex-col items-center w-full">
                      <div
                        className="hidden sm:block h-px w-full"
                        style={{
                          backgroundColor: UMBER,
                          marginLeft: RULE_INSET_PX,
                          marginRight: RULE_INSET_PX,
                        }}
                      />

                      <div style={{ height: isMobile ? 20 : MID_GAP }} />
                    </div>
                  </div>
                );
              })}

              {/* Mobile-only line after the last project */}
              <div className="sm:hidden w-full h-px" style={{ backgroundColor: UMBER }} />

              {/* Mobile-only CV */}
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

              {/* Mobile-only cross-link footer */}
              <div className="sm:hidden w-full px-3 pb-8">
                <div className="-mx-3 mb-5">
                  <div className="h-px w-full" style={{ backgroundColor: UMBER }} />
                </div>
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Reporting &amp; Investigative Work
                </h3>
                <p className="text-[13px] leading-relaxed text-foreground/80">
                  For reporting &amp; investigative work, visit{" "}
                  <a
                    href="https://www.grothjan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    grothjan &rarr;
                  </a>
                </p>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </main>
  );
}