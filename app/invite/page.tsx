'use client';

import { useEffect } from "react";
import { MeshGradient } from "@/components/bg/GradientMesh";
import Loader from "@/components/Loader";

export default function InvitePage() {
  useEffect(() => {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1420609343283531776&scope=bot+applications.commands&permissions=8';
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
