import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import ReactLenis from "lenis/react";
import Footer from "@/components/Footer";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
	variable: "--font-pixelify-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CERC | Computer Engineering Research Club",
	description: "Welcome to CERC",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${pixelifySans.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ReactLenis root />
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
