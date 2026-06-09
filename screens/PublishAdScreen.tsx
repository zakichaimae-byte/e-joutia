import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import ImagePickerComponent from '../components/ImagePickerComponent';
import ThumbnailList from '../components/ThumbnailList';

const categories = ['Électronique', 'Vêtements', 'Maison', 'Livres', 'Autre'];
const conditions = ['Neuf', 'Très bon état', 'Bon état', 'À réparer'];

const AdSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Le titre ne doit pas dépasser 50 caractères')
    .required('Le titre est obligatoire'),
  description: Yup.string()
    .min(10, 'Veuillez écrire une description d\'au moins 10 caractères')
    .required('La description est obligatoire'),
  price: Yup.number()
    .typeError('Le prix doit être un nombre')
    .min(0.01, 'Le prix doit être supérieur à 0')
    .max(99999.99, 'Le prix ne peut pas dépasser 99999.99')
    .required('Le prix est obligatoire'),
  category: Yup.string().oneOf(categories).required('La catégorie est obligatoire'),
  condition: Yup.string().oneOf(conditions).required("L'état du produit est obligatoire"),
});

export default function PublishAdScreen() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    if (images.length === 0) {
      alert('Veuillez ajouter au moins une photo');
      return;
    }
    setSubmitting(true);

    // Simulate FormData construction
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    images.forEach((file, idx) => {
      formData.append('photos', file, file.name);
    });

    // Log the Form Data simulation to console
    console.log('--- Soumission de l\'annonce (FormData) ---');
    for (let pair of (formData as any).entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }

    // Simulate network latency (1.5 seconds)
    await new Promise(res => setTimeout(res, 1500));
    
    setSubmitting(false);
    navigate('/publish/success', { state: { ad: values, images } });
  };

  return (
    <div className="page-container">
      {/* Header and Back Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0 0.5rem'
      }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          ⬅ Retour
        </button>
        <h3 style={{ margin: 0, opacity: 0.8 }}>Nouvelle Annonce</h3>
      </div>

      <div className="glass-card">
        <h2 style={{ 
          marginBottom: '1.5rem',
          fontSize: '2rem',
          background: 'linear-gradient(135deg, hsl(220, 25%, 10%) 40%, var(--color-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Publiez votre produit
        </h2>

        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            category: '',
            condition: '',
          }}
          validationSchema={AdSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Titre */}
              <div className="form-group">
                <label htmlFor="title">Titre de l'annonce</label>
                <Field 
                  id="title" 
                  name="title" 
                  placeholder="Ex: iPhone 13 Pro Max - 256Go" 
                  className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="title">
                  {msg => <div className="error-message">⚠️ {msg}</div>}
                </ErrorMessage>
              </div>

              {/* Row: Categorie & Etat */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Catégorie</label>
                  <Field 
                    as="select" 
                    id="category" 
                    name="category"
                    className="form-control"
                  >
                    <option value="">Sélectionner...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category">
                    {msg => <div className="error-message">⚠️ {msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="form-group">
                  <label htmlFor="condition">État</label>
                  <Field 
                    as="select" 
                    id="condition" 
                    name="condition"
                    className="form-control"
                  >
                    <option value="">Sélectionner...</option>
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="condition">
                    {msg => <div className="error-message">⚠️ {msg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description détaillée</label>
                <Field 
                  as="textarea" 
                  id="description" 
                  name="description" 
                  placeholder="Décrivez l'état de l'objet, ses caractéristiques, etc."
                  className="form-control"
                />
                <ErrorMessage name="description">
                  {msg => <div className="error-message">⚠️ {msg}</div>}
                </ErrorMessage>
              </div>

              {/* Prix */}
              <div className="form-group">
                <label htmlFor="price">Prix (DH)</label>
                <Field 
                  id="price" 
                  name="price" 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01"
                  className="form-control"
                />
                <ErrorMessage name="price">
                  {msg => <div className="error-message">⚠️ {msg}</div>}
                </ErrorMessage>
              </div>

              {/* Photos upload area */}
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label>Photos du produit</label>
                <ImagePickerComponent images={images} setImages={setImages} />
                
                {/* Thumbnail Previews */}
                {images.length > 0 && (
                  <ThumbnailList 
                    images={images} 
                    onRemove={idx => {
                      const newImgs = images.filter((_, i) => i !== idx);
                      setImages(newImgs);
                    }} 
                  />
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ 
                  marginTop: '1.5rem',
                  alignSelf: 'stretch',
                  height: '50px'
                }}
              >
                {submitting ? (
                  <>
                    <ClipLoader size={18} color="#ffffff" speedMultiplier={1.2} />
                    <span>Publication en cours...</span>
                  </>
                ) : (
                  <span>Publier l'annonce</span>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
