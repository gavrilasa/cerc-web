import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "randomuser.me",
				port: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "**.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
			},
		],
	},
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
};

export default nextConfig;
