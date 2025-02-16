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
              <span className="text-2xl mb-4 inline-block">👋</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Optimized for Larger Screens
              </h3>
              <p className="text-gray-600 mb-6">
                For the best experience, I recommend using a tablet or desktop device.
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Continue with mobile device
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}