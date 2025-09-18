"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Project = { title: string; key: string; href: string };

export default function Home() {
  // --- Data ---
  const projects: Project[] = [
    { title: "Play Magazine", key: "play-magazine", href: "#" },
    { title: "Diary of a Song: Ed Sheeran’s ‘Shape of You’", key: "diary-ed-sheeran", href: "#",},
    { title: "Vogue: Taylor Hill", key: "taylor-hill-vogue", href: "#",},
    { title: "Zhiyun XS", key: "zhiyun-xs", href: "#" },
    { title: "Four of the Best Olympians, as You’ve Never Seen Them", key: "winter-olympics", href: "#" },
    { title: "Usain Bolt and the Fastest Men in the World", key: "usain-bolt", href: "#" },
    { title: "2020 Tokyo Olympics", key: "olympics-ar", href: "#" },
    { title: "Eddie Martinez X Solinco", key: "solinco", href: "#" },
    { title: "Reconstructing the Bronx Fire", key: "bronx-fire", href: "#",},
    { title: "Seeking Pluto's Frigid Heart", key: "pluto", href: "#",},
    { title: "The Death Flights", key: "death-flights", href: "#",},
    { title: "CV", key: "cv", href: "#" },

  ];

  const images: Record<string, { src: string; alt: string; width: number; height: number }> = {
    pluto: { src: "/pluto_2.webp", alt: "Seeking Pluto's Frigid Heart", width: 600, height: 600 },
  };

const projectDescriptions: Record<string, string> = {
  "play-magazine": `Client: PLAY Magazine
Role: Brand Identity, 3D Designer

Designed the logo for the first edition of PLAY. A cookbook magazine featuring recipes, essays, and artwork from a community of LGBTQ+ chefs, writers, and artists.`,

  "diary-ed-sheeran": `Client: The New York Times
Role: Art Director, Animator

How Ed Sheeran, Johnny McDaid and Steve Mac made the most-streamed track of 2017. `,

  "taylor-hill-vogue": `Client: Vogue Arabia
Role: VFX Artist

Taylor Hill for Vogue Arabia by Ryan Lucca.`,

"zhiyun-xs": `Client: Snakk Studio
Role: Animator, 3D Designer

This is Smooth-XS, the new colorful alternative of Smooth-X.`,


  "pluto": `Client: The New York Times
Role: 3D Designer, Animator

Watch New Horizons glide through space at a million miles a day. Fly over Pluto's rugged surface and smooth heart-shaped plains. Stand on icy mountains.`,

  "bronx-fire": `Client: The New York Times
Role: Reporter, Animator, Art Director

The main fire safety system failed disastrously in a blaze at a Bronx apartment building in January, killing 17 people, The New York Times has found.`,

  "mariupol": `Client: Human Rights Watch
Role: Reporter, 3D Specialist

Thousands of civilians in Mariupol were killed during Russia's invasion, suffering some of the worst destruction in war-scarred Ukraine. SITU Research, Human Rights Watch, and Truth Hounds work to document this devastation and loss.`,

  "death-flights": `Client: Centro Prodh
Role: Director

This video analysis is a visual reconstruction of one of the most clandestine programs of the so-called "Dirty War" era based on a military investigation, previous journalistic reporting,  and analytical and visualization tools.`,

  "usain-bolt": `Client: The New York Times
Role: 3D Designer

There are three Usain Bolts on this track: one from Beijing in 2008, one from London in 2012 and one from Rio de Janeiro in 2016. The London .`,

"winter-olympics": `Client: The New York Times
Role: Art Director, Animator

Four Olympic champions captured in a new way — a unique look at the athletes redefining their sports.`,

  "olympics-ar": `Client: The New York Times
Role: Art Director, 3D Designer

Suni Lee is making her Olympic debut after a challenging year. Her versatility is crucial to Team USA's shot at a third consecutive gold. Adam Ondra is the best climber in the world. But to win Olympic gold, he needed to learn a new way to climb. Fast.`,

"solinco": `Client: The Second Serve Magazine
Role: Fabricator

This custom racquet combines Solinco’s expertise in crafting sporting equipment of quality, performance, and versatility with Brooklyn artist Eddie Martinez’s signature tennis ball and “blockhead” motifs, to create a stylish racquet for discerning players and fans.`,

cv: "",



};


    // ---- State ----
  const [activeKey, setActiveKey] = useState<string>(projects[0]?.key ?? "");
  const [baseGalleryWidthPx, setBaseGalleryWidthPx] = useState<number | null>(null);

// ---- Carousel state (Play + Vogue + Usain Bolt) ----

// PLAY
const [project1Index, setProject1Index] = useState(0);
const [isTransitioning, setIsTransitioning] = useState(true);
const [isLocked, setIsLocked] = useState(false);

const project1Slides = [
  { src: "/play_1.webp", alt: "PLAY Slide 1", width: 700, height: 500 },
  { src: "/play_2.webp", alt: "PLAY Slide 2", width: 700, height: 500 },
  { src: "/play_3.webp", alt: "PLAY Slide 3", width: 700, height: 500 },
  { src: "/play_4.webp", alt: "PLAY Slide 4", width: 700, height: 500 },
];

// VOGUE
const [vogueIndex, setVogueIndex] = useState(0);
const [isVogueTransitioning, setIsVogueTransitioning] = useState(true);
const [isVogueLocked, setIsVogueLocked] = useState(false);

const vogueSlides = [
  {
    type: "image",
    src: "/vogue_1.png",
    alt: "Vogue Slide 1",
    width: 700,
    height: 500,
    className: "w-[110%]", // smaller
  },
  {
    type: "video",
    src: "/vogue_2.webm",
    alt: "Vogue Slide 2",
    width: 700,
    height: 500,
    className: "w-[75%]", // normal size
  },
];

// ---- Carousel state for Usain Bolt ----
const [usainIndex, setUsainIndex] = useState(0);
const [isUsainTransitioning, setIsUsainTransitioning] = useState(true);
const [isUsainLocked, setIsUsainLocked] = useState(false);

const usainSlides = [
  {
    type: "video",
    src: "/sprint_1.webm",  // or sprint_1.mp4 with fallback
    alt: "Usain Bolt Sprint 1",
    width: 700,
    height: 500,
    className: "w-[100%]" // adjust size here
  },
  {
    type: "image",
    src: "/sprint_2.webp",
    alt: "Usain Bolt Sprint 2",
    width: 700,
    height: 500,
    className: "w-[100%]" // different size if needed
  },
  {
    type: "image",
    src: "/sprint_3.webp",
    alt: "Usain Bolt Sprint 3",
    width: 700,
    height: 500,
    className: "w-[80%]" // another size
  },
];

// ---- Carousel state (Bronx Fire) ----
const [bronxIndex, setBronxIndex] = useState(0);
const [isBronxTransitioning, setIsBronxTransitioning] = useState(true);
const [isBronxLocked, setIsBronxLocked] = useState(false);

const bronxSlides = [
  {
    type: "video",
    src: "/bronx_1.webm",
    alt: "Bronx Fire Video 1",
    width: 800,
    height: 600,
    className: "w-[100%]",
  },
  {
    type: "video",
    src: "/bronx_2.webm",
    alt: "Bronx Fire Video 2",
    width: 800,
    height: 600,
    className: "w-[100%]",
  },
  {
    type: "video",
    src: "/bronx_3.webm",
    alt: "Bronx Fire Video 3",
    width: 800,
    height: 600,
    className: "w-[100%]",
  },
  {
    type: "video",
    src: "/bronx_4.webm",
    alt: "Bronx Fire Video 4",
    width: 800,
    height: 600,
    className: "w-[100%]",
  },
];


// ---- Carousel state (Mariupol) ----
const [mariupolIndex, setMariupolIndex] = useState(0);
const [isMariupolTransitioning, setIsMariupolTransitioning] = useState(true);
const [isMariupolLocked, setIsMariupolLocked] = useState(false);

const mariupolSlides = [
  { src: "/mariupol_1.webp", alt: "Mariupol Slide 1", width: 800, height: 600, className: "w-[100%]" },
  { src: "/mariupol_2.webp", alt: "Mariupol Slide 2", width: 800, height: 600, className: "w-[100%]" },
];

// ---- Carousel state (Solinco) ----
const [solincoIndex, setSolincoIndex] = useState(0);
const [isSolincoTransitioning, setIsSolincoTransitioning] = useState(true);
const [isSolincoLocked, setIsSolincoLocked] = useState(false);

const solincoSlides = [
  { type: "image", src: "/solinco_1.webp", alt: "Solinco Slide 1", width: 800, height: 600, className: "w-[50%]" },
  { type: "image", src: "/solinco_2.webp", alt: "Solinco Slide 2", width: 800, height: 600, className: "w-[50%]" },
  { type: "image", src: "/solinco_3.webp", alt: "Solinco Slide 3", width: 800, height: 600, className: "w-[50%]" },
];

// ---- Carousel state (Death Flights) ----
const [deathFlightsIndex, setDeathFlightsIndex] = useState(0);
const [isDeathFlightsTransitioning, setIsDeathFlightsTransitioning] = useState(true);
const [isDeathFlightsLocked, setIsDeathFlightsLocked] = useState(false);

const deathFlightsSlides = [
  {
    type: "video",
    src: "/deathFlights_1.webm",
    alt: "Death Flights Video",
    width: 800,
    height: 600,
    className: "w-[75%]",
  },
  {
    type: "image",
    src: "/deathFlights_2.webp",
    alt: "Death Flights Still",
    width: 800,
    height: 600,
    className: "w-[75%]",
  },
];



// ---- Refs ----
const leftRef = useRef<HTMLDivElement>(null);
const scrollAreaRef = useRef<HTMLDivElement>(null);
const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

// ---- Autoplay effect (with tab visibility handling) ----
useEffect(() => {
  let interval: NodeJS.Timeout | null = null;

  const start = () => {
    if (!interval) {
      interval = setInterval(() => {
        setIsLocked(true);
        setIsTransitioning(true);
        setProject1Index((prev) => prev + 1);
      }, 8000); // 10000 ms = 5 seconds
    }
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const handleVisibility = () => {
    if (document.hidden) {
      stop();
    } else {
      // snap safely if user was gone a long time
      setIsTransitioning(false);
      setProject1Index((prev) => prev % project1Slides.length);
      start();
    }
  };

  // start on mount
  start();

  // listen for tab visibility change
  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    stop();
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, [project1Slides.length]);



  // 🔑 Highlight update logic for gallery scroll
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

  // 📌 Redirect page wheel scroll to gallery
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

  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return;
      const base = Math.min(window.innerWidth * 0.78, 1200);
      setBaseGalleryWidthPx(base);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const scrollToKey = (key: string) => {
    const el = itemRefs.current[key];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <div className="w-full h-full">
        <div className="flex flex-col sm:flex-row items-start gap-0 h-full">
          {/* Left: Titles */}
          <aside
    ref={leftRef}
    className="w-[315px] shrink-0 sticky top-0 self-start pr-1 hidden sm:block"
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
                Evan Grothjan is an art director, designer, and animator specializing in
                spatial storytelling. Combining emerging technologies with an eye towards
                cinema, he transforms complex ideas into engaging stories for audiences
                and brands.
                <br /><br />
                Former editor at{" "}
                <a
                  href="https://www.nytimes.com/by/evan-grothjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600"
                >
                  The New York Times
                </a>.
              </p>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400" />

            {/* Project titles */}
<div className="px-3 mt-4">
  <ul className="space-y-[0.2875rem] text-left">
  {projects
    .filter(({ key }) => key !== "cv") // 👈 exclude CV here
    .map(({ title, key }) => {
      const active = activeKey === key;

      return (
        <li key={key} className="flex flex-col items-start">
          {/* Category labels */}
          {key === "play-magazine" && (
            <span className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
              Culture
            </span>
          )}
          {key === "winter-olympics" && (
  <span className="text-neutral-600 dark:text-neutral-400 uppercase text-xs my-2">
    Sports
  </span>
)}

          {key === "bronx-fire" && (
            <span className="text-neutral-600 dark:text-neutral-400 uppercase text-xs my-2">
              Science & Politics
            </span>
          )}

          {/* Project title row */}
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

<div className="w-px bg-red-500 dark:bg-red-400 h-full hidden sm:block" />




{/* ---------------- MIDDLE COLUMN ---------------- */}
  <SimpleBar
  scrollableNodeProps={{ ref: scrollAreaRef }}
  style={{
    height: "100%",
    width:
      typeof window !== "undefined" && window.innerWidth >= 640
        ? baseGalleryWidthPx
          ? baseGalleryWidthPx * 0.72
          : undefined
        : "100%",
  }}
  className="
    pt-[50px] sm:pt-0 px-1 pb-3 flex flex-col items-center 
    border-b border-red-500 dark:border-red-400 
    custom-scrollbar h-full 
    mx-auto w-full sm:w-auto
  "
  autoHide={false}
>
{/* Mobile-only fixed header */}
<div className="sm:hidden fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-black border-b border-red-500 dark:border-red-400 px-3 py-2">
  {activeKey === "cv" ? (
    <>
      <h2 className="text-[12px] font-medium text-red-500 dark:text-red-400">
        Studio Grothjan
      </h2>
      <p className="text-[10px] leading-relaxed text-foreground/80 mt-1">
        CV
      </p>
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



{/* Desktop-only "Select Projects" + divider */}
<div className="hidden sm:block w-full text-left">
  <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">
    Select Projects
  </h2>
  <div className="w-full h-px bg-red-500 dark:bg-red-400 mt-[40px] mb-[65px]" />
</div>


  {projects
  .filter((p) => p.key !== "cv")   // 👈 NEW: exclude cv here
  .map((p, idx) => {
    const img = images[p.key];
    const isLast = idx === projects.length - 2;

    return (
      <div
  key={p.key}
  data-key={p.key}
  ref={(el: HTMLDivElement | null) => {
    itemRefs.current[p.key] = el;
  }}
  className={`w-full flex flex-col items-center ${
    idx === 0 ? "mt-[65px] sm:mt-0" : ""
  }`}
>
        <div
  className={`relative ${
    idx === 0 ? "sm:-mt-[10px] mt-[65px]" : ""
  }`}
>
          {p.key === "play-magazine" ? (
            /* ---- PLAY Magazine carousel ---- */
            <div className="relative w-full flex justify-center overflow-hidden">
              <div
                className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{
                  width: `${(project1Slides.length + 2) * 100}%`,
                  transform: `translateX(-${(project1Index + 1) * 100}%)`,
                }}
                onTransitionEnd={() => {
                  setIsLocked(false);
                  if (project1Index === -1) {
                    setIsTransitioning(false);
                    setProject1Index(project1Slides.length - 1);
                  } else if (project1Index === project1Slides.length) {
                    setIsTransitioning(false);
                    setProject1Index(0);
                  } else {
                    setIsTransitioning(true);
                  }
                }}
              >
                {/* Clone last */}
                <div className="w-full flex justify-center flex-shrink-0">
                  <Image
                    src={project1Slides[project1Slides.length - 1].src}
                    alt={project1Slides[project1Slides.length - 1].alt}
                    width={project1Slides[project1Slides.length - 1].width}
                    height={project1Slides[project1Slides.length - 1].height}
                    className="object-contain w-[75%] h-auto"
                  />
                </div>

                {/* Real slides */}
                {project1Slides.map((slide, slideIdx) => (
                  <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      className="object-contain w-[75%] h-auto"
                    />
                  </div>
                ))}

                {/* Clone first */}
                <div className="w-full flex justify-center flex-shrink-0">
                  <Image
                    src={project1Slides[0].src}
                    alt={project1Slides[0].alt}
                    width={project1Slides[0].width}
                    height={project1Slides[0].height}
                    className="object-contain w-[75%] h-auto"
                  />
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={() => {
                  if (isLocked) return;
                  setIsLocked(true);
                  setIsTransitioning(true);
                  setProject1Index((prev) => prev - 1);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
              <button
                onClick={() => {
                  if (isLocked) return;
                  setIsLocked(true);
                  setIsTransitioning(true);
                  setProject1Index((prev) => prev + 1);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
            </div>
          ) : p.key === "taylor-hill-vogue" ? (
            /* ---- VOGUE carousel ---- */
            <div className="relative w-full flex justify-center overflow-hidden">
              <div
                className={`flex ${isVogueTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{
                  width: `${(vogueSlides.length + 2) * 100}%`,
                  transform: `translateX(-${(vogueIndex + 1) * 100}%)`,
                }}
                onTransitionEnd={() => {
                  setIsVogueLocked(false);
                  if (vogueIndex === -1) {
                    setIsVogueTransitioning(false);
                    setVogueIndex(vogueSlides.length - 1);
                  } else if (vogueIndex === vogueSlides.length) {
                    setIsVogueTransitioning(false);
                    setVogueIndex(0);
                  } else {
                    setIsVogueTransitioning(true);
                  }
                }}
              >
                {/* Clone last */}
                <div className="w-full flex justify-center flex-shrink-0">
                  {vogueSlides[vogueSlides.length - 1].type === "image" ? (
                    <Image
                      src={vogueSlides[vogueSlides.length - 1].src}
                      alt={vogueSlides[vogueSlides.length - 1].alt}
                      width={vogueSlides[vogueSlides.length - 1].width}
                      height={vogueSlides[vogueSlides.length - 1].height}
                      className={`object-contain h-auto ${vogueSlides[vogueSlides.length - 1].className}`}
                    />
                  ) : (
                    <video
                      src={vogueSlides[vogueSlides.length - 1].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`object-contain h-auto ${vogueSlides[vogueSlides.length - 1].className}`}
                    />
                  )}
                </div>

                {/* Real slides */}
                {vogueSlides.map((slide, slideIdx) => (
                  <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
                    {slide.type === "image" ? (
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={slide.width}
                        height={slide.height}
                        className={`object-contain h-auto ${slide.className}`}
                      />
                    ) : (
                      <video
                        src={slide.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`object-contain h-auto ${slide.className}`}
                      />
                    )}
                  </div>
                ))}

                {/* Clone first */}
                <div className="w-full flex justify-center flex-shrink-0">
                  {vogueSlides[0].type === "image" ? (
                    <Image
                      src={vogueSlides[0].src}
                      alt={vogueSlides[0].alt}
                      width={vogueSlides[0].width}
                      height={vogueSlides[0].height}
                      className={`object-contain h-auto ${vogueSlides[0].className}`}
                    />
                  ) : (
                    <video
                      src={vogueSlides[0].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`object-contain h-auto ${vogueSlides[0].className}`}
                    />
                  )}
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={() => {
                  if (isVogueLocked) return;
                  setIsVogueLocked(true);
                  setIsVogueTransitioning(true);
                  setVogueIndex((prev) => prev - 1);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
              <button
                onClick={() => {
                  if (isVogueLocked) return;
                  setIsVogueLocked(true);
                  setIsVogueTransitioning(true);
                  setVogueIndex((prev) => prev + 1);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
            </div>
          ) : p.key === "usain-bolt" ? (
            /* ---- Usain Bolt carousel ---- */
            <div className="relative w-full flex justify-center overflow-hidden">
              <div
                className={`flex ${isUsainTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{
                  width: `${(usainSlides.length + 2) * 100}%`,
                  transform: `translateX(-${(usainIndex + 1) * 100}%)`,
                }}
                onTransitionEnd={() => {
                  setIsUsainLocked(false);
                  if (usainIndex === -1) {
                    setIsUsainTransitioning(false);
                    setUsainIndex(usainSlides.length - 1);
                  } else if (usainIndex === usainSlides.length) {
                    setIsUsainTransitioning(false);
                    setUsainIndex(0);
                  } else {
                    setIsUsainTransitioning(true);
                  }
                }}
              >
                {/* Clone last */}
                <div className="w-full flex justify-center flex-shrink-0">
                  {usainSlides[usainSlides.length - 1].type === "image" ? (
                    <Image
                      src={usainSlides[usainSlides.length - 1].src}
                      alt={usainSlides[usainSlides.length - 1].alt}
                      width={usainSlides[usainSlides.length - 1].width}
                      height={usainSlides[usainSlides.length - 1].height}
                      className={`object-contain h-auto ${usainSlides[usainSlides.length - 1].className}`}
                    />
                  ) : (
                    <video
                      src={usainSlides[usainSlides.length - 1].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`object-contain h-auto ${usainSlides[usainSlides.length - 1].className}`}
                    />
                  )}
                </div>

                {/* Real slides */}
                {usainSlides.map((slide, slideIdx) => (
                  <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
                    {slide.type === "image" ? (
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={slide.width}
                        height={slide.height}
                        className={`object-contain h-auto ${slide.className}`}
                      />
                    ) : (
                      <video
                        src={slide.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`object-contain h-auto ${slide.className}`}
                      />
                    )}
                  </div>
                ))}

                {/* Clone first */}
                <div className="w-full flex justify-center flex-shrink-0">
                  {usainSlides[0].type === "image" ? (
                    <Image
                      src={usainSlides[0].src}
                      alt={usainSlides[0].alt}
                      width={usainSlides[0].width}
                      height={usainSlides[0].height}
                      className={`object-contain h-auto ${usainSlides[0].className}`}
                    />
                  ) : (
                    <video
                      src={usainSlides[0].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`object-contain h-auto ${usainSlides[0].className}`}
                    />
                  )}
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={() => {
                  if (isUsainLocked) return;
                  setIsUsainLocked(true);
                  setIsUsainTransitioning(true);
                  setUsainIndex((prev) => prev - 1);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
              <button
                onClick={() => {
                  if (isUsainLocked) return;
                  setIsUsainLocked(true);
                  setIsUsainTransitioning(true);
                  setUsainIndex((prev) => prev + 1);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
            </div>
            ) : p.key === "solinco" ? (
  /* ---- Solinco carousel ---- */
  <div className="relative w-full flex justify-center overflow-hidden">
    <div
      className={`flex ${isSolincoTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
      style={{
        width: `${(solincoSlides.length + 2) * 100}%`,
        transform: `translateX(-${(solincoIndex + 1) * 100}%)`,
      }}
      onTransitionEnd={() => {
        setIsSolincoLocked(false);
        if (solincoIndex === -1) {
          setIsSolincoTransitioning(false);
          setSolincoIndex(solincoSlides.length - 1);
        } else if (solincoIndex === solincoSlides.length) {
          setIsSolincoTransitioning(false);
          setSolincoIndex(0);
        } else {
          setIsSolincoTransitioning(true);
        }
      }}
    >
      {/* Clone last */}
      <div className="w-full flex justify-center flex-shrink-0">
        <Image
          src={solincoSlides[solincoSlides.length - 1].src}
          alt={solincoSlides[solincoSlides.length - 1].alt}
          width={solincoSlides[solincoSlides.length - 1].width}
          height={solincoSlides[solincoSlides.length - 1].height}
          className={`object-contain h-auto ${solincoSlides[solincoSlides.length - 1].className}`}
        />
      </div>

      {/* Real slides */}
      {solincoSlides.map((slide, slideIdx) => (
        <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
          <Image
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            className={`object-contain h-auto ${slide.className}`}
          />
        </div>
      ))}

      {/* Clone first */}
      <div className="w-full flex justify-center flex-shrink-0">
        <Image
          src={solincoSlides[0].src}
          alt={solincoSlides[0].alt}
          width={solincoSlides[0].width}
          height={solincoSlides[0].height}
          className={`object-contain h-auto ${solincoSlides[0].className}`}
        />
      </div>
    </div>

    {/* Arrows */}
    <button
      onClick={() => {
        if (isSolincoLocked) return;
        setIsSolincoLocked(true);
        setIsSolincoTransitioning(true);
        setSolincoIndex((prev) => prev - 1);
      }}
      className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
    <button
      onClick={() => {
        if (isSolincoLocked) return;
        setIsSolincoLocked(true);
        setIsSolincoTransitioning(true);
        setSolincoIndex((prev) => prev + 1);
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
  </div>

          ) : p.key === "bronx-fire" ? (
  /* ---- Bronx Fire video carousel ---- */
  <div className="relative w-full flex justify-center overflow-hidden">
    <div
      className={`flex ${isBronxTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
      style={{
        width: `${(bronxSlides.length + 2) * 100}%`,
        transform: `translateX(-${(bronxIndex + 1) * 100}%)`,
      }}
      onTransitionEnd={() => {
        setIsBronxLocked(false);
        if (bronxIndex === -1) {
          setIsBronxTransitioning(false);
          setBronxIndex(bronxSlides.length - 1);
        } else if (bronxIndex === bronxSlides.length) {
          setIsBronxTransitioning(false);
          setBronxIndex(0);
        } else {
          setIsBronxTransitioning(true);
        }
      }}
    >
      {/* Clone last */}
      <div className="w-full flex justify-center flex-shrink-0">
        <video
          src={bronxSlides[bronxSlides.length - 1].src}
          autoPlay
          muted
          loop
          playsInline
          className={`object-contain h-auto ${bronxSlides[bronxSlides.length - 1].className}`}
        />
      </div>

      {/* Real slides */}
      {bronxSlides.map((slide, slideIdx) => (
        <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
          <video
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
            className={`object-contain h-auto ${slide.className}`}
          />
        </div>
      ))}

      {/* Clone first */}
      <div className="w-full flex justify-center flex-shrink-0">
        <video
          src={bronxSlides[0].src}
          autoPlay
          muted
          loop
          playsInline
          className={`object-contain h-auto ${bronxSlides[0].className}`}
        />
      </div>
    </div>

    {/* Arrows */}
    <button
      onClick={() => {
        if (isBronxLocked) return;
        setIsBronxLocked(true);
        setIsBronxTransitioning(true);
        setBronxIndex((prev) => prev - 1);
      }}
      className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
    <button
      onClick={() => {
        if (isBronxLocked) return;
        setIsBronxLocked(true);
        setIsBronxTransitioning(true);
        setBronxIndex((prev) => prev + 1);
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
  </div>


          ) : p.key === "diary-ed-sheeran" ? (
            /* ---- Ed Sheeran video ---- */
            <div className="w-full flex justify-center">
              <video
                src="/edsheeran_1.webm"
                autoPlay
                muted
                loop
                playsInline
                className="object-contain w-[100%] h-auto"
              />
            </div>
          ) : p.key === "death-flights" ? (
  /* ---- Death Flights carousel ---- */
  <div className="relative w-full flex justify-center overflow-hidden">
    <div
      className={`flex ${isDeathFlightsTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
      style={{
        width: `${(deathFlightsSlides.length + 2) * 100}%`,
        transform: `translateX(-${(deathFlightsIndex + 1) * 100}%)`,
      }}
      onTransitionEnd={() => {
        setIsDeathFlightsLocked(false);
        if (deathFlightsIndex === -1) {
          setIsDeathFlightsTransitioning(false);
          setDeathFlightsIndex(deathFlightsSlides.length - 1);
        } else if (deathFlightsIndex === deathFlightsSlides.length) {
          setIsDeathFlightsTransitioning(false);
          setDeathFlightsIndex(0);
        } else {
          setIsDeathFlightsTransitioning(true);
        }
      }}
    >
      {/* Clone last */}
      <div className="w-full flex justify-center flex-shrink-0">
        {deathFlightsSlides[deathFlightsSlides.length - 1].type === "image" ? (
          <Image
            src={deathFlightsSlides[deathFlightsSlides.length - 1].src}
            alt={deathFlightsSlides[deathFlightsSlides.length - 1].alt}
            width={deathFlightsSlides[deathFlightsSlides.length - 1].width}
            height={deathFlightsSlides[deathFlightsSlides.length - 1].height}
            className={`object-contain h-auto ${deathFlightsSlides[deathFlightsSlides.length - 1].className}`}
          />
        ) : (
          <video
            src={deathFlightsSlides[deathFlightsSlides.length - 1].src}
            autoPlay
            muted
            loop
            playsInline
            className={`object-contain h-auto ${deathFlightsSlides[deathFlightsSlides.length - 1].className}`}
          />
        )}
      </div>

      {/* Real slides */}
      {deathFlightsSlides.map((slide, slideIdx) => (
        <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
          {slide.type === "image" ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              className={`object-contain h-auto ${slide.className}`}
            />
          ) : (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className={`object-contain h-auto ${slide.className}`}
            />
          )}
        </div>
      ))}

      {/* Clone first */}
      <div className="w-full flex justify-center flex-shrink-0">
        {deathFlightsSlides[0].type === "image" ? (
          <Image
            src={deathFlightsSlides[0].src}
            alt={deathFlightsSlides[0].alt}
            width={deathFlightsSlides[0].width}
            height={deathFlightsSlides[0].height}
            className={`object-contain h-auto ${deathFlightsSlides[0].className}`}
          />
        ) : (
          <video
            src={deathFlightsSlides[0].src}
            autoPlay
            muted
            loop
            playsInline
            className={`object-contain h-auto ${deathFlightsSlides[0].className}`}
          />
        )}
      </div>
    </div>

    {/* Arrows */}
    <button
      onClick={() => {
        if (isDeathFlightsLocked) return;
        setIsDeathFlightsLocked(true);
        setIsDeathFlightsTransitioning(true);
        setDeathFlightsIndex((prev) => prev - 1);
      }}
      className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
    <button
      onClick={() => {
        if (isDeathFlightsLocked) return;
        setIsDeathFlightsLocked(true);
        setIsDeathFlightsTransitioning(true);
        setDeathFlightsIndex((prev) => prev + 1);
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
    >
      <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
    </button>
  </div>

            ) : p.key === "olympics-ar" ? (
            /* ---- Olympics AR video ---- */
            <div className="w-full flex justify-center">
              <video
                src="/olympicsAR_2.webm"
                autoPlay
                muted
                loop
                playsInline
                className="object-contain w-[100%] h-auto"
              />
            </div>
          ) : p.key === "pluto" ? (
            /* ---- Pluto video ---- */
            <div className="w-full flex justify-center">
              <video
                src="/pluto_3.webm"
                autoPlay
                muted
                loop
                playsInline
                className="object-contain w-[75%] h-auto"
              />
            </div>

            ) : p.key === "winter-olympics" ? (
  /* ---- Winter Olympics video ---- */
  <div className="w-full flex justify-center">
    <video
      src="/winterOlympics_1.webm"
      autoPlay
      muted
      loop
      playsInline
      className="object-contain w-[100%] h-auto"
    />
  </div>


            ) : p.key === "zhiyun-xs" ? (
  /* ---- Zhiyun XS video ---- */
  <div className="w-full flex justify-center">
    <video
      src="/zhiyun_1.webm"
      autoPlay
      muted
      loop
      playsInline
      className="object-contain w-[100%] h-auto"
    />
  </div>

          ) : p.key === "mariupol" ? (
            /* ---- Mariupol carousel ---- */
            <div className="relative w-full flex justify-center overflow-hidden">
              <div
                className={`flex ${isMariupolTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{
                  width: `${(mariupolSlides.length + 2) * 100}%`,
                  transform: `translateX(-${(mariupolIndex + 1) * 100}%)`,
                }}
                onTransitionEnd={() => {
                  setIsMariupolLocked(false);
                  if (mariupolIndex === -1) {
                    setIsMariupolTransitioning(false);
                    setMariupolIndex(mariupolSlides.length - 1);
                  } else if (mariupolIndex === mariupolSlides.length) {
                    setIsMariupolTransitioning(false);
                    setMariupolIndex(0);
                  } else {
                    setIsMariupolTransitioning(true);
                  }
                }}
              >
                {/* Clone last */}
                <div className="w-full flex justify-center flex-shrink-0">
                  <Image
                    src={mariupolSlides[mariupolSlides.length - 1].src}
                    alt={mariupolSlides[mariupolSlides.length - 1].alt}
                    width={mariupolSlides[mariupolSlides.length - 1].width}
                    height={mariupolSlides[mariupolSlides.length - 1].height}
                    className={`object-contain h-auto ${mariupolSlides[mariupolSlides.length - 1].className}`}
                  />
                </div>

                {/* Real slides */}
                {mariupolSlides.map((slide, slideIdx) => (
                  <div key={slideIdx} className="w-full flex justify-center flex-shrink-0">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={slide.width}
                      height={slide.height}
                      className={`object-contain h-auto ${slide.className}`}
                    />
                  </div>
                ))}

                {/* Clone first */}
                <div className="w-full flex justify-center flex-shrink-0">
                  <Image
                    src={mariupolSlides[0].src}
                    alt={mariupolSlides[0].alt}
                    width={mariupolSlides[0].width}
                    height={mariupolSlides[0].height}
                    className={`object-contain h-auto ${mariupolSlides[0].className}`}
                  />
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={() => {
                  if (isMariupolLocked) return;
                  setIsMariupolLocked(true);
                  setIsMariupolTransitioning(true);
                  setMariupolIndex((prev) => prev - 1);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronLeft className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
              <button
                onClick={() => {
                  if (isMariupolLocked) return;
                  setIsMariupolLocked(true);
                  setIsMariupolTransitioning(true);
                  setMariupolIndex((prev) => prev + 1);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <ChevronRight className="w-20 h-20 text-red-500 dark:text-red-400 stroke-[0.55]" />
              </button>
            </div>
          ) : img ? (
            /* ---- Default images ---- */
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="object-contain"
              priority={idx === 0}
            />
          ) : null}
        </div>

        {/* Always show bottom divider */}
      <div className="flex flex-col items-center w-full">
  <div className="h-[65px]" />
  <div className="h-px bg-red-500 dark:bg-red-400 w-full" />
  <div className={`${isLast ? "sm:h-[65px] h-0" : "h-[65px]"}`} />
</div>

    </div>
  );
})}
  
  {/* Mobile-only CV at the very bottom */}
<div
  ref={(el) => {
    itemRefs.current["cv"] = el;
  }}
  className="sm:hidden w-full px-3 py-10 mb-20 text-[10px] leading-relaxed"
>

  {/* Group Exhibitions */}
  <div className="mb-6">
    <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
      Group Exhibitions
    </h3>
    <ul className="space-y-[0.2rem] text-[10px]">
      <li>
        Prada Foundation, 2025 Venice Biennali, <em>Diagrams</em>
        <br />2025
      </li>
      <li>
        Architekturmuseum der TUM, <em>Visual Investigations</em>
        <br />2024
      </li>
    </ul>
  </div>

  <div className="h-px bg-red-500 dark:bg-red-400 mb-4 w-full" />

  {/* Speaking */}
  <div className="mb-6">
    <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
      Speaking
    </h3>
    <ul className="space-y-[0.2rem] text-[10px]">
      <li>RightsCon, Talk, <em>Reconstructing History</em><br />2025</li>
      <li>Politecnico di Milano, Design Density Course<br />2024</li>
      <li>The Ukrainian Museum, Panel<br />2024</li>
      <li>Harvard IHR Clinic, Presentation<br />2024</li>
      <li>Columbia GSAPP, Guest Critic<br />2024</li>
      <li>Society of Professional Journalists, Panel<br />2023</li>
      <li>Newseum, Panel<br />2022</li>
    </ul>
  </div>

  <div className="h-px bg-red-500 dark:bg-red-400 mb-4 w-full" />

  {/* Select Awards */}
  <div>
    <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
      Select Awards
    </h3>
    <ul className="space-y-[0.2rem] text-[10px]">
      <li>Pulitzer Finalist, <em>Bronx Fire</em><br />2023</li>
      <li>SND Bronze, <em>Bronx Fire</em><br />2023</li>
      <li>SND Silver, <em>Dixie Fire</em><br />2022</li>
      <li>Emmy Winner, <em>One Building, One Bomb</em><br />2019</li>
      <li>SND &amp; Malofiej Medals, <em>Apollo 11</em><br />2019</li>
      <li>World Press Photo, <em>Under a Cracked Sky</em><br />2018</li>
    </ul>
  </div>
</div>


  </SimpleBar>

  <div className="w-px bg-red-500 dark:bg-red-400 h-full hidden sm:block" />



        <div className="w-px bg-red-500 dark:bg-red-400 h-full" />

          {/* Right: Details column */}
          <aside className="flex-1 shrink-0 sticky top-0 self-start text-[10px] leading-relaxed px-1 hidden sm:block">
            <div className="mb-9.5">
              <h2 className="text-[14px] tracking-wide text-black dark:text-white opacity-80">
                CV
              </h2>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400 mb-4 w-full" />

            {/* Group Exhibitions */}
            <div className="w-full mt-4 mb-4">
              <div
                className="text-left block"
                style={{ width: "min(85%, 28rem)", marginInline: "auto" }}
              >
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Group Exhibitions
                </h3>
                <ul className="space-y-[0.2rem] text-[10px]">
                  <li>
                    Prada Foundation, <em>Diagrams</em>
                    <br />2025
                  </li>
                  <li>
                    Architekturmuseum der TUM, <em>Visual Investigations</em>
                    <br />2024
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400 my-4 w-full" />

            {/* Speaking */}
            <div className="w-full mt-4 mb-4">
              <div
                className="text-left block"
                style={{ width: "min(85%, 28rem)", marginInline: "auto" }}
              >
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Speaking
                </h3>
                <ul className="space-y-[0.2rem] text-[10px]">
                  <li>
                    RightsCon, Talk, <em>Reconstructing History</em>
                    <br />2025
                  </li>
                  <li>Politecnico di Milano, Design Density Course<br />2024</li>
                  <li>The Ukrainian Museum, Panel<br />2024</li>
                  <li>Harvard IHR Clinic, Presentation<br />2024</li>
                  <li>Columbia GSAPP, Guest Critic<br />2024</li>
                  <li>Society of Professional Journalists, Panel<br />2023</li>
                  <li>Newseum, Panel<br />2022</li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-red-500 dark:bg-red-400 my-4 w-full" />

            {/* Select Awards */}
            <div className="w-full mt-4 mb-4">
              <div
                className="text-left block"
                style={{ width: "min(85%, 28rem)", marginInline: "auto" }}
              >
                <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">
                  Select Awards
                </h3>
                <ul className="space-y-[0.2rem] text-[10px]">
                  <li>
                    Pulitzer Finalist, <em>Bronx Fire</em>
                    <br />2023
                  </li>
                  <li>
                    SND Bronze, <em>Bronx Fire</em>
                    <br />2023
                  </li>
                  <li>
                    SND Silver, <em>Dixie Fire</em>
                    <br />2022
                  </li>
                  <li>
                    Emmy Winner, <em>One Building, One Bomb</em>
                    <br />2019
                  </li>
                  <li>
                    SND &amp; Malofiej Medals, <em>Apollo 11</em>
                    <br />2019
                  </li>
                  <li>
                    World Press Photo, <em>Under a Cracked Sky</em>
                    <br />2018
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
