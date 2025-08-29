
"use client";

export function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden hero-background-blue -z-10">
      <div className="relative w-full h-full">
        <div className="circle-animated circle-small" />
        <div className="circle-animated circle-medium" />
        <div className="circle-animated circle-large" />
        <div className="circle-animated circle-xlarge" />
        <div className="circle-animated circle-xxlarge" />
      </div>
    </div>
  );
}


    