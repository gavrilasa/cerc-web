"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/ui/use-scroll";
import { Menu, X, Sun, Moon } from "lucide-react";
import StaggeredMenu, { StaggeredMenuHandle } from "./StaggeredMenu";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
	const scrolled = useScroll(10);
	const menuRef = useRef<StaggeredMenuHandle>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { setTheme, theme } = useTheme();

	const menuItems = [
		{ label: "Home", ariaLabel: "Home", link: "/" },
		{ label: "Software", ariaLabel: "Software Engineering", link: "/divisions/software" },
		{ label: "Network", ariaLabel: "Network & Security", link: "/divisions/network" },
		{ label: "Embedded", ariaLabel: "Embedded & IoT", link: "/divisions/embedded" },
		{ label: "Multimedia", ariaLabel: "Multimedia & Design", link: "/divisions/multimedia" },
	];

	const socialItems = [
		{ label: "Instagram", link: "https://instagram.com/cerc_undip" },
		{ label: "LinkedIn", link: "https://linkedin.com/company/cerc-undip" },
		{ label: "GitHub", link: "https://github.com/cerc-undip" },
	];

	const handleToggle = () => {
		menuRef.current?.toggle();
	};

	return (
		<>
			<header
				className={cn(
					"sticky top-0 z-50 mx-auto w-full container border-b border-transparent md:rounded-2xl md:border md:transition-all md:ease-out py-2 px-4",
					{
						"bg-background/80 supports-backdrop-filter:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-6xl md:shadow-sm":
							scrolled,
						"border-transparent": isOpen,
					}
				)}
			>
				<nav
					className={cn(
						"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
						{
							"md:px-2": scrolled,
						}
					)}
				>
					<Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
						<Image 
							src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013541/Logo-CERC-presspadding_r027nm.png"
							alt="CERC Logo"
							width={32}
							height={32}
							className="object-contain"
						/>
						<span className="font-bold tracking-tight hidden sm:block">CERC</span>
					</Link>

					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-10 w-10"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							onClick={handleToggle}
							className="relative h-10 w-10 overflow-hidden z-50"
						>
							<Menu
								className={cn(
									"h-6 w-6 absolute transition-all duration-300 ease-in-out",
									isOpen
										? "rotate-90 opacity-0 scale-50"
										: "rotate-0 opacity-100 scale-100"
								)}
							/>

							<X
								className={cn(
									"h-6 w-6 absolute transition-all duration-300 ease-in-out",
									isOpen
										? "rotate-0 opacity-100 scale-100"
										: "-rotate-90 opacity-0 scale-50"
								)}
							/>
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</div>
				</nav>
			</header>

			<StaggeredMenu
				ref={menuRef}
				headless={true}
				items={menuItems}
				socialItems={socialItems}
				isFixed={true}
				displaySocials={true}
				displayItemNumbering={true}
				colors={["#2563eb", "#1d4ed8", "#1e40af"]}
				accentColor="#3b82f6"
				onMenuOpen={() => setIsOpen(true)}
				onMenuClose={() => setIsOpen(false)}
				className="font-mono"
			/>
		</>
	);
}