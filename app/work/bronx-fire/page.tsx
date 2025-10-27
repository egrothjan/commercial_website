"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BronxFire() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
      <div className="w-full px-4 mt-10 mb-8 sm:mb-4 flex justify-center">
        <div className="w-[1160px] max-w-full text-center sm:text-left">
          <h1 className="text-6xl font-light leading-[1.01] sm:leading-tight sm:text-left sm:leading-[1.1]">
            The Bronx Fire: Systems of Neglect
          </h1>
        </div>
      </div>

      {/* Video embed with border */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/bronx_4.webp"
                alt="Play Bronx Fire Project"
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
              src="https://www.youtube.com/embed/rNVwHsmh2n8?autoplay=1"
              title="Bronx Fire"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
      <div className="w-full flex justify-center px-4 mt-8">
        <div className="w-[1150px] max-w-full flex flex-col sm:flex-row sm:justify-between sm:items-start text-center sm:text-left gap-2 sm:gap-0">
          <div className="max-w-[600px] text-2xl leading-snug mx-auto sm:mx-0">
            <p>
              An investigation into the structural failures and neglect that contributed to one of New York City’s deadliest fires in decades.
            </p>
          </div>
          <div className="text-sm text-gray-600 mt-2 sm:mt-1 sm:text-right">
            <p>Collaborator: The New York Times</p>
            <p>Role: Graphics/Multimedia Editor</p>
          </div>
        </div>
      </div>

      {/* Blue line separator (mobile only) */}
      <div className="w-full flex justify-center mt-8 mb-2 px-4 sm:hidden">
        <div className="w-full border-t border-blue-400 max-w-[1150px]"></div>
      </div>

      {/* Project content */}
      <main className="flex flex-col items-start gap-5 px-0 sm:px-25 pt-6 sm:pt-15 pb-15 max-w-3xl mx-auto text-left">
        <div className="px-5 sm:px-0 w-full">
          <p>
            On January 9, 2022, a fire in a Bronx high-rise claimed the lives of 17 New York City residents. None of the victims died from burns; all succumbed to smoke inhalation, many from several floors above the fire’s origin. A New York Times investigation — drawing on floor plans, witness videos, 911 calls, and city documents — traced the smoke’s path from ignition to containment. It revealed a building constructed before modern fire safety codes, lacking sprinklers or automatic fail-safes, and reliant on a containment strategy that failed catastrophically.
          </p>
        </div>

        {/* GIF 1 */}
        <div className="w-full flex flex-col items-center my-5">
          <Image
            src="/bronx_3.gif"
            alt="Smoke path illustration"
            width={600}
            height={338}
            className="rounded border border-blue-400"
            loading="lazy"
          />
          <div className="text-sm text-gray-500 mt-2 self-start sm:self-auto px-5 sm:px-0 w-full">
            3D visualization of smoke spread throughout the building.
          </div>
        </div>

        <div className="px-5 sm:px-0 w-full">
          <p>
            In partnership with engineering experts at Worcester Polytechnic Institute, a Fire Dynamics Simulator was used to model how smoke rose rapidly through the stairwells, turning them into vertical chimneys. Peeling back the apartment complex floor by floor, the viewer is guided through a moment-by-moment reconstruction of the fire. The result was the newsroom’s longest and most immersive 3D visual to date, illustrating how smoke, not flames, proved to be the deadliest factor.
          </p>
        </div>

        {/* GIF 2 */}
        <div className="w-full flex flex-col items-center my-5">
          <Image
            src="/bronx_2.gif"
            alt="Apartment layer visualization"
            width={600}
            height={338}
            className="rounded border border-blue-400"
            loading="lazy"
          />
          <div className="text-sm text-gray-500 mt-2 self-start sm:self-auto px-5 sm:px-0 w-full">
            Exploded axonometric showing interior airflow and structural gaps.
          </div>
        </div>

        <div className="px-5 sm:px-0 w-full">
          <p>
            The story went on to become a finalist for the 2023 Pulitzer Prize for Breaking News.
          </p>
        </div>

        {/* Update box with consistent mobile padding */}
        <div className="w-full px-5 sm:px-0 mt-8">
          <div className="bg-gray-100 rounded border-l-4 border-gray-400 text-sm text-gray-800 text-left w-full py-3 px-5">
            <p>
              <strong>Update:</strong> In the aftermath, New York passed legislation mandating stricter enforcement of self-closing door requirements.
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-0 w-full">
          <Link href="/" className="text-sm text-blue-600 underline mt-6 block">
            ← Back to all projects
          </Link>
        </div>
      </main>
    </>
  );
}
