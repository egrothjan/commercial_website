"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ===================== Types ===================== */
type Project = { title: string; key: string; href: string };
type Slide =
  | {
      type?: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      className?: string;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      width: number;
      height: number;
      className?: string;
    };

/* ===================== Small helper for robust video loading ===================== */
/** Renders a video with WEBM + MP4 fallbacks.
 * Pass srcBase without the extension, e.g. "/deathFlights_compressed"
 */
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
  // Note: ensure the files actually exist in /public: `${srcBase}.webm` and/or `${srcBase}.mp4`
  return (
    <video
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      className={className}
      poster={poster}
    >
      <source src={`${srcBase}.webm`} type="video/webm" />
      <source src={`${srcBase}.mp4`} type="video/mp4" />
      {/* Fallback text if neither source loads */}
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
  slideWidthPercent?: number; // visual width per slide on desktop (e.g., 75 -> sm:w-[75%])
  autoplayMs?: number; // e.g. 8000 for 8s; omit/undefined to disable
}) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [locked, setLocked] = useState(false);

  // autoplay w/ page visibility handling
  useEffect(() => {
    if (!autoplayMs) return;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (!timer) {
        timer = setInterval(() => {
          setLocked(true);
          setIsTransitioning(true);
          setIndex((p) => p + 1);
        }, autoplayMs);
      }
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [autoplayMs]);

  const total = slides.length;
  const containerPct = (total + 2) * 100; // clones

  const SlideNode = (s: Slide, i: number) => {
    // Mobile: w-full prevents sideways scroll; Desktop: respect slideWidthPercent + any sm: overrides
    const common = `object-contain h-auto w-full max-w-none sm:w-[${slideWidthPercent}%] ${s.className ?? ""}`;

    return (
      <div key={i} className="w-full flex justify-center flex-shrink-0">
        {s.type === "video" ? (
          <video src={s.src} autoPlay muted loop playsInline preload="metadata" className={common} />
        ) : (
          <Image
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            className={common}
          />
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full flex justify-center overflow-hidden">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{
          width: `${containerPct}%`,
          transform: `translateX(-${(index + 1) * 100}%)`,
        }}
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
        {/* Clone last */}
        {SlideNode(slides[total - 1], -1)}
        {/* Real slides */}
        {slides.map((s, i) => SlideNode(s, i))}
        {/* Clone first */}
        {SlideNode(slides[0], total)}
      </div>

      {/* Arrows */}
      <button
        onClick={() => {
          if (locked) return;
          setLocked(true);
          setIsTransitioning(true);
          setIndex((p) => p - 1);
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
      </button>
      <button
        onClick={() => {
          if (locked) return;
          setLocked(true);
          setIsTransitioning(true);
          setIndex((p) => p + 1);
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
      </button>
    </div>
  );
}

/* ===================== Page ===================== */
export default function Home() {
  // --- Data ---
  const projects: Project[] = [
    { title: "Play Magazine", key: "play-magazine", href: "#" },
    { title: "Diary of a Song: Ed Sheeran’s ‘Shape of You’", key: "diary-ed-sheeran", href: "#" },
    { title: "Vogue: Taylor Hill", key: "taylor-hill-vogue", href: "#" },
    { title: "Zhiyun XS", key: "zhiyun-xs", href: "#" },
    // REMOVED: { title: "Olympians, as You’ve Never Seen Them", key: "winter-olympics", href: "#" },
    { title: "Usain Bolt and the Fastest Men in the World", key: "usain-bolt", href: "#" },
    { title: "2020 Tokyo Olympics", key: "olympics-ar", href: "#" },
    { title: "Eddie Martinez X Solinco", key: "solinco", href: "#" },
    { title: "Reconstructing the Bronx Fire", key: "bronx-fire", href: "#" },
    { title: "Seeking Pluto's Frigid Heart", key: "pluto", href: "#" },
    { title: "The Death Flights", key: "death-flights", href: "#" },
    { title: "CV", key: "cv", href: "#" },
  ];

  const images: Record<string, { src: string; alt: string; width: number; height: number }> = {
    pluto: { src: "/pluto_2.webp", alt: "Seeking Pluto's Frigid Heart", width: 600, height: 600 },
  };

  const projectDescriptions: Record<string, string> = {
    "play-magazine":
      "Client: PLAY Magazine\nDesigned the logo for the first edition of PLAY. A cookbook magazine featuring recipes, essays, and artwork from a community of LGBTQ+ chefs, writers, and artists.",
    "diary-ed-sheeran":
      "Client: The New York Times\nHow Ed Sheeran, Johnny McDaid and Steve Mac made the most-streamed track of 2017.",
    "taylor-hill-vogue":
      "Client: Vogue Arabia\nTaylor Hill for Vogue Arabia by Ryan Lucca.",
    "zhiyun-xs":
      "Client: Snakk Studio\nThis is Smooth-XS, the new colorful alternative of Smooth-X.",
    pluto:
      "Client: The New York Times\nWatch New Horizons glide through space at a million miles a day. Fly over Pluto's rugged surface and smooth heart-shaped plains. Stand on icy mountains.",
    "bronx-fire":
      "Client: The New York Times\nThe main fire safety system failed disastrously in a blaze at a Bronx apartment building in January, killing 17 people, The New York Times has found.",
    mariupol:
      "Client: Human Rights Watch\nThousands of civilians in Mariupol were killed during Russia's invasion, suffering some of the worst destruction in war-scarred Ukraine. SITU Research, Human Rights Watch, and Truth Hounds work to document this devastation and loss.",
    "death-flights":
      "Client: Centro Prodh\nThis video analysis is a visual reconstruction of one of the most clandestine programs of the so-called \"Dirty War\" era based on a military investigation, previous journalistic reporting, and analytical and visualization tools.",
    "usain-bolt":
      "Client: The New York Times\nThere are three Usain Bolts on this track: one from Beijing in 2008, one from London in 2012 and one from Rio de Janeiro in 2016.",
    // REMOVED: "winter-olympics": ...,
    "olympics-ar":
      "Client: The New York Times\nSuni Lee is making her Olympic debut after a challenging year. Her versatility is crucial to Team USA's shot at a third consecutive gold. Adam Ondra is the best climber in the world. But to win Olympic gold, he needed to learn a new way to climb. Fast.",
    solinco:
      "Client: The Second Serve Magazine\nThis custom racquet combines Solinco’s expertise in crafting sporting equipment of quality, performance, and versatility with Brooklyn artist Eddie Martinez’s signature tennis ball and “blockhead” motifs, to create a stylish racquet for discerning players and fans.",
    cv: "",
  };

  /* ===================== State & Refs ===================== */
  const [activeKey, setActiveKey] = useState<string>(projects[0]?.key ?? "");
  const [isMobile, setIsMobile] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // activeKey while scrolling middle column
  useEffect(() => {
    const root = scrollAreaRef.current;
    if (!root) return;
    let raf: number | null = null;

    const measureActive = () => {
      raf = null;
      const rootCenter = root.scrollTop + root.clientHeight / 2;
      let bestKey = activeKey;
      let bestDist = Infinity;

      for (const p of projects) {
        const el = itemRefs.current[p.key];
        if (!el) continue;
        const elCenter = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(elCenter - rootCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestKey = p.key;
        }
      }
      if (bestKey !== activeKey) setActiveKey(bestKey);
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(measureActive);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(measureActive);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
    };
  }, [projects, activeKey]);

  // redirect page wheel to gallery (middle column)
  useEffect(() => {
    const gallery = scrollAreaRef.current;
    if (!gallery) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      gallery.scrollTop += e.deltaY;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const scrollToKey = (key: string) => {
    const el = itemRefs.current[key];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  /* ===================== Slides (memoized where needed) ===================== */
  const playSlides: Slide[] = useMemo(
    () => [
      { src: "/play_1.webp", alt: "PLAY Slide 1", width: 700, height: 500 },
      { src: "/play_2.webp", alt: "PLAY Slide 2", width: 700, height: 500 },
      { src: "/play_3.webp", alt: "PLAY Slide 3", width: 700, height: 500 },
      { src: "/play_4.webp", alt: "PLAY Slide 4", width: 700, height: 500 },
    ],
    []
  );

  const vogueSlides: Slide[] = [
    { type: "image", src: "/vogue_1.png", alt: "Vogue Slide 1", width: 700, height: 500, className: "sm:w-[110%]" },
    { type: "video", src: "/vogue_compressed.webm", alt: "Vogue Slide 2", width: 700, height: 500, className: "sm:w-[75%]" },
  ];

  const usainSlides: Slide[] = [
    { type: "video", src: isMobile ? "/sprint_mobile.webm" : "/sprint_1.webm", alt: "Usain Bolt Sprint 1", width: 700, height: 500, className: "sm:w-[100%]" },
    { type: "image", src: "/sprint_2.webp", alt: "Usain Bolt Sprint 2", width: 700, height: 500, className: "sm:w-[100%]" },
    { type: "image", src: "/sprint_3.webp", alt: "Usain Bolt Sprint 3", width: 700, height: 500, className: "sm:w-[80%]" },
  ];

  // kept for reference; not used since Bronx is standalone now
  const bronxSlides: Slide[] = [
    { type: "video", src: "/bronx_compressed.webm", alt: "Bronx Fire Video 1", width: 800, height: 600, className: "sm:w-[100%]" },
  ];

  const mariupolSlides: Slide[] = [
    { src: "/mariupol_1.webp", alt: "Mariupol Slide 1", width: 800, height: 600, className: "sm:w-[100%]" },
    { src: "/mariupol_2.webp", alt: "Mariupol Slide 2", width: 800, height: 600, className: "sm:w-[100%]" },
  ];

  const solincoSlides: Slide[] = [
    { type: "image", src: "/solinco_1.webp", alt: "Solinco Slide 1", width: 800, height: 600, className: "sm:w-[50%]" },
    { type: "image", src: "/solinco_2.webp", alt: "Solinco Slide 2", width: 800, height: 600, className: "sm:w-[50%]" },
    { type: "image", src: "/solinco_3.webp", alt: "Solinco Slide 3", width: 800, height: 600, className: "sm:w-[50%]" },
  ];

  const deathSlides: Slide[] = [
    // Kept in case you revert to the carousel, but we render Death Flights as a standalone SmartVideo below.
    { type: "video", src: "/deathFlights_compressed.webm", alt: "Death Flights Video", width: 800, height: 600, className: "sm:w-[75%]" },
    { type: "image", src: "/deathFlights_2.webp", alt: "Death Flights Still", width: 800, height: 600, className: "sm:w-[75%]" },
  ];

  /* ===================== Category Labels (optional) ===================== */
  const categoryForKey = (key: string) => {
    if (key === "play-magazine") return "Culture";
    if (key === "usain-bolt") return "Sports";
    if (key === "bronx-fire") return "Science & Politics";
    return null;
  };

  /* ===================== Render ===================== */
  return (
    <main className="h-screen overflow-x-hidden sm:overflow-x-visible overflow-y-hidden bg-background text-foreground">
      <div className="w-full h-full">
        {/* Row */}
        <div className="flex flex-col sm:flex-row items-start gap-0 h-full min-h-0">
          {/* Left: Titles */}
          <aside
            ref={leftRef}
            className="w-[245px] shrink-0 sticky top-0 self-start pr-1 hidden sm:block"
          >
            <div className="mb-10">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">
                Grothjan Studio
              </h2>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400" />

            {/* Bio block */}
            <div className="px-3 mt-3 mb-4">
              <p className="text-[10px] leading-relaxed text-foreground/80 text-left">
                Award-winning art direction and animation. <br />
                Contact:{" "}
                <a
                  href="mailto:evangrothjan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  evangrothjan@gmail.com
                </a>
              </p>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400" />

            {/* Project titles */}
            <div className="px-3 mt-4">
              <ul className="space-y-[0.1rem] text-left">
                {projects
                  .filter(({ key }) => key !== "cv")
                  .map(({ title, key }) => {
                    const active = activeKey === key;
                    const cat = categoryForKey(key);
                    return (
                      <li key={key} className="flex flex-col items-start">
                        {cat && (
                          <span className="text-neutral-600 dark:text-neutral-400 uppercase text-xs my-2">
                            {cat}
                          </span>
                        )}
                        <div className="flex items-start gap-2">
                          <span
                            aria-hidden
                            className="w-2.5 h-2.5 rounded-full flex-none transition-transform duration-200 ease-out"
                            style={{
                              backgroundColor: active ? "rgb(220 38 38)" : "transparent",
                              transform: active ? "scale(1)" : "scale(0.8)",
                              marginTop: "calc((1.125rem - 0.625rem) / 2)",
                            }}
                          />
                          <button
                            onClick={() => scrollToKey(key)}
                            className="block text-[10px] leading-[1.125rem] text-foreground/90 hover:text-red-500 dark:hover:text-red-400 text-left whitespace-nowrap cursor-pointer"
                          >
                            {title}
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400 my-4 w-full" />

            {/* Descriptions */}
            {projectDescriptions[activeKey] && (
              <div className="px-3 text-[10px] leading-relaxed text-red-500 dark:text-red-400 whitespace-pre-line">
                {projectDescriptions[activeKey]}
              </div>
            )}
          </aside>

          {/* Divider */}
          <div className="w-px bg-red-500 dark:bg-red-400 h-full hidden sm:block" />

          {/* ---------------- MIDDLE COLUMN (scrolls) ---------------- */}
          <div className="flex-1 min-w-0 min-h-0 h-full">
            <SimpleBar
              scrollableNodeProps={{ ref: scrollAreaRef }}
              style={{ height: "100%" }}
              className="w-full sm:max-w-[1200px] sm:mx-auto pt-[50px] sm:pt-0 pb-3 flex flex-col items-stretch sm:items-center border-b border-red-500 dark:border-red-400 custom-scrollbar h-full overflow-x-hidden sm:overflow-x-visible px-0 sm:px-0"
              autoHide={false}
            >
              {/* Mobile-only fixed header */}
              <div className="sm:hidden fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-black border-b border-red-500 dark:border-red-400 px-3 py-2">
                {activeKey === "cv" ? (
                  <>
                    <h2 className="text-[12px] font-medium text-red-500 dark:text-red-400">
                      Studio Grothjan
                    </h2>
                    <p className="text-[10px] leading-relaxed text-foreground/80 mt-1">CV</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[12px] font-medium text-red-500 dark:text-red-400">
                      {projects.find((p) => p.key === activeKey)?.title}
                    </h2>
                    {projectDescriptions[activeKey] && (
                      <p className="text-[10px] leading-relaxed text-foreground/80 mt-1 whitespace-pre-line">
                        {projectDescriptions[activeKey]}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Desktop-only header */}
              <div className="hidden sm:block w-full text-left">
                <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">
                  Select Projects
                </h2>
                <div className="w-full h-px bg-red-500 dark:bg-red-400 mt-[40px] mb-[65px]" />
              </div>

              {projects
                .filter((p) => p.key !== "cv")
                .map((p, idx) => {
                  const img = images[p.key];
                  const isLast = idx === projects.length - 2;
                  const isDeathFlights = p.key === "death-flights";

                  return (
                    <div
                      key={p.key}
                      data-key={p.key}
                      ref={(el: HTMLDivElement | null) => {
                        itemRefs.current[p.key] = el;
                      }}
                      className={`w-full flex flex-col items-center ${idx === 0 ? "mt-[65px] sm:mt-0" : ""}`}
                    >
                      {/* Pull Death Flights up slightly on mobile to reduce extra above-gap */}
                      {isDeathFlights && <div className="sm:hidden -mt-[24px]" />}

                      <div className={`relative ${idx === 0 ? "sm:-mt-[10px] mt-[65px]" : ""}`}>
                        {/* EXTRA MOBILE-ONLY TOP BUFFER JUST FOR THE FIRST PLAY IMAGE */}
                        {idx === 0 && p.key === "play-magazine" && (
                          <div className="sm:hidden h-[30px]" />
                        )}

                        {/* Per-project renderers */}
                        {p.key === "play-magazine" ? (
                          <LoopingCarousel slides={playSlides} slideWidthPercent={75} autoplayMs={8000} />
                        ) : p.key === "taylor-hill-vogue" ? (
                          <LoopingCarousel slides={vogueSlides} />
                        ) : p.key === "usain-bolt" ? (
                          <LoopingCarousel slides={usainSlides} />
                        ) : p.key === "solinco" ? (
                          <LoopingCarousel slides={solincoSlides} />
                        ) : p.key === "diary-ed-sheeran" ? (
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/edsheeran_compressed"
                              className="object-contain w-full max-w-none sm:w-[100%] h-auto"
                              preload="metadata"
                            />
                          </div>
                        ) : p.key === "death-flights" ? (
                          // Standalone robust video with webm+mp4
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/deathFlights_compressed"
                              className="object-contain w-full max-w-none sm:w-[75%] h-auto"
                              preload="metadata"
                              // poster="/deathFlights_poster.jpg" // optional if you have it
                            />
                          </div>
                        ) : p.key === "bronx-fire" ? (
                          // You mentioned removing the carousel for Bronx — render as a single video
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/bronx_compressed"
                              className="object-contain w-full max-w-none sm:w-[100%] h-auto"
                              preload="metadata"
                            />
                          </div>
                        ) : p.key === "olympics-ar" ? (
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/olympicsAR_compressed_2"
                              className="object-contain w-full max-w-none sm:w-[100%] h-auto"
                              preload="metadata"
                            />
                          </div>
                        ) : p.key === "pluto" ? (
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/pluto_compressed"
                              className="object-contain w-full max-w-none sm:w-[75%] h-auto"
                              preload="metadata"
                            />
                          </div>
                        ) : p.key === "zhiyun-xs" ? (
                          <div className="w-full flex justify-center">
                            <SmartVideo
                              srcBase="/zhiyun_compressed"
                              className="object-contain w-full max-w-none sm:w-[100%] h-auto"
                              preload="metadata"
                            />
                          </div>
                        ) : p.key === "mariupol" ? (
                          <LoopingCarousel slides={mariupolSlides} />
                        ) : img ? (
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="object-contain w-full max-w-none sm:w-auto"
                            priority={idx === 0}
                          />
                        ) : null}
                      </div>

                      {/* Bottom divider */}
                      <div className="flex flex-col items-center w-full">
                        {/* Pre-divider gap: shorter on mobile for Death Flights */}
                        <div className={`${isDeathFlights ? "h-[32px] sm:h-[65px]" : "h-[65px]"}`} />
                        <div className="h-px bg-red-500 dark:bg-red-400 w-full" />
                        {/* Post-divider gap: shorter on mobile for Death Flights */}
                        <div className={`${isLast ? "sm:h-[65px] h-0" : isDeathFlights ? "h-[32px]" : "h-[65px]"}`} />
                      </div>
                    </div>
                  );
                })}

              {/* ---------------- MOBILE-ONLY CV ---------------- */}
              <div
                ref={(el) => {
                  itemRefs.current["cv"] = el;
                }}
                className="sm:hidden w-full px-3 pt-3 pb-12 mb-20 text-[10px] leading-relaxed"
              >
                {/* Group Exhibitions (reduced top spacing from red line above) */}
                <div className="mb-4">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                    Group Exhibitions
                  </h3>
                  <ul className="space-y-[0.2rem] text-[10px]">
                    <li>
                      Prada Foundation, 2025 Venice Biennali, <em>Diagrams</em> <br /> 2025
                    </li>
                    <li>
                      Architekturmuseum der TUM, <em>Visual Investigations</em> <br /> 2024
                    </li>
                  </ul>
                </div>

                {/* Divider between sections */}
                <div className="h-px bg-red-500 dark:bg-red-400 my-3 w-full" />

                {/* Select Awards */}
                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                    Select Awards
                  </h3>
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

                {/* Divider, then Select Clients BELOW Awards */}
                <div className="h-px bg-red-500 dark:bg-red-400 my-3 w-full" />

                {/* Select Clients (added below awards per request) */}
                <div className="mt-0">
                  <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                    Select Clients
                  </h3>
                  <p className="text-[10px]">
                    The New York Times, Bloomberg News, Eater, Vogue, MTV, Meta, Human Rights Watch, National Lawyers Guild
                  </p>
                </div>
              </div>
              {/* ---------------- /MOBILE-ONLY CV ---------------- */}
            </SimpleBar>
          </div>

          {/* Divider */}
          <div className="w-px bg-red-500 dark:bg-red-400 h-full hidden sm:block" />

          {/* ---------------- RIGHT COLUMN (single aside) ---------------- */}
          <aside className="basis-[clamp(13rem,17vw,19rem)] max-w-[22rem] grow-0 shrink-0 sticky top-0 self-start text-[10px] leading-relaxed px-1 hidden sm:block">
            <div className="mb-9.5">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">CV</h2>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400 mb-4 w-full" />

            {/* Group Exhibitions */}
            <div className="w-full mt-4 mb-4">
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Group Exhibitions
                </h3>
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

            <div className="h-px bg-red-500 dark:bg-red-400 my-4 w-full" />

            {/* Select Awards */}
            <div className="w-full mt-4 mb-4">
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Select Awards
                </h3>
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

            <div className="h-px bg-red-500 dark:bg-red-400 my-4 w-full" />

            {/* Select Clients */}
            <div className="w-full mt-4 mb-4">
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Select Clients
                </h3>
              </div>
              <div className="text-left block" style={{ width: "min(90%, 28rem)", marginInline: "auto" }}>
                <p className="text-[10px]">
                  The New York Times, Bloomberg News, Eater, Vogue, MTV, Meta, Human Rights Watch,
                  National Lawyers Guild
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
