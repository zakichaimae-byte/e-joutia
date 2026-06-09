import React from 'react';
import heroBg from '../assets/hero_bg.png';

/**
 * Wraps children with a full‑screen background image.
 * The background is fixed, covers the whole viewport, and includes a subtle overlay
 * for readability of nested content.
 */
export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Warm overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(255,240,220,0.72) 0%, rgba(255,200,140,0.55) 50%, rgba(250,230,200,0.70) 100%)',
        backdropFilter: 'blur(2px)',
      }} />
      {/* Content container – placed above overlay */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
