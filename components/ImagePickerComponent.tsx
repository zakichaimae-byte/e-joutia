import React, { ChangeEvent } from 'react';

interface ImagePickerProps {
  images: File[];
  setImages: (files: File[]) => void;
}

export default function ImagePickerComponent({ images, setImages }: ImagePickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    
    // Check if total exceeds 5
    const total = images.length + selected.length;
    if (total > 5) {
      alert('Vous ne pouvez sélectionner que 5 photos maximum.');
      return;
    }
    
    setImages([...images, ...selected]);
  };

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <label className="upload-container">
        <div className="upload-icon">📸</div>
        <div className="upload-title">
          {images.length === 0 ? "Ajouter des photos de votre produit" : "Ajouter d'autres photos"}
        </div>
        <div className="upload-subtitle">
          Sélectionnez jusqu'à 5 images (format PNG, JPG)
        </div>
        <div style={{
          marginTop: '0.25rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: images.length >= 5 ? 'var(--color-error)' : 'var(--color-primary)',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {images.length} / 5 photos ajoutées
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleChange}
          disabled={images.length >= 5}
        />
      </label>
    </div>
  );
}
