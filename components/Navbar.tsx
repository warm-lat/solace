'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { HiCommandLine } from "react-icons/hi2";
import { SiInstatus } from "react-icons/si";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-fade-in-up">
      <div className="flex items-center justify-between backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
        <Link href="/" className="flex items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
            <Image
              src="/avatar.png"
              alt="warm Bot"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links - Center */}
        <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/commands"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
              pathname === '/commands'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <HiCommandLine className="w-4 h-4" />
            <span className="hidden sm:inline">Commands</span>
          </Link>

          <Link
            href="/status"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
              pathname === '/status'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <SiInstatus className="w-4 h-4" />
            <span className="hidden sm:inline">Status</span>
          </Link>
        </div>

        <Link
          href="/discord"
          className="flex items-center gap-2 bg-[var(--main)] text-black px-4 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-all hover:scale-105"
        >
          <FaDiscord className="w-4 h-4" />
          <span className="hidden sm:inline">Discord</span>
        </Link>
      </div>
    </nav>
  );
}
