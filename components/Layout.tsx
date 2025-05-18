'use client';

import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({
  children
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-indigo-900/50 to-transparent pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="stars absolute inset-0"></div>
      </div>
      <style jsx>{`
        .stars {
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              #eee,
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};
