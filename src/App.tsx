import React, { useEffect } from 'react';
import ValidationForm from './components/ValidationForm';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';
import './styles/locomotive-scroll.css';
import { ArrowDown } from 'lucide-react';

function App() {
  const { containerRef } = useLocomotiveScroll({
    smooth: true,
    smartphone: { smooth: false },
    tablet: { smooth: false },
  });

  // Update title
  useEffect(() => {
    document.title = 'Form Validation App';
  }, []);

  return (
    <ThemeProvider>
      <div 
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
        data-scroll-container
      >
        {/* Header with theme toggle */}
        <header className="fixed top-0 right-0 p-4 z-10">
          <ThemeToggle />
        </header>
        
        {/* Hero section */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center px-4 relative"
          data-scroll-section
        >
          <div className="text-center mb-8" data-scroll data-scroll-speed="1">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Form Validation
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
              Experience real-time validation with instant feedback to ensure your information is accurate and secure.
            </p>
          </div>
          
          <div data-scroll data-scroll-speed="0.5">
            <ValidationForm />
          </div>
          
          <div className="absolute bottom-8 animate-bounce" data-scroll data-scroll-speed="-1">
            <button 
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Features</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </section>
        
        {/* Features section */}
        <section 
          id="features" 
          className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300"
          data-scroll-section
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white" data-scroll data-scroll-speed="0.5">
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div 
                className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.3"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Real-time Validation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get instant feedback as you type with field-by-field validation that highlights errors immediately.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div 
                className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.4"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Password Strength Meter</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visual indicator helps you create strong, secure passwords by showing strength in real-time.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div 
                className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.5"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dark Mode Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reduce eye strain with a beautiful dark mode that remembers your preference.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div 
                className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.6"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure Validation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Industry-standard validation ensures data integrity and protects against common security threats.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div 
                className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.7"
              >
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smooth Scrolling</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enjoy a premium user experience with buttery-smooth scrolling and subtle animations.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div 
                className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl shadow-sm"
                data-scroll
                data-scroll-speed="0.8"
              >
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-800 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Accessible Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fully accessible forms with proper ARIA attributes, keyboard navigation, and screen reader support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer 
          className="py-8 px-4 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
          data-scroll-section
        >
          <p>© {new Date().getFullYear()} Form Validation App. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;