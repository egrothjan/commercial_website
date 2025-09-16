"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MexicoCityMetro() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
      <div className="w-full px-4 mt-5 mb-8 flex justify-center">
        <div className="w-[1160px] max-w-full">
          <h1 className="text-6xl font-light leading-[1.01] sm:leading-tight">
            Mexico City Metro Collapse
          </h1>
        </div>
      </div>

      {/* Video thumbnail or embed */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/mm_1.jpg"
                alt="Play Mexico City Metro Collapse Project"
                fill
                className="object-cover rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full rounded"
              src="https://www.youtube.com/embed/Dob_Y3f6teo?autoplay=1"
              title="Mexico City Metro Collapse"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

{/* Header paragraph + metadata */}
<div className="w-full flex justify-center px-4 mt-8">
  <div className="w-[1150px] max-w-full flex flex-col sm:flex-row justify-between items-start gap-3 text-center sm:text-left">
    <div className="w-full sm:w-auto max-w-[600px] text-2xl leading-snug">
      <p>Reconstructing one of Mexico’s worst transit disasters.</p>
    </div>

    <div className="w-full sm:w-auto text-sm text-gray-600 mt-2 sm:mt-1">
      <p>Collaborator: The New York Times</p>
      <p>Role: Graphics/Multimedia Editor</p>
    </div>
  </div>
</div>

{/* Mobile-only blue divider */}
<div className="sm:hidden w-full px-5 mt-8 mb-6">
  <div className="w-full h-[1px] bg-blue-400"></div>
</div>

      {/* Project content */}
      <main className="flex flex-col items-start gap-5 px-5 sm:px-25 pt-3 pb-15 max-w-3xl mx-auto text-left sm:text-justify">
        <p>Following excerpt from The New York Times:</p>

        <p>
          <em>
            ...A New York Times investigation — based on years of government records, interviews with people who worked on the construction, and expert analysis of evidence from the crash site — has found serious flaws in the basic construction of the metro that appear to have led directly to its collapse.
          </em>
        </p>

        <p>
          <em>
            The Times took thousands of photographs of the crash site and shared the evidence with several leading engineers who reached the same conclusion: The steel studs that were vital to the strength of the overpass — linchpins of the entire structure — appear to have failed because of bad welds, critical mistakes that likely caused the crash.
          </em>
        </p>

        {/* Image 1 */}
        <div className="w-full my-5">
          {/* Mobile full-bleed */}
          <div className="block sm:hidden -mx-5">
            <Image
              src="/mm_2.gif"
              alt="Metro collapse structural damage photo"
              width={600}
              height={338}
              className="w-full rounded border border-blue-400"
              loading="lazy"
            />
          </div>
          {/* Desktop centered */}
          <div className="hidden sm:flex flex-col items-center">
            <Image
              src="/mm_2.gif"
              alt="Metro collapse structural damage photo"
              width={600}
              height={338}
              className="rounded border border-blue-400"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 self-start px-0 sm:px-0">
            Structural damage visualization from the collapse site.
          </p>
        </div>

        <p>
          <em>
            Here’s how the engineers believe the overpass collapsed, based on initial evidence. Steel beams held up the elevated track, but they were not built to support it on their own.
          </em>
        </p>

        <p>
          <em>
            To fortify the structure, metal studs connected the steel to a concrete slab. The steel and concrete are much stronger as a single unit.
          </em>
        </p>

        <p>
          <em>
            The studs were welded into the steel, which should have formed a nearly unbreakable bond. But photos of the rubble suggest to engineers that the welds were done poorly, a serious construction defect.
          </em>
        </p>

        <p>
          <em>
            Another telltale sign of shoddy manufacturing: Workers failed to remove many ceramic rings that fit around the studs during installation.
          </em>
        </p>

        <p>
          <em>
            Ultimately, the welds gave way and the studs broke off from the steel, photos show.
          </em>
        </p>

        {/* Image 2 */}
        <div className="w-full my-5">
          {/* Mobile full-bleed */}
          <div className="block sm:hidden -mx-5">
            <Image
              src="/mm_3.gif"
              alt="Visual breakdown of beam-stud interface"
              width={600}
              height={338}
              className="w-full rounded border border-blue-400"
              loading="lazy"
            />
          </div>
          {/* Desktop centered */}
          <div className="hidden sm:flex flex-col items-center">
            <Image
              src="/mm_3.gif"
              alt="Visual breakdown of beam-stud interface"
              width={600}
              height={338}
              className="rounded border border-blue-400"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 self-start px-0 sm:px-0">
            Visual breakdown of the failed beam-stud interface.
          </p>
        </div>

        <p>
          <em>
            When the train took its last journey, sections of the concrete were probably disconnected, simply resting on top of steel beams that were never designed to carry the weight alone.
          </em>
        </p>

        <p>
          <em>
            That night, as the train carrying Tania and Nancy passed over, the steel gave out. Initial evidence is not definitive on exactly what happened next, but it suggests the beams may have slid inward and the brace holding them apart buckled.
          </em>
        </p>

        <p>
          <em>
            Within seconds, the entire span collapsed. The train fell about 40 feet toward the traffic below.
          </em>
        </p>

        <Link href="/" className="text-sm text-blue-600 underline mt-6">
          ← Back to all projects
        </Link>
      </main>
    </>
  );
}
