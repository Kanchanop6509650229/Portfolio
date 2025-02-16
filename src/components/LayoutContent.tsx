"use client";

import Navbar from './Navbar';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const isAdminPage = segments[0] === 'admin';
  const [isMobile, setIsMobile] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setShowWarning(true); // Reset warning if user switches to desktop
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <>
      {!isAdminPage && <Navbar />}
      {!isAdminPage && isMobile && showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 rotate-phone-animation text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rotate Your Device
              </h3>
              <p className="text-gray-600 mb-6">
                For the best experience, please rotate your phone to landscape mode.
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Continue anyway
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}