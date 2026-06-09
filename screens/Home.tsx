import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';
import heroImg from '../assets/hero.png';
import BackgroundWrapper from '../components/BackgroundWrapper';


export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Électronique', icon: '💻' },
    { name: 'Vêtements', icon: '👕' },
    { name: 'Maison', icon: '🏠' },
    { name: 'Livres', icon: '📚' }
  ];

  return (
    /* ── Full-screen hero background ── */
    <BackgroundWrapper>

      {/* Page content centred on top */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}>
          <div className="page-container" style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.60)',
            backdropFilter: 'blur(28px) saturate(200%)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%)',
            border: '1px solid rgba(255,200,120,0.35)',
            boxShadow: '0 20px 60px rgba(180, 100, 0, 0.18), 0 0 0 1px rgba(255,255,255,0.4) inset',
          }}>

            {/* Brand Details */}
            <div>
              <h1 style={{
                fontSize: '2.8rem',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
                background: 'linear-gradient(135deg, hsl(220, 25%, 10%) 30%, var(--color-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                e-joutia
                            </h1>
                <img src={heroImg} alt="Hero logo" style={{ width: '100%', maxWidth: '280px', borderRadius: 'var(--radius-md)', margin: '1rem auto', display: 'block' }} />
              <p style={{
                fontSize: '1.15rem',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Vendez vos objets en quelques secondes. Publiez des annonces gratuitement avec des photos et détails de qualité.
              </p>
            </div>

            {/* Category overview tags */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              width: '100%'
            }}>
              {categories.map((cat) => (
                <span key={cat.name} style={{
                  padding: '0.4rem 0.9rem',
                  background: 'rgba(255, 255, 255, 0.45)',
                  border: '1px solid rgba(255,180,80,0.25)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backdropFilter: 'blur(8px)',
                }}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/publish')}
              className="btn btn-primary"
              style={{
                fontSize: '1.1rem',
                padding: '1rem 2.2rem',
                marginTop: '0.5rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Créer une annonce
            </button>
          </div>
        
      </div>
    </BackgroundWrapper>
    
  );
}
