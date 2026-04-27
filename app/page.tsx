'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import HeroScene from '@/components/HeroScene';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import { useOGFetch } from '@/hooks/useOGFetch';

export default function HomePage() {
  const { data, loading, error, fetch } = useOGFetch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (url: string) => {
    setHasSearched(true);
    await fetch(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      {/* Split Hero Wrapper */}
      <div className="relative flex flex-col">
        {/* Global Horizontal Split Background for Hero */}
        <div className="absolute inset-0 flex flex-col z-0 pointer-events-none overflow-hidden">
          <div className="h-[75vh] w-full bg-[#1a2b21]"></div>
          <div className="flex-1 w-full bg-[#f4f0e6]"></div>
        </div>

        <div className="relative z-10 flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col relative">
            <HeroScene
              onSubmit={handleSubmit}
              loading={loading}
              data={data}
              error={error}
              hasSearched={hasSearched}
            />
          </main>
        </div>
      </div>

      <FaqSection />
      <Footer />
    </div>
  );
}
