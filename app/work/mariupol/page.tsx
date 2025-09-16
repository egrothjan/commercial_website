"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Mariupol() {
  const [playVideo, setPlayVideo] = useState(false);
  const [playSecondVideo, setPlaySecondVideo] = useState(false);

  return (
    <>
      {/* Page title */}
<div className="w-full px-4 mt-5 mb-10 sm:mb-4 flex justify-center">
  <div className="w-[1160px] max-w-full">
    <h1 className="text-6xl font-light leading-[1.01] sm:leading-tight">
      Documenting the Siege of Mariupol
    </h1>
  </div>
</div>

      {/* Primary video */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/mariupol_2.jpg"
                alt="Play Mariupol Project"
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
              src="https://www.youtube.com/embed/ovEFg13n3TQ?start=5&autoplay=1"
              title="Mariupol"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
<div className="w-full flex justify-center px-4 mt-8">
  <div className="w-[1150px] max-w-full flex flex-col sm:flex-row sm:justify-between sm:items-start text-center sm:text-left gap-4">
    <div className="max-w-[600px] text-2xl leading-snug mx-auto sm:mx-0">
      <p>
        A spatial investigation into the destruction of Mariupol during the opening weeks of Russia’s full-scale invasion of Ukraine.
      </p>
    </div>
    <div className="text-sm text-gray-600 sm:text-right sm:mt-1 mx-auto sm:mx-0">
      <p>Collaborator: Human Rights Watch, Truth Hounds</p>
      <p>Role: Senior Researcher</p>
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
      Between February and May 2022, the Russian military’s assault on the Ukrainian city of Mariupol left thousands of civilians dead or injured. Many were trapped for weeks without access to electricity, water, or medical care. The siege stands as one of the most devastating chapters of Russia’s full-scale invasion.
    </p>
  </div>

  {/* Image 1 */}
  <div className="w-full flex flex-col items-center my-5">
    <Image
      src="/mariupol_3.gif"
      alt="Map animation of destruction"
      width={600}
      height={338}
      className="rounded border border-blue-400"
      loading="lazy"
    />
    <p className="text-sm text-gray-500 mt-2 self-start px-5 sm:px-0">
      Case study – Mytropolytska Street 98.
    </p>
  </div>

  {/* Paragraph 2 */}
  <div className="px-5 sm:px-0">
    <p>
      To document the destruction, Human Rights Watch produced a 215-page interactive report, a multimedia feature, and a 20-minute video. To render the scale of devastation legible — an estimated 93% of the city’s structures destroyed — HRW partnered with SITU Research, where I was part of the investigative team responsible for spatial analysis and visual reconstruction.
    </p>
  </div>

  {/* Paragraph 3 */}
  <div className="px-5 sm:px-0">
    <p>
      The investigation drew on more than 240 interviews with displaced residents, as well as satellite imagery and verified social media videos, collected in collaboration with HRW’s Digital Investigations Lab. Drawing on these sources, the team pursued a two-pronged approach: first, mapping citywide destruction through satellite analysis; second, reconstructing seven building-specific case studies to examine individual incidents.
    </p>
  </div>

  {/* Video 2 */}
  <div className="w-full flex flex-col items-center my-5">
    <div className="relative w-full max-w-[600px] aspect-video border border-blue-400 rounded overflow-hidden">
      {!playSecondVideo ? (
        <div onClick={() => setPlaySecondVideo(true)} className="relative w-full h-full cursor-pointer">
          <Image
            src="/mariupol_4.webp"
            alt="Play embedded clip"
            fill
            className="object-cover"
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
          className="w-full h-full"
          src="https://www.youtube.com/embed/nbvh6BQldd4?autoplay=1"
          title="Second Mariupol Clip"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
    <p className="text-sm text-gray-500 mt-2 self-start px-5 sm:px-0">
      Presentation at Harvard Law Clinic.
    </p>
  </div>

  {/* Paragraph 4 */}
  <div className="px-5 sm:px-0">
    <p>
      OpenStreetMap building footprints were downloaded, verified, and corrected to reflect pre-siege conditions, then cross-referenced with post-siege satellite imagery to identify damaged or destroyed structures.
    </p>
  </div>

  {/* Paragraph 5 */}
  <div className="px-5 sm:px-0">
    <p>
      This layered methodology—integrating testimonial, spatial, and visual evidence—produced a comprehensive digital record of the siege. Ultimately, the report calls for Russian President Vladimir Putin and senior officials to be investigated and prosecuted for war crimes, and urges reparations for victims and their families.
    </p>
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
