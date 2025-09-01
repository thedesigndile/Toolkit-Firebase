/* Modern UI Design System (Blue + Purple Theme) */

:root {
  /* Brand Colors */
  --primary: #2563eb; /* Blue */
  --primary-dark: #1e40af;
  --primary-light: #60a5fa;
  --secondary: #7c3aed; /* Purple */
  --secondary-dark: #5b21b6;
  --secondary-light: #a855f7;
  
  /* Status Colors */
  --success: #10b981;
  --error: #ef4444;
  --warning: #facc15;
  --info: #3b82f6;
  
  /* Neutral Colors */
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --background: #ffffff;
  --surface: #f9fafb;
  --border: #e5e7eb;
  --input-bg: #f3f4f6;
  
  /* Dark Mode Colors */
  --dark-background: #0f172a;
  --dark-surface: #1e293b;
  --dark-text: #f8fafc;
  --dark-text-secondary: #94a3b8;
  --dark-border: #334155;
  --dark-input-bg: #475569;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
}

/* Base Styles & Global Transitions */
body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: var(--text-primary);
  background: var(--background);
  line-height: 1.6;
  transition: background-color 0.4s ease, color 0.4s ease;
}

@media (prefers-color-scheme: dark) {
  body {
    color: var(--dark-text);
    background: var(--dark-background);
  }
}

/* Typography with Enhanced Gradient */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light), var(--secondary), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Outstanding Button Design */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-lg);
}

.btn-primary:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.75s ease-out;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
}

.btn-primary:hover:before {
  transform: translate(-50%, -50%) scale(1);
}

/* Outstanding Card Design */
.card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  border: 1px solid var(--border);
}

.card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary);
}

/* Inputs and Forms */
.input-group {
  margin-bottom: var(--spacing-md);
}

.input, .textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

@media (prefers-color-scheme: dark) {
  .input, .textarea {
    background-color: var(--dark-input-bg);
    border-color: var(--dark-border);
    color: var(--dark-text);
  }
  .input:focus, .textarea:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
  }
}

/* Outstanding Navigation */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--background);
  padding: var(--spacing-md) var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.nav a {
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.3s ease, transform 0.2s ease;
  padding: var(--spacing-sm) 0;
  position: relative;
}

.nav a:hover {
  color: var(--primary);
  transform: translateY(-2px);
}

.nav a:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  transition: width 0.3s ease-in-out;
}

.nav a:hover:after {
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  .nav {
    background: var(--dark-surface);
  }
  .nav a {
    color: var(--dark-text-secondary);
  }
  .nav a:hover {
    color: var(--primary-light);
  }
}

/* Outstanding Footer */
.footer {
  background: var(--dark-surface);
  color: var(--dark-text-secondary);
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-md);
  margin-top: auto;
  font-size: 0.875rem;
  border-top: 1px solid var(--dark-border);
}

.footer a {
  color: var(--secondary-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: var(--primary-light);
}

/* Gradient Backgrounds */
.gradient-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

/* Accessibility and Focus States */
*:focus {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}

@media (prefers-color-scheme: dark) {
  .card, .modal-content, .dropdown-content {
    background: var(--dark-surface);
    color: var(--dark-text);
    border-color: var(--dark-border);
  }
}
