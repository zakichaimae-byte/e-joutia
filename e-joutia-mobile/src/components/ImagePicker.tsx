import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert, FlatList, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { Camera, Image as ImageIcon, X, Plus } from 'lucide-react-native';

interface ImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  error?: string;
  touched?: boolean;
}

export default function ImagePickerComponent({
  images,
  onImagesChange,
  error,
  touched,
}: ImagePickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const isInvalid = touched && !!error;

  const requestPermissions = async (type: 'camera' | 'library') => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'L\'application a besoin de la permission caméra pour prendre des photos.');
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'L\'application a besoin de la permission galerie pour importer des photos.');
        return false;
      }
    }
    return true;
  };

  const handleLaunchCamera = async () => {
    setModalVisible(false);
    const hasPermission = await requestPermissions('camera');
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newUri = result.assets[0].uri;
        if (images.length >= 5) {
          Alert.alert('Limite atteinte', 'Vous ne pouvez pas ajouter plus de 5 photos.');
          return;
        }
        onImagesChange([...images, newUri]);
      }
    } catch (e) {
      console.log('Error launching camera:', e);
      Alert.alert('Erreur', 'Impossible d\'ouvrir l\'appareil photo.');
    }
  };

  const handleLaunchLibrary = async () => {
    setModalVisible(false);
    const hasPermission = await requestPermissions('library');
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 5 - images.length,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newUris = result.assets.map(asset => asset.uri);
        const combined = [...images, ...newUris];
        if (combined.length > 5) {
          Alert.alert('Limite atteinte', 'Vous ne pouvez pas ajouter plus de 5 photos.');
          onImagesChange(combined.slice(0, 5));
        } else {
          onImagesChange(combined);
        }
      }
    } catch (e) {
      console.log('Error launching library:', e);
      Alert.alert('Erreur', 'Impossible d\'ouvrir la galerie.');
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onImagesChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Photos du produit (minimum 1, maximum 5)</Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Thumbnails */}
        {images.map((uri, idx) => (
          <View key={uri} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleRemovePhoto(idx)}
              style={styles.removeBtn}
            >
              <X size={14} color={colors.white} strokeWidth={2.5} />
            </TouchableOpacity>
            {idx === 0 && (
              <View style={styles.coverBadge}>
                <Text style={styles.coverText}>Principale</Text>
              </View>
            )}
          </View>
        ))}

        {/* Add photo card button */}
        {images.length < 5 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setModalVisible(true)}
            style={[
              styles.addBtn,
              isInvalid && styles.addBtnInvalid,
            ]}
          >
            <Plus size={24} color={colors.primary} strokeWidth={2.5} />
            <Text style={styles.addBtnText}>Ajouter ({images.length}/5)</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {isInvalid && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal image source selector */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalDismiss} 
            activeOpacity={1} 
            onPress={() => setModalVisible(false)} 
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter une photo</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLaunchCamera}
                style={styles.optionBox}
              >
                <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                  <Camera size={26} color={colors.primary} />
                </View>
                <Text style={styles.optionLabel}>Prendre une photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLaunchLibrary}
                style={styles.optionBox}
              >
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <ImageIcon size={26} color="hsl(217, 80%, 45%)" />
                </View>
                <Text style={styles.optionLabel}>Galerie photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardBorder,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.error,
    borderRadius: 12,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  coverBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    paddingVertical: 2,
    alignItems: 'center',
  },
  coverText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  addBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  addBtnInvalid: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 6,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalDismiss: {
    position: 'absolute',
    inset: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  closeModalBtn: {
    padding: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionBox: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
