import React from 'react';

export default function PhoneShell({ 
  children, 
  bgApp = 'bg-white',
  className = ''
}: { 
  children: React.ReactNode;
  bgApp?: string;
  className?: string;
}) {
  return (
    <div 
      className={`relative w-[390px] h-[844px] flex-shrink-0 ${bgApp} rounded-[55px] border-[16px] border-black overflow-hidden flex flex-col pointer-events-auto shadow-2xl ${className}`}
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      {/* Hardware Buttons */}
      <div className="absolute -left-[19px] top-[150px] w-[3px] h-[35px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[19px] top-[210px] w-[3px] h-[65px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[19px] top-[290px] w-[3px] h-[65px] bg-black rounded-l-md z-0" />
      <div className="absolute -right-[19px] top-[240px] w-[3px] h-[95px] bg-black rounded-r-md z-0" />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-[24px] z-50 flex items-center justify-end px-5">
        <div className="w-3 h-3 rounded-full bg-[#111] shadow-inner border border-white/5"></div>
      </div>

      {children}
    </div>
  );
}
