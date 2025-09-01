/* iLovePDF-Inspired Modern Design System */

/* Design Principles:
 - Clean, minimal, professional aesthetic
 - Blue-purple gradient color scheme
 - Consistent spacing and typography
 - Subtle hover animations and micro-interactions
 - Mobile-first responsive design
 - Accessibility-focused
*/

/* Custom Properties */
:root {
  /* Primary Brand Colors */
  --brand-blue: #3b82f6;
  --brand-purple: #8b5cf6;
  --brand-gradient: linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-purple) 100%);
  
  /* Neutral Colors */
  --white: #ffffff;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  
  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: var(--brand-blue);
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--gray-800);
  background: var(--gray-50);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Typography */
.heading-1 {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  line-height: 1.2;
  color: var(--gray-900);
}

.heading-2 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: 1.3;
  color: var(--gray-900);
}

.heading-3 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: 1.4;
  color: var(--gray-800);
}

.text-gradient {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-sm);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background: var(--brand-gradient);
  color: var(--white);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  filter: brightness(1.05);
}

.btn-secondary {
  background: var(--white);
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
}

.btn-outline:hover {
  background: var(--brand-blue);
  color: var(--white);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* Cards */
.card {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-100);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--gray-200);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-xl);
}

/* Tool Cards (iLovePDF Style) */
.tool-card {
  background: var(--white);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  text-align: center;
  border: 1px solid var(--gray-100);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--brand-gradient);
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.tool-card:hover::before {
  transform: scaleX(1);
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--brand-blue);
}

.tool-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.tool-card:hover .tool-icon {
  transform: scale(1.1) rotate(5deg);
  background: var(--brand-gradient);
}

.tool-card:hover .tool-icon svg {
  color: var(--white);
}

/* Grid Layouts */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-auto {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Form Elements */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background: var(--white);
}

.input:focus {
  outline: none;
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:hover {
  border-color: var(--gray-300);
}

/* Navigation */
.nav {
  background: var(--white);
  border-bottom: 1px solid var(--gray-100);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
}

.nav-links {
  display: flex;
  gap: var(--space-8);
}

.nav-link {
  color: var(--gray-600);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--brand-blue);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--brand-gradient);
  transition: width var(--transition-base);
}

.nav-link:hover::after {
  width: 100%;
}

/* Loading States */
.loading {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200);
  border-top: 3px solid var(--brand-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.skeleton {
  background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease forwards;
}

.slide-up {
  animation: slideUp 0.6s ease forwards;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(3, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .container { padding: 0 var(--space-4); }
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .heading-1 { font-size: var(--font-size-3xl); }
  .heading-2 { font-size: var(--font-size-2xl); }
  .tool-card { padding: var(--space-6); }
}

@media (max-width: 480px) {
  .container { padding: 0 var(--space-3); }
  .tool-card { padding: var(--space-4); }
  .btn { padding: var(--space-2) var(--space-4); }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }

.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }

.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-2xl { border-radius: var(--radius-2xl); }

.shadow { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }