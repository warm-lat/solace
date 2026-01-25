'use client';

import Image from "next/image";
import { MeshGradient } from "@/components/background/GradientMesh";
import { useEffect, useState, useRef } from "react";
import { FaDiscord } from "react-icons/fa";
import { HiCommandLine } from "react-icons/hi2";
import { SiStatuspage } from "react-icons/si";

interface Shard {
  id: number;
  guilds: number;
  users: number;
  ping: number;
  status: string;
}

interface BotStatus {
  shards: Shard[];
  total_guilds: number;
  total_users: number;
  total_shards: number;
  avg_ping: number;
  uptime: number;
}

function useCountUp(end: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const prevEndRef = useRef(end);

  useEffect(() => {
    // Only animate if end value changed
    if (end === prevEndRef.current) {
      return;
    }

    const startValue = countRef.current;
    prevEndRef.current = end;
    
    if (end === startValue) {
      return;
    }

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (end - startValue) * easeOut);
      
      setCount(current);
      countRef.current = current;
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration]);

  return count;
}

export default function Home() {
  const [status, setStatus] = useState<BotStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const animatedUsers = useCountUp(status?.total_users || 0, 2000);
  const animatedGuilds = useCountUp(status?.total_guilds || 0, 2000);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <>
      <MeshGradient />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-8 relative z-10">
        <div className="flex flex-col items-center gap-2 max-w-2xl w-full">
          {/* Avatar */}
          <div 
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Image
              src="/avatar.png"
              alt="warm Bot"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bot Name */}
          <h1 
            className="text-4xl md:text-5xl font-bold text-center -mt-1 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="bg-gradient-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent">
              warm
            </span>
          </h1>

          {/* Tagline */}
          <p 
            className="text-white/90 text-base md:text-lg text-center -mt-1 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Modern discord server to warm up your experience
          </p>

          {/* Stats */}
          {loading ? (
            <div 
              className="text-white/70 text-center text-sm mt-1 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Loading...
            </div>
          ) : status ? (
            <div 
              className="flex items-center gap-3 mt-1 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="text-white/60 text-sm md:text-base">serving</span>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent font-bold text-base md:text-lg">
                  {formatNumber(animatedUsers)}
                </span>
                <span className="text-white/50 text-xs">users</span>
                <span className="bg-gradient-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent font-bold text-base md:text-lg">
                  {formatNumber(animatedGuilds)}
                </span>
                <span className="text-white/50 text-xs">guilds</span>
              </div>
            </div>
          ) : (
            <p 
              className="text-white/70 text-center text-sm mt-1 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Unable to load stats
            </p>
          )}

          {/* Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-3 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="/invite"
              className="flex items-center justify-center gap-2 bg-[var(--main)] text-black px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all text-sm hover:scale-105"
            >
              <FaDiscord className="w-4 h-4" />
              Add to Discord
            </a>
            <a
              href="/commands"
              className="flex items-center justify-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-all text-sm shadow-lg hover:scale-105"
            >
              <HiCommandLine className="w-4 h-4" />
              View Commands
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
