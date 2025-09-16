"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const leftColRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [hovered, setHovered] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursorLabel, setShowCursorLabel] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [leftColHeight, setLeftColHeight] = useState<number | null>(null);
  const [slideshowIndex, setSlideshowIndex] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const hoverImages: [string, string, string][] = [
    ["iic_2.webp", "Immigration Industrial Complex", "immigration"],
    ["deathFlights_2.webp", "The Death Flights", "death-flights"],
    ["protests_1.webp", "George Floyd Protests 2020", "george-floyd"],
    ["ant_1.webp", "The Antarctica Series", "antarctica"],
    ["mariupol_1.webp", "Mariupol", "mariupol"],
    ["bronx_1.webp", "Bronx Fire", "bronx-fire"],
    ["mm_5.jpg", "Play Magazine", "mm"],
  ];

  const hoverLabels: Record<string, string> = {
    "immigration": "Remote Sensing",
    "death-flights": "OSINT",
    "george-floyd": "OSINT",
    "mariupol": "Spatial Reconstruction",
    "mm": "Spatial Reconstruction",
    "bronx-fire": "Data Visualization",
    "antarctica": "Emerging Tech",
  };

  const projectsByYear: [string, { title: string; key?: string; href: string }[]][] = [
    ["Ongoing", [{ title: "Immigrant Industrial Complex", key: "immigration", href: "/work/immigration-industrial-complex" }]],
    ["2025", [{ title: "Documenting the Disappeared: The Death Flights", key: "death-flights", href: "/work/the-death-flights" }]],
    ["2024", [{ title: "Beneath the Rubble: Mariupol", key: "mariupol", href: "/work/mariupol" }]],
    ["2023", [{ title: "Class Action Lawsuit vs. NYPD: 2020 George Floyd Protests", key: "george-floyd", href: "/work/george-floyd-protests-2020" }]],
    ["2022", [{ title: "The Bronx Fire: A Series of Events that Left 17 Dead", key: "bronx-fire", href: "/work/bronx-fire" }]],
    ["2021", [{ title: "Play Magazine", key: "mm", href: "/work/play-mag" }]],
    ["2018", [{ title: "The Antarctica Series", key: "antarctica", href: "/work/antarctica-series" }]],
  ];

  useEffect(() => {
    if (leftColRef.current) {
      setLeftColHeight(leftColRef.current.offsetHeight);
    }
    setSlideshowIndex(Math.floor(Math.random() * hoverImages.length));
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hovered === "" && hasMounted && slideshowIndex !== null) {
      intervalRef.current = setInterval(() => {
        setSlideshowIndex((prev) => (prev !== null ? (prev + 1) % hoverImages.length : 0));
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered, hasMounted, slideshowIndex]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        className="relative max-w-screen-xl mx-auto px-4 sm:px-2 md:px-8 pt-4 pb-12"
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      >
        {/* Bio */}
        <div className="mb-10 text-base sm:text-[12px] leading-relaxed text-left">
          <p>Evan Grothjan is a filmmaker and journalist specializing in Visual Investigations, bridging investigative methods with cinematic storytelling to expose how power leaves its mark.</p>
          <br className="sm:hidden" />
          <p>He uses satellite and spatial analysis, 3D reconstructions, and visual storytelling to render visible complex events - working between accountability journalism and law.</p>
          <p className="pt-5">
            Former Senior Researcher at{" "}
            <a href="https://situ.nyc/research" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400 hover:text-blue-400">
              SITU Research
            </a>. Former editor at{" "}
            <a href="https://www.nytimes.com/by/evan-grothjan" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400 hover:text-blue-400">
              The New York Times
            </a>.
          </p>
          <br className="sm:hidden" />
          <p>Collaborators include Frontline PBS, Human Rights Watch, and The National Lawyers Guild.</p>
          <p>Contact: evangrothjan@gmail.com.</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-blue-500 dark:bg-blue-400 mb-10" />

        {/* Project List and Preview */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left">
          <div ref={leftColRef} className="flex flex-col gap-6 w-full md:w-[250px] shrink-0">
            {projectsByYear.map(([year, projects]) => (
              <div key={year}>
                <h3 className="text-xs uppercase text-neutral-500 mb-1">{year}</h3>
                {projects.map(({ title, key, href }) => {
                  const image = hoverImages.find(([, , k]) => k === key);
                  const isProtected = key === "immigration";

                  return (
                    <div key={title} className="mb-6 sm:mb-0">
                      {/* MOBILE ONLY: Clickable image */}
                      {image && (
                        <div className="w-full aspect-[4/3] relative mb-2 sm:hidden">
                          {isProtected ? (
                            <button
                              onClick={() => setShowPasswordModal(true)}
                              className="w-full h-full absolute inset-0"
                            >
                              <Image
                                src={`/${image[0]}`}
                                alt={image[1]}
                                fill
                                className="object-cover border border-blue-500 dark:border-blue-400 rounded"
                              />
                            </button>
                          ) : (
                            <Link href={href} className="w-full h-full absolute inset-0">
                              <Image
                                src={`/${image[0]}`}
                                alt={image[1]}
                                fill
                                className="object-cover border border-blue-500 dark:border-blue-400 rounded"
                              />
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Project link */}
                      {isProtected ? (
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          onMouseEnter={() => {
                            if (key) setHovered(key);
                            setShowCursorLabel(true);
                          }}
                          onMouseLeave={() => {
                            if (key) setHovered("");
                            setShowCursorLabel(false);
                          }}
                          className="w-full flex justify-center md:justify-start items-center gap-1 text-base hover:underline hover:underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Lock size={13} className="text-blue-600 dark:text-blue-400" />
                          <span>{title}</span>
                        </button>
                      ) : (
                        <Link
                          href={href}
                          onMouseEnter={() => {
                            if (key) setHovered(key);
                            setShowCursorLabel(true);
                          }}
                          onMouseLeave={() => {
                            if (key) setHovered("");
                            setShowCursorLabel(false);
                          }}
                          className="text-base hover:underline hover:underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                        >
                          {title}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Desktop slideshow */}
          <div
            className="relative flex-1 w-full max-w-full overflow-hidden hidden sm:block"
            style={{ height: leftColHeight ? `${leftColHeight}px` : "600px" }}
          >
            {hoverImages.map(([src, alt, key], index) => {
              const isVisible = (hovered === "" && index === slideshowIndex) || hovered === key;
              return (
                <Image
                  key={key}
                  src={`/${src}`}
                  alt={alt}
                  fill
                  className={`absolute transition-opacity duration-1000 ease-in-out border border-blue-500 dark:border-blue-400 object-cover ${
                    isVisible ? "opacity-100 z-20" : "opacity-0 z-10"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Cursor Label */}
        {showCursorLabel && hovered && (
          <div
            className="pointer-events-none fixed z-50 text-sm px-2 py-1 border border-blue-500 text-white rounded shadow"
            style={{
              top: cursorPos.y - 35,
              left: cursorPos.x + 12,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
            }}
          >
            {hoverLabels[hovered] || "Project"}
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 pointer-events-none">
            <div className="bg-white dark:bg-neutral-900 border border-blue-500 dark:border-blue-400 rounded-lg p-6 w-[300px] shadow-xl text-sm pointer-events-auto">
              <h2 className="text-lg mb-4 font-medium">Enter Password</h2>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3 text-black"
              />
              {passwordError && <p className="text-red-600 text-xs mb-2">Incorrect password. Try again.</p>}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    if (passwordInput === "IIC2025") {
                      setShowPasswordModal(false);
                      setPasswordInput("");
                      setPasswordError(false);
                      router.push("/work/immigration-industrial-complex");
                    } else {
                      setPasswordError(true);
                    }
                  }}
                  className="px-3 py-1 border border-blue-500 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordInput("");
                    setPasswordError(false);
                  }}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Divider */}
        <div className="block sm:hidden mb-4 px-4">
          <div className="h-[1px] bg-blue-500 dark:bg-blue-400 w-full" />
        </div>

        {/* CV Section */}
        <div className="pt-10 sm:pt-16 pb-24 text-[12px] leading-relaxed">
          <div className="flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Group Exhibitions</h3>
              <ul className="space-y-1">
                <li>2025, Prada Foundation, <em>Diagrams</em> at the Venice Biennale</li>
                <li>2024, Architekturmuseum der TUM, <em>Visual Investigations</em></li>
              </ul>
            </div>
            <div>
              <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Speaking</h3>
              <ul className="space-y-1">
                <li>2025, RightsCon, Talk, <em>Reconstructing History</em></li>
                <li>2024, Politecnico di Milano, Design Density Course, Presentation</li>
                <li>2024, The Ukrainian Museum, Panel</li>
                <li>2024, Harvard IHR Clinic, Presentation</li>
                <li>2024, Columbia University GSAPP, Guest Critic</li>
                <li>2023, Society of Professional Journalists, Panel</li>
                <li>2022, Newseum, Panel</li>
              </ul>
            </div>
            <div>
              <h3 className="text-neutral-600 dark:text-neutral-400 uppercase text-xs mb-2">Select Awards</h3>
              <ul className="space-y-1">
                <li>2023, Pulitzer Finalist, <em>Bronx Fire</em></li>
                <li>2023, SND Bronze, <em>Bronx Fire</em></li>
                <li>2022, SND Silver, <em>Dixie Fire</em></li>
                <li>2019, Emmy Winner, <em>One Building, One Bomb</em></li>
                <li>2019, SND & Malofiej Medals, <em>Apollo 11</em></li>
                <li>2018, World Press Photo, First Place, <em>Under a Cracked Sky</em></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
