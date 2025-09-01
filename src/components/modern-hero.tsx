"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

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
        duration: 0.6,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary opacity-20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-hover opacity-20 rounded-full blur-3xl float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-primary opacity-10 rounded-full blur-3xl pulse-slow" />
        <div className="absolute top-10 right-20 w-32 h-32 accent-gradient opacity-30 rounded-full blur-2xl float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-hover opacity-15 rounded-full blur-2xl float" style={{ animationDelay: "3s" }} />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-20 text-center"
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
                className="absolute -bottom-2 left-0 right-0 h-1 accent-gradient rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            variants={itemVariants}
          >
            Transform your workflow with our comprehensive suite of online tools. 
            Fast, secure, and reliable solutions for all your digital needs.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="btn-ripple bg-gradient-primary hover:bg-gradient-hover text-white px-8 py-4 text-lg font-semibold shadow-gradient hover:shadow-glow energy-pulse"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              className="btn-ripple glass-card border-2 border-primary/20 hover:border-primary px-8 py-4 text-lg font-semibold hover-gradient"
            >
              Watch Demo
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
                whileHover={{ 
                  y: -10, 
                  scale: 1.05
                }}
                className="glass-card p-8 rounded-2xl hover-lift group cursor-pointer border-gradient shadow-medium hover:shadow-glow"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 accent-gradient rounded-2xl flex items-center justify-center shadow-medium"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 transition-all duration-300" style={{ color: 'hsl(var(--foreground))' }}>
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {[
            { number: "1M+", label: "Files Processed" },
            { number: "50+", label: "Tools Available" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}