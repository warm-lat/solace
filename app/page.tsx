import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero */}
			<section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="container relative z-10 px-6 py-24 text-center max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
						Ultimate
						<br className="sm:hidden" />
						<span className="block">Discord Bot</span>
					</h1>
					<p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
						The most advanced Discord bot for moderation, music, economy, and
						fun. Powering millions of servers worldwide.
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<Button
							size="lg"
							className="h-14 px-10 text-lg font-semibold shadow-2xl hover:shadow-3xl bg-white text-indigo-600"
						>
							Add to Discord
						</Button>
						<Button
							variant="ghost"
							size="lg"
							className="h-14 px-10 text-lg font-semibold border-2 border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20"
						>
							Learn More
						</Button>
					</div>
				</div>
			</section>
			{/* Features */}
			<section className="py-32 bg-gradient-to-b from-gray-50 to-white -mt-20 relative">
				<div className="container px-6 mx-auto">
					<div className="text-center mb-24">
						<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
							Everything Your Server Needs
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Powerful, reliable, and easy to use.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50 hover:from-indigo-50">
							<CardHeader className="pb-6">
								<CardTitle className="text-3xl font-black text-indigo-600 group-hover:text-indigo-700 mb-2">
									Moderation
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-lg text-gray-700 leading-relaxed">
									AutoMod, timeouts, bans, logs, and verification to keep your
									community safe and spam-free.
								</p>
							</CardContent>
						</Card>
						<Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-green-50 hover:from-emerald-50">
							<CardHeader className="pb-6">
								<CardTitle className="text-3xl font-black text-emerald-600 group-hover:text-emerald-700 mb-2">
									Music
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-lg text-gray-700 leading-relaxed">
									High-quality music from YouTube, Spotify, Deezer. Playlists,
									queues, lyrics, and 24/7 support.
								</p>
							</CardContent>
						</Card>
						<Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-yellow-50 hover:from-amber-50">
							<CardHeader className="pb-6">
								<CardTitle className="text-3xl font-black text-amber-600 group-hover:text-amber-700 mb-2">
									Economy
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-lg text-gray-700 leading-relaxed">
									Currency system, shops, jobs, leaderboards, gambling, and
									daily rewards for engaging members.
								</p>
							</CardContent>
						</Card>
						<Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-pink-50 hover:from-rose-50">
							<CardHeader className="pb-6">
								<CardTitle className="text-3xl font-black text-rose-600 group-hover:text-rose-700 mb-2">
									Fun &amp; Games
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-lg text-gray-700 leading-relaxed">
									Memes, mini-games, ticketing, giveaways, and custom commands
									for maximum entertainment.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			{/* CTA */}
			<section className="py-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">
				<div className="absolute inset-0 bg-black/10" />
				<div className="relative container px-6 mx-auto text-center">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 drop-shadow-2xl">
						Join 1M+ Servers Today
					</h2>
					<p className="text-2xl mb-12 opacity-90 drop-shadow-lg">
						Completely free. No credit card required.
					</p>
					<Button
						size="lg"
						className="h-16 px-16 text-2xl font-black shadow-2xl hover:shadow-3xl bg-white text-indigo-600"
					>
						Invite Now - It&#x27;s Free!
					</Button>
				</div>
			</section>
			{/* Footer */}
			<footer className="bg-gray-900 text-gray-400 border-t border-gray-800 py-16">
				<div className="container px-6 mx-auto">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-white mb-4">
							Ultimate Discord Bot
						</h3>
						<p className="max-w-md mx-auto">
							Built with ❤️ for the Discord community.
						</p>
					</div>
					<div className="flex flex-wrap justify-center gap-8 text-sm">
						<a href="#" className="hover:text-white transition-colors p-2">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-white transition-colors p-2">
							Terms of Service
						</a>
						<a href="#" className="hover:text-white transition-colors p-2">
							Contact
						</a>
						<a href="#" className="hover:text-white transition-colors p-2">
							Discord Server
						</a>
						<a href="#" className="hover:text-white transition-colors p-2">
							Status
						</a>
					</div>
					<div className="text-center mt-12 text-xs opacity-75">
						&copy; 2026 Ultimate Discord Bot. All rights reserved.
					</div>
				</div>
			</footer>
		</main>
	);
}
