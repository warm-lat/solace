'use client';

import { MeshGradient } from "@/components/bg/GradientMesh";
import Link from "next/link";
import { HiHome } from "react-icons/hi2";

export default function NotFound() {
  return (
    <>
      <MeshGradient />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-8 relative z-10">
        <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center animate-fade-in-up">
          <h1 className="text-8xl md:text-9xl font-bold">
            <span className="bg-linear-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Page Not Found
          </h2>

          <p className="text-white/70 text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-(--main) text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              <HiHome className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
