
"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { ParticleBackground } from "./particle-background";
import { SearchBar } from "./search-bar";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process files in seconds with our optimized algorithms"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your files are processed locally and never stored"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Advanced AI technology for superior results"
  }
];

export function ModernHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ParticleBackground />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient-animated leading-tight"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Modern Tools for
            <br />
            <span className="relative">
              Digital Life
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            Transform your workflow with our comprehensive suite of online tools. 
            Fast, secure, and reliable solutions for all your digital needs.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar />

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
                <Link href="/tools">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg bg-background/50 border-border hover:bg-muted">
                <Link href="#">
                    Watch Demo
                </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-card/60 backdrop-blur-md p-8 rounded-2xl border border-border/20 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent text-white rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
