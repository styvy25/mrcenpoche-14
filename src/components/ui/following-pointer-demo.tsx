
import React from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Custom Image component to replace Next.js Image
const Image = ({ src, alt, className, width, height }: { 
  src: string; 
  alt: string; 
  className?: string; 
  width?: string | number;
  height?: string | number;
  layout?: string;
  objectFit?: string;
}) => (
  <img 
    src={src} 
    alt={alt} 
    className={className} 
    style={{ 
      width: width ? `${width}px` : '100%', 
      height: height ? `${height}px` : 'auto',
      objectFit: 'cover'
    }} 
  />
);

export function FollowingPointerDemo() {
  return (
    <div className="w-80 mx-auto">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <Image
              src={'https://ui.aceternity.com/_next/image?url=%2Fdemo%2Fthumbnail.png&w=3840&q=75'}
              alt="thumbnail"
              className="group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold my-4 text-lg text-zinc-700">
              {blogContent.title}
            </h2>
            <h2 className="font-normal my-4 text-sm text-zinc-500">
              {blogContent.description}
            </h2>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{blogContent.date}</span>
              <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                Read More
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/demo/thumbnail.png",
  authorAvatar: "/manu.png",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      alt="thumbnail"
      width={20}
      height={20}
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
