import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Modal, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ArrowLeft } from 'lucide-react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import CategoryPicker from '../components/CategoryPicker';
import ImagePickerComponent from '../components/ImagePicker';

type Props = NativeStackScreenProps<RootStackParamList, 'Publish'>;

const categories = ['Électronique', 'Vêtements', 'Maison', 'Livres', 'Autre'];
const conditions = ['Neuf', 'Comme neuf', 'Bon état', 'Correct'];

const AdSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Le titre ne doit pas dépasser 50 caractères')
    .required('Le titre est obligatoire'),
  description: Yup.string()
    .min(10, 'Veuillez écrire une description d\'au moins 10 caractères')
    .required('La description est obligatoire'),
  price: Yup.number()
    .typeError('Le prix doit être un nombre valide')
    .min(0.01, 'Le prix doit être supérieur à 0')
    .max(99999.99, 'Le prix ne peut pas dépasser 99999.99')
    .required('Le prix est obligatoire'),
  category: Yup.string().oneOf(categories).required('La catégorie est obligatoire'),
  condition: Yup.string().oneOf(conditions).required("L'état du produit est obligatoire"),
});

export default function PublishAdScreen({ navigation }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [imagesTouched, setImagesTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const imagesError = images.length === 0 ? 'Au moins une photo est obligatoire' : undefined;

  const handleSubmit = async (values: any) => {
    setImagesTouched(true);
    if (images.length === 0) {
      return;
    }

    setSubmitting(true);

    // Build mock FormData
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    
    images.forEach((uri, idx) => {
      const filename = uri.split('/').pop() || `photo-${idx}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append('photos', {
        uri,
        name: filename,
        type,
      } as any);
    });

    console.log('--- Soumission de l\'annonce (FormData Mobile) ---');
    console.log('Champs texte : ', values);
    console.log('Photos (URIs) : ', images);

    // Simulate 2 seconds of network request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitting(false);
    navigation.navigate('Success', {
      ad: {
        title: values.title,
        description: values.description,
        price: values.price.toString(),
        category: values.category,
        condition: values.condition,
      },
      images,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créer une annonce</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
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
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* Custom Image Picker Component */}
                <ImagePickerComponent
                  images={images}
                  onImagesChange={(newImages) => {
                    setImages(newImages);
                    setImagesTouched(true);
                  }}
                  error={imagesError}
                  touched={imagesTouched}
                />

                {/* Title */}
                <Input
                  label="Titre de l'annonce"
                  placeholder="Ex: iPhone 13 Pro Max - 256Go"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={errors.title}
                  touched={touched.title}
                  maxLength={50}
                />

                {/* Price */}
                <Input
                  label="Prix (DH)"
                  placeholder="Ex: 7500"
                  keyboardType="numeric"
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  error={errors.price}
                  touched={touched.price}
                />

                {/* Category Picker */}
                <CategoryPicker
                  label="Catégorie"
                  value={values.category}
                  options={categories}
                  onChangeValue={(val) => setFieldValue('category', val)}
                  error={errors.category}
                  touched={touched.category}
                />

                {/* Condition Picker */}
                <CategoryPicker
                  label="État du produit"
                  value={values.condition}
                  options={conditions}
                  onChangeValue={(val) => setFieldValue('condition', val)}
                  error={errors.condition}
                  touched={touched.condition}
                />

                {/* Description */}
                <Input
                  label="Description détaillée"
                  placeholder="Décrivez l'état de l'objet, ses caractéristiques, les accessoires fournis..."
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  error={errors.description}
                  touched={touched.description}
                  multiline
                  numberOfLines={4}
                />

                {/* Submit button */}
                <Button
                  title="Publier l'annonce"
                  onPress={handleSubmit}
                  style={styles.submitBtn}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Modal Overlay */}
      <Modal visible={submitting} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Publication en cours...</Text>
            <Text style={styles.loadingSubText}>Création de l'objet FormData et envoi sécurisé</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    backgroundColor: colors.white,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerRightPlaceholder: {
    width: 30,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  submitBtn: {
    marginTop: 10,
    width: '100%',
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  loadingSubText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
