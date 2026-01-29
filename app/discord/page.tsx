'use client';

import { useEffect } from "react";
import { MeshGradient } from "@/components/bg/GradientMesh";
import Loader from "@/components/Loader";

export default function DiscordPage() {
  useEffect(() => {
    window.location.href = 'https://discord.gg/apply';
  }, []);

  return (
    <>
      <MeshGradient />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-8 relative z-10">
        <Loader />
      </main>
    </>
  );
}
