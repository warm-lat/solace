"use client";

import { MeshGradient } from "@/components/background/GradientMesh";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
	HiCommandLine,
	HiMagnifyingGlass,
	HiChevronDown,
	HiChevronUp,
	HiSquares2X2,
	HiSparkles,
	HiStar,
	HiUserGroup,
	HiChatBubbleLeftRight,
	HiMicrophone,
	HiCube,
} from "react-icons/hi2";
import {
	FaCopy,
	FaCoins,
	FaCog,
	FaHammer,
	FaLastfm,
	FaInfo,
} from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import type { Command } from "@/types/commands";

const getCategoryIcon = (category: string) => {
	const iconMap: Record<string, any> = {
		All: HiSquares2X2,
		Audio: FaMusic,
		Config: FaCog,
		Economy: FaCoins,
		Fun: HiSparkles,
		Information: FaInfo,
		Lastfm: FaLastfm,
		Moderation: FaHammer,
		Premium: HiStar,
		Roleplay: HiUserGroup,
		Social: HiChatBubbleLeftRight,
		Utility: GoPaperclip,
		VoiceMaster: HiMicrophone,
		Yugioh: HiCube,
	};
	return iconMap[category] || HiCommandLine;
};

export default function CommandsPage() {
	const [commands, setCommands] = useState<Command[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [expandedCommands, setExpandedCommands] = useState<Set<string>>(
		new Set(),
	);

	useEffect(() => {
		const fetchCommands = async () => {
			try {
				const response = await fetch("/api/commands");
				if (response.ok) {
					const data = await response.json();
					// Handle different response formats
					const commandsArray = Array.isArray(data)
						? data
						: data.commands || data.data || [];
					setCommands(commandsArray);
				}
			} catch (error) {
				console.error("Error fetching commands:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCommands();
	}, []);

	const categories = [
		"All",
		...Array.from(new Set((commands || []).map((cmd) => cmd.category))),
	];
	const categoryCounts = categories.reduce(
		(acc, cat) => {
			if (cat === "All") {
				acc[cat] = (commands || []).length;
			} else {
				acc[cat] = (commands || []).filter(
					(cmd) => cmd.category === cat,
				).length;
			}
			return acc;
		},
		{} as Record<string, number>,
	);

	const filteredCommands = (commands || []).filter((cmd) => {
		const matchesSearch =
			cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || cmd.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const hasInfo = (command: Command) => {
		return (
			(command.parameters && command.parameters.length > 0) ||
			(command.permissions && command.permissions.length > 0)
		);
	};

	const toggleCommand = (commandName: string, command: Command) => {
		if (!hasInfo(command)) return;

		const newExpanded = new Set(expandedCommands);
		if (newExpanded.has(commandName)) {
			newExpanded.delete(commandName);
		} else {
			newExpanded.add(commandName);
		}
		setExpandedCommands(newExpanded);
	};

	const copyCommand = (commandName: string) => {
		navigator.clipboard.writeText(`/${commandName}`);
	};

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

	return (
		<>
			<MeshGradient />
			<main className="flex min-h-screen w-full py-24 px-8 relative z-10">
				<div className="w-full max-w-7xl mx-auto">
					{/* Header */}
					<div
						className="mb-8 animate-fade-in-up"
						style={{ animationDelay: "0.1s" }}
					>
						<h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
							<HiCommandLine className="w-8 h-8 text-white/80" />
							<span className="bg-gradient-to-r from-[#e9d8b6] via-[#f3e4c5] to-[#ad976b] bg-clip-text text-transparent">
								Commands
							</span>
						</h1>
					</div>

					<div className="flex flex-col lg:flex-row gap-6">
						{/* Sidebar - Categories */}
						<aside
							className="w-full lg:w-64 flex-shrink-0 animate-fade-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sticky top-24">
								<h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
									Categories
								</h2>
								<div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
									{categories.map((category) => {
										const IconComponent = getCategoryIcon(category);
										return (
											<button
												key={category}
												onClick={() => setSelectedCategory(category)}
												className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
													selectedCategory === category
														? "bg-white/20 text-white border border-white/30"
														: "backdrop-blur-md bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
												}`}
											>
												<IconComponent className="w-5 h-5 flex-shrink-0" />
												<span className="flex-1 text-left">{category}</span>
												<span className="text-white/50 text-xs">
													{categoryCounts[category]}
												</span>
											</button>
										);
									})}
								</div>
							</div>
						</aside>

						{/* Main Content - Search & Commands */}
						<div className="flex-1 min-w-0">
							{/* Search Bar */}
							<div
								className="mb-6 animate-fade-in-up"
								style={{ animationDelay: "0.3s" }}
							>
								<div className="relative">
									<HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
									<input
										type="text"
										placeholder="search commands"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/20 transition-all"
									/>
								</div>
							</div>

							{/* Commands List */}
							<div
								className="space-y-3 animate-fade-in-up"
								style={{ animationDelay: "0.4s" }}
							>
								{filteredCommands.map((command, index) => {
									const isExpanded = expandedCommands.has(command.name);
									const canExpand = hasInfo(command);
									return (
										<div
											key={command.name}
											className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up hover:bg-white/10 hover:border-white/20 transition-all"
											style={{ animationDelay: `${0.5 + index * 0.05}s` }}
										>
											{/* Command Header */}
											<div
												className={`p-5 flex items-center justify-between transition-all ${
													canExpand ? "cursor-pointer hover:bg-white/5" : ""
												}`}
												onClick={() =>
													canExpand && toggleCommand(command.name, command)
												}
											>
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-2">
														<span className="text-white font-semibold text-lg">
															/{command.name}
														</span>
														<button
															onClick={(e) => {
																e.stopPropagation();
																copyCommand(command.name);
															}}
															className="text-white/50 hover:text-white transition-colors"
														>
															<FaCopy className="w-4 h-4" />
														</button>
													</div>
													<p className="text-white/70 text-sm">
														{command.description}
													</p>
												</div>
												{canExpand && (
													<button className="text-white/50 hover:text-white transition-all duration-300 ml-4 transform">
														{isExpanded ? (
															<HiChevronUp className="w-5 h-5 transition-transform duration-300 rotate-180" />
														) : (
															<HiChevronDown className="w-5 h-5 transition-transform duration-300" />
														)}
													</button>
												)}
											</div>

											{/* Expanded Content */}
											<div
												className={`overflow-hidden transition-all duration-500 ease-in-out ${
													isExpanded
														? "max-h-[2000px] opacity-100"
														: "max-h-0 opacity-0"
												}`}
											>
												<div className="px-5 pb-5 border-t border-white/10 pt-5 space-y-4">
													{/* Parameters */}
													{command.parameters &&
														command.parameters.length > 0 && (
															<div
																className="animate-fade-in-up"
																style={{ animationDelay: "0.1s" }}
															>
																<div className="text-white/60 text-xs uppercase tracking-wide font-medium mb-3">
																	Parameters
																</div>
																<div className="space-y-2">
																	{command.parameters.map((param, idx) => (
																		<div
																			key={idx}
																			className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
																			style={{
																				animationDelay: `${0.15 + idx * 0.05}s`,
																			}}
																		>
																			<div className="flex items-center justify-between mb-1">
																				<span className="text-white font-medium">
																					{param.name}
																				</span>
																				{!param.optional && (
																					<span className="px-2 py-0.5 rounded-full text-xs bg-red-400/20 text-red-400 border border-red-400/30">
																						Required
																					</span>
																				)}
																			</div>
																			{param.description && (
																				<p className="text-white/60 text-sm mt-1">
																					{param.description}
																				</p>
																			)}
																		</div>
																	))}
																</div>
															</div>
														)}

													{/* Permissions */}
													{command.permissions &&
														command.permissions.length > 0 && (
															<div
																className="animate-fade-in-up"
																style={{ animationDelay: "0.2s" }}
															>
																<div className="text-white/60 text-xs uppercase tracking-wide font-medium mb-3">
																	Permissions
																</div>
																<div className="flex flex-wrap gap-2">
																	{command.permissions.map(
																		(permission, idx) => (
																			<span
																				key={idx}
																				className="px-3 py-1.5 rounded-full text-xs bg-white/10 text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
																				style={{
																					animationDelay: `${0.25 + idx * 0.03}s`,
																				}}
																			>
																				{permission}
																			</span>
																		),
																	)}
																</div>
															</div>
														)}
												</div>
											</div>
										</div>
									);
								})}
							</div>

							{filteredCommands.length === 0 && (
								<div className="text-center text-white/60 py-12">
									No commands found matching your search.
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

