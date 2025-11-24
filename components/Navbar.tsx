"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/ui/use-scroll";
import { Command, Menu, X, Sun, Moon } from "lucide-react";
import StaggeredMenu, { StaggeredMenuHandle } from "./StaggeredMenu";
import { useTheme } from "next-themes";

export function Navbar() {
	const scrolled = useScroll(10);
	const menuRef = useRef<StaggeredMenuHandle>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { setTheme, theme } = useTheme();

	const menuItems = [
		{ label: "Features", ariaLabel: "Features", link: "#" },
		{ label: "Pricing", ariaLabel: "Pricing", link: "#" },
		{ label: "About", ariaLabel: "About", link: "#" },
	];

	const socialItems = [
		{ label: "Twitter", link: "https://twitter.com" },
		{ label: "GitHub", link: "https://github.com" },
	];

	const handleToggle = () => {
		menuRef.current?.toggle();
	};

	return (
		<>
			<header
				className={cn(
					"sticky top-0 z-1 mx-auto w-full container border-b border-transparent md:rounded-2xl md:border md:transition-all md:ease-out py-2 px-4",
					{
						"bg-background/95 supports-backdrop-filter:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-6xl md:shadow":
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
					<div className="flex items-center gap-2">
						<Command className="h-6 w-6" />
					</div>

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
							className="relative h-10 w-10 overflow-hidden"
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
				colors={["#1A6BFF", "#0047FF"]}
				accentColor="#0055FF"
				onMenuOpen={() => setIsOpen(true)}
				onMenuClose={() => setIsOpen(false)}
			/>
		</>
	);
}
