"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AntarcticaSeries() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* Page title */}
      <div className="w-full px-4 mt-5 mb-4 flex justify-center">
        <div className="w-[1160px] max-w-full">
          <h1 className="text-6xl font-light leading-[1.05] sm:leading-tight">
  The Antarctica Series
</h1>

        </div>
      </div>

      {/* Video thumbnail or embed */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[1150px] max-w-full aspect-video relative cursor-pointer border border-blue-400 rounded">
          {!playVideo ? (
            <div onClick={() => setPlayVideo(true)} className="relative w-full h-full">
              <Image
                src="/ant_2.jpg"
                alt="Play Antarctica Series"
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
              src="https://www.youtube.com/embed/ecmGq5LGNx8?autoplay=1"
              title="The Antarctica Series"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Header paragraph + metadata */}
      <div className="w-full flex justify-center px-4 mt-8">
        <div className="w-[1150px] max-w-full flex flex-col sm:flex-row sm:justify-between items-center sm:items-start text-center sm:text-left gap-4">
          {/* Header paragraph */}
          <div className="text-2xl leading-snug max-w-[600px]">
            <p>
              A four-part virtual reality series exploring life and science in Antarctica, filmed across extreme environments on, above, and below the ice.
            </p>
          </div>

          {/* Metadata */}
          <div className="text-sm text-gray-600 sm:text-right">
            <p>Collaborators: NYT Graphics, Columbia University, NSF</p>
            <p>Role: Cinematographer & Producer</p>
          </div>
        </div>
      </div>

      {/* Mobile-only divider between metadata and body */}
<div className="block sm:hidden w-full px-5 mt-6">
  <div className="h-[1px] bg-blue-500 dark:bg-blue-400 w-full" />
</div>


      {/* Project content */}
      <main className="flex flex-col gap-5 sm:px-16 py-8 sm:py-15 max-w-full sm:max-w-3xl mx-auto text-left">
        {/* Paragraph 1 */}
        <div className="px-5 sm:px-0">
          <p>
            McMurdo Station, the largest outpost in Antarctica, is operated by the National Science Foundation. The team traveled there on a media grant supporting science reporting in polar environments, working in collaboration with the Rosetta Project, a Columbia University-led initiative to map the subsurface structure of the Ross Ice Shelf. The reporting trip resulted in four stand-alone virtual reality films.
          </p>
        </div>

        {/* Image 1 */}
        <div>
          <Image
            src="/ant_3.gif"
            alt="Antarctica VR equipment on site"
            width={600}
            height={338}
            className="rounded border border-blue-400 mt-4 mb-2"
          />
          <p className="text-sm text-gray-500 mt-1 px-2 sm:px-0">
            Under the Ross Ice Shelf.
          </p>
        </div>

        {/* Paragraph 2 */}
        <div className="px-5 sm:px-0">
          <p>
            Working with emerging technology meant relying on an experimental virtual reality camera rig, prototypes untested in extreme conditions, to capture the first virtual reality stereo footage ever recorded on the continent. Subzero temperatures, high winds, volcanic dust, and the presence of military aircraft posed constant operational challenges.
          </p>
        </div>

        {/* Image 2 */}
        <div>
          <Image
            src="/ant_4.gif"
            alt="VR rig with GoPros in Antarctica"
            width={600}
            height={338}
            className="rounded border border-blue-400 mt-4 mb-2"
          />
          <p className="text-sm text-gray-500 mt-1 px-2 sm:px-0">
            Transantarctic Mountains.
          </p>
        </div>

        {/* Paragraph 3 */}
        <div className="px-5 sm:px-0">
          <p>
            The primary rig was a ring of sixteen GoPro cameras powered by a shared 25-pound lithium battery pack, which had to be carried across ice and up mountainous terrain. Hand warmers were used to prolong battery life. The cameras did not share memory, requiring manual tracking and rotation of sixteen individual microSD cards. Failures were frequent. Card changes had to be performed by hand in subfreezing conditions.
          </p>
        </div>

        {/* Paragraph 4 */}
        <div className="px-5 sm:px-0">
          <p>
            Data visualizations of the shifting ice shelf were produced in-house. One of the four films would go on to win a World Press Photo Award.
          </p>
        </div>

        {/* Image 3 */}
        <div>
          <Image
            src="/ant_5.gif"
            alt="VR ice shelf visualization"
            width={600}
            height={338}
            className="rounded border border-blue-400 mt-4 mb-2"
          />
          <p className="text-sm text-gray-500 mt-1 px-2 sm:px-0">
            Moving ice.
          </p>
        </div>

        {/* Back link */}
        <div className="px-5 sm:px-0">
          <Link href="/" className="text-sm text-blue-600 underline mt-6 inline-block">
            ← Back to all projects
          </Link>
        </div>
      </main>
    </>
  );
}
