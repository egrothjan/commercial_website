"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DeathFlights() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
      <div className="w-full px-4 mt-5 mb-10 sm:mb-4 flex justify-center">
        <div className="w-[1160px] max-w-full">
          <h1 className="text-5xl sm:text-6xl font-light leading-[1.01] sm:leading-tight">
            Documenting Enforced Disappearances
          </h1>
        </div>
      </div>

      {/* Controlled-width video with custom thumbnail + border */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/deathFlights_1.jpg"
                alt="Play The Death Flights"
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
              src="https://www.youtube.com/embed/nfGLrxIJcPQ?autoplay=1"
              title="The Death Flights"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
<div className="w-full flex justify-center px-4 mt-8">
  <div className="w-[1150px] max-w-full flex flex-col sm:flex-row sm:justify-between sm:items-start text-center sm:text-left gap-4">
    <div className="max-w-[600px] text-2xl leading-snug mx-auto sm:mx-0">
      <p>
        Documenting a clandestine program of enforced disappearances carried out by the Mexican military during the so-called &ldquo;Dirty War&rdquo; of the 1970s and 80s.
      </p>
    </div>
    <div className="text-sm text-gray-600 sm:text-right sm:mt-1 mx-auto sm:mx-0">
      <p>Collaborator: Miguel Agustín Pro Juárez Human Rights Center</p>
      <p>Role: Director</p>
    </div>
  </div>
</div>

{/* Mobile-only blue divider */}
<div className="block sm:hidden w-full px-5 mt-9 mb-10">
  <div className="h-[1px] bg-blue-400 w-full"></div>
</div>


      {/* Project content */}
      <main className="flex flex-col items-start gap-5 px-0 sm:px-25 pt-0 sm:pt-15 pb-15 max-w-3xl mx-auto text-left">

  {/* Paragraph 1 */}
  <div className="px-5 sm:px-0">
    <p>
      From the late 1960s to the early 1980s, the Mexican government escalated an already brutal campaign against
      political dissidents during <em>la Guerra Sucia</em>, the &ldquo;Dirty War.&rdquo; This fourteen-minute video presents one of
      the first assemblages of visual evidence showing the systematic and highly organized program of disappearances
      carried out by key military officials in Guerrero, Mexico during this period.
    </p>
  </div>

  {/* GIF 1 with blue border and caption */}
  <div className="w-full flex justify-center my-5">
    <div className="w-[600px] max-w-full">
      <Image
        src="/deathFlights_4.gif"
        alt="Animated reconstruction of Pie de la Cuesta"
        width={1200}
        height={675}
        className="rounded border border-blue-400"
      />
      <p className="text-sm text-gray-500 mt-2 px-5 sm:px-0">
        Documentary excerpt.
      </p>
    </div>
  </div>

  {/* Paragraph 2 */}
  <div className="px-5 sm:px-0">
    <p>
      Weaving together open and closed-source research, a digital site model of the Pie de la Cuesta Air Force base —
      the primary scene of State abuse — was reconstructed from archival materials, declassified spy satellite imagery,
      and records from a 2002 military investigation. The analysis includes written testimonies from military personnel
      who described their active involvement in the disappearances, information from journalistic reports, and
      unexpected Hollywood film footage.
    </p>
  </div>

  {/* GIF 2 with blue border and caption */}
  <div className="w-full flex justify-center my-5">
    <div className="w-[600px] max-w-full">
      <Image
        src="/deathFlights_3.gif"
        alt="Animated aircraft sequence"
        width={1200}
        height={675}
        className="rounded border border-blue-400"
      />
      <p className="text-sm text-gray-500 mt-2 px-5 sm:px-0">
        Declassified satellite imagery.
      </p>
    </div>
  </div>

  {/* Paragraph 3 */}
  <div className="px-5 sm:px-0">
    <p>
      Widely circulated in Mexico, the film’s call to action demands the release of the full scope of the military’s
      archives to uncover additional aspects of the truth about this dark period of Mexican history.
    </p>
  </div>

  {/* Update block – leave untouched unless you want mobile padding too */}
  <div className="bg-gray-100 px-4 py-3 rounded text-sm text-gray-800 border-l-4 border-gray-400 my-10">
    <strong>Update:</strong> On August 7, 2024, a list of 183 purported victims of The Death Flights was released.
  </div>

  {/* Back link */}
  <div className="px-5 sm:px-0">
    <Link href="/" className="text-sm text-blue-600 underline mt-6">
      ← Back to all projects
    </Link>
  </div>
</main>

    </>
  );
}
