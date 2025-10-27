"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GeorgeFloydProtests() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
<div className="w-full px-4 mt-5 mb-8 sm:mb-4 flex justify-center">
  <div className="w-[1160px] max-w-full">
    <h1 className="text-6xl font-light leading-[1.01] sm:leading-tight">
      Sow, et al. v. City of New York, et al.
    </h1>
  </div>
</div>


      {/* Primary video */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/protests_2.jpg"
                alt="Play George Floyd Protests Visuals"
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
              src="https://www.youtube.com/embed/lEAGcmIKm34?autoplay=1"
              title="George Floyd Protests Visual Investigation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
<div className="w-full flex justify-center px-4 mt-8">
  <div className="w-[1150px] max-w-full flex justify-between items-start sm:flex-row flex-col sm:text-left text-center sm:items-start items-center gap-4">
    <div className="max-w-[600px] text-2xl leading-snug">
      <p>
        Videos produced during discovery show that NYPD misconduct during the BLM movement of 2020 were widespread and pervasive.
      </p>
    </div>
    <div className="text-sm text-gray-600 sm:text-right text-center mt-1">
      <p>Collaborators: Wylie Law, Cohen&amp;Green, Beldock Levine &amp; Hoffman, Gideon Orion Oliver, Jon Nealon</p>
      <p>Role: Senior Researcher</p>
    </div>
  </div>
</div>

{/* Mobile-only blue divider line */}
<div className="w-full flex justify-center mt-8 mb-2 px-4 sm:hidden">
  <div className="w-full border-t border-blue-400 max-w-[1150px]"></div>
</div>


      {/* Project content */}
      <main className="flex flex-col items-start gap-5 px-0 sm:px-25 pt-6 sm:pt-15 pb-15 max-w-3xl mx-auto text-left">
  <div className="px-5 sm:px-0 w-full">
    <p>
      During the George Floyd protests of 2020, civil rights demonstrators in New York City took to the streets to protest police brutality. The NYPD responded with widespread use of force. In response, the National Lawyers Guild filed a class action lawsuit against the City of New York. As part of court proceedings, the NYPD produced over 6,000 video assets through discovery. These materials were used as evidence to identify four categories of constitutional violations: improper use of batons, improper use of pepper spray, excessive force, and kettling.
    </p>
  </div>

  {/* GIF 1 */}
  <div className="w-full flex flex-col items-center my-5">
    <Image
      src="/protests_3.gif"
      alt="Crowd footage gif"
      width={600}
      height={338}
      className="rounded border border-blue-400"
      loading="lazy"
    />
    <p className="text-sm text-gray-500 mt-2 self-start sm:self-auto px-5 sm:px-0 w-full">
      Discovery materials excerpt.
    </p>
  </div>

  <div className="px-5 sm:px-0 w-full">
    <p>
      As part of the investigative team, my focus was on kettling, a crowd control tactic in which police surround protestors to restrict movement. The NYPD denied employing this tactic. However, video evidence demonstrated not only its use, but its central role in key protests across the city.
    </p>

    <p>
      Helicopter footage from two separate protests - Mott Haven in the Bronx and the Manhattan Bridge - clearly captures NYPD formations surrounding and containing groups of protestors under the supervision of &ldquo;White Shirt&rdquo; commanding officers. This was further corroborated by ground-level footage in which protestors can be heard stating that they are unable to escape.
    </p>
  </div>

  {/* GIF 2 */}
  <div className="w-full flex flex-col items-center my-5">
    <Image
      src="/protests_4.gif"
      alt="Helicopter footage analysis gif"
      width={600}
      height={338}
      className="rounded border border-blue-400"
      loading="lazy"
    />
    <p className="text-sm text-gray-500 mt-2 self-start sm:self-auto px-5 sm:px-0 w-full">
      Helicopter footage.
    </p>
  </div>

  <div className="px-5 sm:px-0 w-full">
    <p>
      Four additional kettling events lacked aerial footage, requiring a different investigative approach. For each event, hundreds of videos from the discovery materials were reviewed, and selected clips were mapped in both space and time to construct detailed case files.
    </p>

    <p>
      To establish temporal context, footage was assembled into synchronized four-channel presentations, allowing multiple angles of a single event to be viewed simultaneously. To establish spatial context, a digital twin of the city was created to position each video clip within the built environment.
    </p>
  </div>

  {/* GIF 3 */}
  <div className="w-full flex flex-col items-center my-5">
    <Image
      src="/protests_5.gif"
      alt="Synchronized 3D footage overlay"
      width={600}
      height={338}
      className="rounded border border-blue-400"
      loading="lazy"
    />
    <p className="text-sm text-gray-500 mt-2 self-start sm:self-auto px-5 sm:px-0 w-full">
      Excerpt of synchronized 4-channel video. (Blurred)
    </p>
  </div>

  <div className="px-5 sm:px-0 w-full">
  <p>
    Together, these materials revealed how officers coordinated their formations, exploited the built environment, and eliminated exit routes to confine and kettle protestors.
  </p>

  <p className="mt-4">
    The NYPD settled out of court.
  </p>

  <Link href="/" className="text-sm text-blue-600 underline mt-8 block">
    ← Back to all projects
  </Link>
</div>

</main>

    </>
  );
}
