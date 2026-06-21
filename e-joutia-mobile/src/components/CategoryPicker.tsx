import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { ChevronDown, Check } from 'lucide-react-native';

interface CategoryPickerProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChangeValue: (val: string) => void;
  error?: string;
  touched?: boolean;
}

export default function CategoryPicker({
  label,
  value,
  options,
  placeholder = 'Sélectionner...',
  onChangeValue,
  error,
  touched,
}: CategoryPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const isInvalid = touched && !!error;

  const handleSelect = (item: string) => {
    onChangeValue(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={[
          styles.selector,
          isInvalid && styles.selectorInvalid,
        ]}
      >
        <Text style={[styles.selectorText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {isInvalid && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalDismiss} 
            activeOpacity={1} 
            onPress={() => setModalVisible(false)} 
          />
          <View style={styles.modalContent}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.header}>
                <View style={styles.indicator} />
                <Text style={styles.headerTitle}>{label}</Text>
              </View>

              <FlatList
                data={options}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => {
                  const isSelected = item === value;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleSelect(item)}
                      style={[
                        styles.optionItem,
                        isSelected && styles.optionItemSelected,
                      ]}
                    >
                      <Text style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}>
                        {item}
                      </Text>
                      {isSelected && <Check size={20} color={colors.primary} strokeWidth={2.5} />}
                    </TouchableOpacity>
                  );
                }}
              />
            </SafeAreaView>
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
    marginBottom: 6,
  },
  selector: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorInvalid: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  selectorText: {
    fontSize: 15,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalDismiss: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  safeArea: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  indicator: {
    width: 38,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.cardBorder,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  listContent: {
    paddingVertical: 8,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionItemSelected: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
