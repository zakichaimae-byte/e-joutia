import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export default function Input({ label, error, touched, style, ...props }: InputProps) {
  const isInvalid = touched && !!error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          props.multiline && styles.multiline,
          isInvalid && styles.inputInvalid,
          style,
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {isInvalid && <Text style={styles.errorText}>{error}</Text>}
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
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    color: colors.text,
  },
  multiline: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  inputInvalid: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
    fontWeight: '500',
  },
});
