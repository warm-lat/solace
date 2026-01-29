'use client';

import { MeshGradient } from "@/components/bg/GradientMesh";
import { useEffect, useState, useRef } from "react";
import { HiUsers, HiSignal, HiClock } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";
import { SiInstatus } from "react-icons/si";
import { HiServerStack } from "react-icons/hi2";
import Loader from "@/components/Loader";
import type { Status } from "@/types/status";

function useCountUp(end: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const prevEndRef = useRef(end);

  useEffect(() => {
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

function formatUptime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export default function StatusPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const animatedUsers = useCountUp(status?.total_users || 0, 2000);
  const animatedGuilds = useCountUp(status?.total_guilds || 0, 2000);
  const animatedPing = useCountUp(Math.round(status?.avg_ping || 0), 1500);

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
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <>
        <MeshGradient />
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-8 relative z-10">
          <Loader />
        </main>
      </>
    );
  }

  if (!status) {
    return (
      <>
        <MeshGradient />
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-12 px-8 relative z-10">
          <div className="text-white/70 text-center animate-fade-in">
            Unable to load status
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <MeshGradient />
      <main className="flex min-h-screen w-full flex-col items-center py-24 px-8 relative z-10">
        <div className="w-full max-w-5xl">
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <SiInstatus className="w-8 h-8 text-white/80" />
              <span className="bg-linear-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent">
                Status
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-all" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <HiUsers className="w-6 h-6 text-white/80" />
                <div className="text-white/60 text-sm uppercase tracking-wide font-medium">Total Users</div>
              </div>
              <div className="text-white font-bold text-3xl">
                {formatNumber(animatedUsers)}
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-all" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <HiServerStack className="w-6 h-6 text-white/80" />
                <div className="text-white/60 text-sm uppercase tracking-wide font-medium">Total Guilds</div>
              </div>
              <div className="text-white font-bold text-3xl">
                {formatNumber(animatedGuilds)}
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-all" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <HiSignal className="w-6 h-6 text-white/80" />
                <div className="text-white/60 text-sm uppercase tracking-wide font-medium">Avg Latency</div>
              </div>
              <div className="text-white font-bold text-3xl">
                {animatedPing}ms
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-all" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <HiClock className="w-6 h-6 text-white/80" />
                <div className="text-white/60 text-sm uppercase tracking-wide font-medium">Uptime</div>
              </div>
              <div className="text-white font-bold text-3xl">
                {formatUptime(status.uptime)}
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Shards</h2>
              <span className="text-white/60 text-sm font-medium">{status.shards.length} Total</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {status.shards.map((shard, index) => (
                <div
                  key={shard.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 shadow-2xl animate-fade-in-up hover:bg-white/10 hover:border-white/20 transition-all group"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FaCircle className={`w-2 h-2 ${
                      shard.status === 'connected' ? 'text-green-400' : 'text-red-400'
                    }`} />
                    <span className="text-white font-semibold">Shard {shard.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <HiServerStack className="w-5 h-5 text-white/50 mx-auto mb-1" />
                      <div className="text-white/60 text-xs mb-1">Guilds</div>
                      <div className="text-white font-bold text-sm">{formatNumber(shard.guilds)}</div>
                    </div>
                    <div className="text-center">
                      <HiUsers className="w-5 h-5 text-white/50 mx-auto mb-1" />
                      <div className="text-white/60 text-xs mb-1">Users</div>
                      <div className="text-white font-bold text-sm">{formatNumber(shard.users)}</div>
                    </div>
                    <div className="text-center">
                      <HiSignal className="w-5 h-5 text-white/50 mx-auto mb-1" />
                      <div className="text-white/60 text-xs mb-1">Ping</div>
                      <div className="text-white font-bold text-sm">{shard.ping.toFixed(0)}ms</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
