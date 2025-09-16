"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ImmigrationIndustrialComplex() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
      <div className="w-full px-4 mt-5 mb-4 flex justify-center">
        <div className="w-[1160px] max-w-full">
          <h1 className="text-6xl font-light leading-tight">
            The Immigration Industrial Complex
          </h1>
        </div>
      </div>

      {/* Controlled-width video with custom thumbnail + border */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/iic_1.png"
                alt="Play Immigration Industrial Complex"
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
              src="https://www.youtube.com/embed/[INSERT_VIDEO_ID]?autoplay=1"
              title="Immigration Industrial Complex"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
      <div className="w-full flex justify-center px-4 mt-8">
        <div className="w-[1150px] max-w-full flex justify-between items-start">
          {/* Left: large paragraph */}
          <div className="max-w-[600px] text-2xl leading-snug">
            <p>
              A forensic documentary tracing the private, public, and technological structures that sustain the U.S. border and immigration enforcement system.
            </p>
          </div>

          {/* Right: metadata */}
          <div className="text-sm text-gray-600 text-right mt-1">
            <p>Collaborators: [List if applicable]</p>
            <p>Role: Director, Reporter</p>
          </div>
        </div>
      </div>

      {/* Project content */}
      <main className="flex flex-col items-start gap-5 px-25 py-15 max-w-3xl mx-auto">
        <p>
          In 2023, I conducted a month-long reporting trip across the U.S., investigating the public-private infrastructure behind immigration detention and border control. The resulting investigation maps out the entangled network of contractors, facilities, and technologies that underpin the expanding immigration-industrial complex.
        </p>

        <p>
          Traveling from detention centers in the South to surveillance hubs on the U.S.-Mexico border, I documented how commercial vendors—from GEO Group and CoreCivic to Palantir and Anduril—are reshaping the enforcement landscape. The work combines traditional reporting with spatial analysis, mapping contracts, facility ownership, and technology integration across the country.
        </p>

        <p>
          The project challenges narratives that depict immigration enforcement as spontaneous or disorganized, revealing instead a highly structured and economically incentivized system operating across federal and local levels. Visualizations and models developed during the project aim to show not only how these systems operate, but how they are expanding through new technologies and legal frameworks.
        </p>

        <div className="bg-gray-100 px-4 py-3 rounded text-sm text-gray-800 border-l-4 border-gray-400 my-10">
          <strong>Note:</strong> This project remains ongoing. Additional reporting and spatial visualizations are in development.
        </div>

        <Link href="/" className="text-sm text-blue-600 underline mt-6">
          ← Back to all projects
        </Link>
      </main>
    </>
  );
}
