import React, { useEffect, useState } from 'react';

interface ThumbnailListProps {
  images: File[];
  onRemove: (index: number) => void;
}

export default function ThumbnailList({ images, onRemove }: ThumbnailListProps) {
  const [urls, setUrls] = useState<string[]>([]);

  // Safely manage object URLs to prevent memory leaks while keeping them active during re-renders
  useEffect(() => {
    const newUrls = images.map(file => URL.createObjectURL(file));
    setUrls(newUrls);

    // Cleanup URLs when images change or component unmounts
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <div className="thumbnails-grid">
      {images.map((file, idx) => (
        <div key={idx} className="thumbnail-wrapper">
          {urls[idx] && (
            <img
              src={urls[idx]}
              alt={`preview-${idx}`}
              className="thumbnail-image"
            />
          )}
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="thumbnail-remove-btn"
            aria-label={`Supprimer image ${idx + 1}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
