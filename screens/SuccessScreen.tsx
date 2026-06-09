import React from 'react';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useNavigate, useLocation } from 'react-router-dom';
interface AdData {
  title: string;
  description: string;
  price: string | number;
  category: string;
  condition: string;
}

interface LocationState {
  ad: AdData;
  images: File[];
}

export default function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const handleViewAd = () => {
    navigate('/publish/view', {
      state: { ad: state?.ad, images: state?.images ?? [] }
    });
  };

  return (
    <div className="page-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '3rem 2rem'
      }}>
        {/* Animated Checkmark Circle */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '2px solid hsl(142, 70%, 42%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.8rem',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
          animation: 'pulseGlow 2s infinite'
        }}>
          ✅
        </div>

        <div>
          <h2 style={{
            fontSize: '2.2rem',
            marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, hsl(220, 25%, 10%) 40%, hsl(142, 70%, 40%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Annonce publiée avec succès !
          </h2>
          {state?.ad?.title && (
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1.1rem',
              marginBottom: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text)'
            }}>
              « {state.ad.title} »
            </div>
          )}
          <p style={{
            fontSize: '1.05rem',
            maxWidth: '450px',
            margin: '0 auto',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6'
          }}>
            Votre annonce a été publiée avec succès et est désormais en ligne pour la communauté d'e-joutia.
          </p>
        </div>

        {/* Summary stats */}
        {state?.ad && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '420px'
          }}>
            {[
              { icon: '🏷️', label: 'Catégorie', value: state.ad.category },
              { icon: '💰', label: 'Prix', value: `${Number(state.ad.price).toLocaleString('fr-MA')} DH` },
              { icon: '📸', label: 'Photos', value: `${state.images?.length ?? 0}` },
            ].map(item => (
              <div key={item.label} style={{
                flex: '1 1 110px',
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.15rem' }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          marginTop: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          width: '100%',
          maxWidth: '420px'
        }}>
          {/* Primary: View Ad */}
          <button
            onClick={handleViewAd}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '1.05rem', padding: '1rem' }}
          >
            Voir mon annonce
          </button>

          {/* Secondary row */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Accueil
            </button>
            <button
              onClick={() => navigate('/publish')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Nouvelle annonce
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
