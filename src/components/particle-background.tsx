"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)`
        });
      }

      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${(100 - distance) / 100 * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(102, 126, 234, 0.1))',
          backdropFilter: 'blur(5px)'
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border border-primary/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -90, -180],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(0, 212, 255, 0.1))',
          backdropFilter: 'blur(10px)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-20 h-20 border border-secondary/20 rounded-lg"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 45, 90],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(240, 159, 251, 0.1), rgba(102, 126, 234, 0.1))',
          backdropFilter: 'blur(10px)'
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/3 right-10 w-16 h-16 rounded-full"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3), rgba(0, 212, 255, 0.1))',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-10 w-12 h-12 rounded-full"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 1.4, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        style={{
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3), rgba(102, 126, 234, 0.1))',
          boxShadow: '0 0 25px rgba(102, 126, 234, 0.4)'
        }}
      />
    </div>
  );
}

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent 70%)'
        }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-lg"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2), transparent 70%)'
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        style={{
          background: 'radial-gradient(circle, rgba(240, 159, 251, 0.2), transparent 70%)'
        }}
      />
    </div>
  );
}