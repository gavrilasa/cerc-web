"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface FolderCardProps {
  division: {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    iconName?: string;
    projects?: { title: string }[];
    _count?: { projects: number; members: number };
  };
  index?: number;
}

export function FolderCard({ division, index = 0 }: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get description for paper content
  const paperContent = division.description || "Division description";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="flex flex-col items-center group mt-8"
    >
      <Link
        href={`/divisions/${division.slug}`}
        className="block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Folder Container - Bigger size */}
        <div className="relative w-[200px] h-[175px] md:w-[220px] md:h-[190px]">
          
          {/* Back of folder SVG (with tab) */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 214 190" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 z-0"
          >
            <defs>
              <linearGradient id={`folder-back-${division.id}`} x1="106.506" y1="-30.7637" x2="106.506" y2="220" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E88E5"/>
                <stop offset="1" stopColor="#1565C0"/>
              </linearGradient>
            </defs>
            
            {/* Back of folder with tab */}
            <path 
              d="M0.380689 16.2419C0.171899 7.334 7.33601 0 16.2464 0H63.3999C65.8807 0 68.327 0.581595 70.5424 1.6981L101.665 17.3834C103.88 18.4999 106.327 19.0815 108.807 19.0815H196.729C205.654 19.0815 212.823 26.4382 212.594 35.36L210 175C209.8 183 203 190 195 190H18C10 190 3.2 183.2 3 175L0.380689 16.2419Z" 
              fill={`url(#folder-back-${division.id})`}
            />
          </svg>
          
          {/* Single Paper - inside folder, slides up on hover */}
          <div 
            className="absolute z-10 clip-path"
            style={{ 
              left: '0%', 
              right: '0%', 
              top: '0%', 
              bottom: '0%',
              borderRadius: '6px',
              overflow: isHovered ? 'visible' : 'hidden',
            }}
          >
            <motion.div 
              className="absolute inset-x-3 bg-white rounded-lg shadow-lg border border-gray-200"
              style={{ 
                height: '100%',
                aspectRatio: '1'
              }}
              animate={{ 
                y: isHovered ? -50 : 75,
                clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 0 45% 0)',
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="p-4">
                <p className="text-[11px] text-gray-700 font-medium leading-relaxed line-clamp-3 mb-3">
                  {paperContent}
                </p>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-4/5 bg-blue-100 rounded" />
                  <div className="h-1.5 w-3/5 bg-blue-100 rounded" />
                  <div className="h-1.5 w-2/3 bg-blue-100 rounded" />
                  <div className="h-1.5 w-1/2 bg-blue-100 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Front of folder SVG (semi-transparent overlay) */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 214 190" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <defs>
              <linearGradient id={`folder-front-${division.id}`} x1="106.506" y1="30" x2="106.506" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#42A5F5"/>
                <stop offset="0.658352" stopColor="#2196F3"/>
              </linearGradient>
            </defs>
            
            {/* Front of folder */}
            <path 
              d="M0.512641 55C0.232151 46 7.41544 40 16.3749 40H196.638C205.597 40 212.781 46 212.5 55L210 175C209.8 183 203 190 195 190H18C10 190 3.2 183.2 3 175L0.512641 55Z" 
              fill={`url(#folder-front-${division.id})`}
              fillOpacity="0.92"
            />
          </svg>
          
        </div>
      </Link>
      
      {/* Division Name (Below the folder) - Bigger text */}
      <span className="mt-3 text-base font-semibold text-foreground text-center truncate max-w-[220px] group-hover:text-primary transition-colors">
        {division.title}
      </span>
    </motion.div>
  );
}

export function FolderCardGrid({ divisions }: { divisions: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center py-4">
      {divisions.map((division, index) => (
        <FolderCard key={division.id} division={division} index={index} />
      ))}
    </div>
  );
}
