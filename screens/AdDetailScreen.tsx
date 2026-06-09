import React, { useState, useEffect } from 'react';
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

const conditionColors: Record<string, { bg: string; color: string }> = {
  'Neuf': { bg: 'rgba(16, 185, 129, 0.1)', color: 'hsl(142, 70%, 35%)' },
  'Très bon état': { bg: 'rgba(59, 130, 246, 0.1)', color: 'hsl(217, 80%, 45%)' },
  'Bon état': { bg: 'rgba(245, 158, 11, 0.1)', color: 'hsl(38, 90%, 38%)' },
  'À réparer': { bg: 'rgba(239, 68, 68, 0.1)', color: 'hsl(350, 80%, 50%)' },
};

export default function AdDetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Build preview URLs and clean them up on unmount
  useEffect(() => {
    if (!state?.images?.length) return;
    const urls = state.images.map(f => URL.createObjectURL(f));
    setImageUrls(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
  }, [state?.images]);

  if (!state?.ad) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Annonce introuvable</h2>
          <p style={{ marginBottom: '2rem' }}>Aucune annonce n'est disponible pour la prévisualisation.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  const { ad } = state;
  const condStyle = conditionColors[ad.condition] ?? { bg: 'rgba(0,0,0,0.06)', color: 'var(--color-text-muted)' };

  return (
    <div className="page-container" style={{ paddingBottom: '3rem' }}>
      {/* Header Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0 0.5rem'
      }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          ⬅ Retour
        </button>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-text-muted)',
          background: 'rgba(0,0,0,0.04)',
          padding: '0.3rem 0.8rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-card-border)'
        }}>
          Aperçu de votre annonce
        </span>
        <button
          onClick={() => navigate('/publish')}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          ➕ Nouvelle annonce
        </button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>

        {/* Photo Gallery */}
        {imageUrls.length > 0 ? (
          <div style={{ position: 'relative', background: 'rgba(0,0,0,0.03)' }}>
            {/* Main photo */}
            <div style={{
              width: '100%',
              height: '320px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.04)'
            }}>
              <img
                src={imageUrls[selectedIdx]}
                alt={`Photo principale de l'annonce`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'opacity 0.2s ease'
                }}
              />

              {/* Navigation arrows */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedIdx(i => Math.max(0, i - 1))}
                    disabled={selectedIdx === 0}
                    style={{
                      position: 'absolute', left: '1rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '50%', width: '40px', height: '40px',
                      cursor: selectedIdx === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: selectedIdx === 0 ? 0.3 : 1,
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 0.15s ease'
                    }}
                  >‹</button>
                  <button
                    onClick={() => setSelectedIdx(i => Math.min(imageUrls.length - 1, i + 1))}
                    disabled={selectedIdx === imageUrls.length - 1}
                    style={{
                      position: 'absolute', right: '1rem', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '50%', width: '40px', height: '40px',
                      cursor: selectedIdx === imageUrls.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: selectedIdx === imageUrls.length - 1 ? 0.3 : 1,
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 0.15s ease'
                    }}
                  >›</button>
                </>
              )}

              {/* Photo count badge */}
              <div style={{
                position: 'absolute', bottom: '1rem', right: '1rem',
                background: 'rgba(0,0,0,0.55)', color: '#fff',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem', fontWeight: 600
              }}>
                {selectedIdx + 1} / {imageUrls.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            {imageUrls.length > 1 && (
              <div style={{
                display: 'flex', gap: '0.5rem', padding: '0.75rem',
                overflowX: 'auto', background: 'rgba(0,0,0,0.02)',
                borderTop: '1px solid var(--color-card-border)'
              }}>
                {imageUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    style={{
                      width: '64px', height: '64px', flexShrink: 0,
                      borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                      border: idx === selectedIdx
                        ? '2px solid var(--color-primary)'
                        : '2px solid transparent',
                      cursor: 'pointer', padding: 0,
                      transition: 'all 0.15s ease',
                      boxShadow: idx === selectedIdx ? 'var(--shadow-glow)' : 'none',
                      background: 'none'
                    }}
                  >
                    <img
                      src={url}
                      alt={`Miniature ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            height: '200px', background: 'rgba(0,0,0,0.03)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            borderBottom: '1px solid var(--color-card-border)'
          }}>
            <span style={{ fontSize: '3rem', opacity: 0.3 }}>📷</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Aucune photo ajoutée</span>
          </div>
        )}

        {/* Ad Content */}
        <div style={{ padding: '2rem' }}>

          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'hsl(142, 70%, 35%)',
              fontSize: '0.78rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex', alignItems: 'center', gap: '0.3rem'
            }}>
              <span>●</span> En ligne
            </span>
            <span style={{
              background: 'rgba(0,0,0,0.04)', color: 'var(--color-text-secondary)',
              fontSize: '0.78rem', fontWeight: 600,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-card-border)'
            }}>
              {ad.category}
            </span>
            <span style={{
              background: condStyle.bg, color: condStyle.color,
              fontSize: '0.78rem', fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${condStyle.bg}`
            }}>
              {ad.condition}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '1.75rem', lineHeight: 1.25,
            marginBottom: '0.5rem',
            color: 'hsl(220, 25%, 10%)'
          }}>
            {ad.title}
          </h1>

          {/* Price */}
          <div style={{
            fontSize: '2.2rem', fontWeight: 800,
            color: 'var(--color-primary)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            {Number(ad.price).toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DH
          </div>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-card-border)', marginBottom: '1.5rem' }} />

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent)' }}>
              Description
            </h3>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1rem', lineHeight: '1.7',
              whiteSpace: 'pre-wrap'
            }}>
              {ad.description}
            </p>
          </div>

          {/* Details table */}
          <div style={{
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'Catégorie', value: ad.category, icon: '🏷️' },
              { label: 'État', value: ad.condition, icon: '⭐' },
              { label: 'Prix', value: `${Number(ad.price).toLocaleString('fr-MA')} DH`, icon: '💰' },
              { label: 'Photos', value: `${state.images?.length ?? 0} photo(s)`, icon: '📸' },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-card-border)' : 'none'
              }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{row.icon}</span> {row.label}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/publish')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              🏠 Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
