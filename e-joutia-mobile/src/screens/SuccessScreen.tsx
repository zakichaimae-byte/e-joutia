import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { CheckCircle2, Tag, Banknote, Camera, Home as HomeIcon, Eye, Plus } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export default function SuccessScreen({ route, navigation }: Props) {
  const { ad, images } = route.params;

  const handleViewAd = () => {
    navigation.navigate('AdDetail', { ad, images });
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleNewAd = () => {
    navigation.navigate('Publish');
  };

  const formattedPrice = Number(ad.price).toLocaleString('fr-MA') + ' DH';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Animated/Pulse Glow Checkmark */}
          <View style={styles.checkmarkOuter}>
            <View style={styles.checkmarkInner}>
              <CheckCircle2 size={56} color={colors.success} strokeWidth={2} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.successTitle}>Annonce publiée avec succès !</Text>
          <Text style={styles.successSubtitle}>
            Votre annonce a été mise en ligne et est désormais visible par la communauté d'e-joutia.
          </Text>

          {/* Title Highlight */}
          <View style={styles.titleHighlight}>
            <Text style={styles.highlightText} numberOfLines={1}>
              « {ad.title} »
            </Text>
          </View>

          {/* Summary Stats */}
          <View style={styles.statsContainer}>
            {/* Stat: Category */}
            <View style={styles.statBox}>
              <View style={styles.statIconWrapper}>
                <Tag size={20} color={colors.primary} />
              </View>
              <Text style={styles.statLabel}>Catégorie</Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {ad.category}
              </Text>
            </View>

            {/* Stat: Price */}
            <View style={styles.statBox}>
              <View style={styles.statIconWrapper}>
                <Banknote size={20} color={colors.primary} />
              </View>
              <Text style={styles.statLabel}>Prix</Text>
              <Text style={styles.statValue} numberOfLines={1}>
                {formattedPrice}
              </Text>
            </View>

            {/* Stat: Photos */}
            <View style={styles.statBox}>
              <View style={styles.statIconWrapper}>
                <Camera size={20} color={colors.primary} />
              </View>
              <Text style={styles.statLabel}>Photos</Text>
              <Text style={styles.statValue}>
                {images.length}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <Button
              title="Voir mon annonce"
              onPress={handleViewAd}
              icon={<Eye size={18} color={colors.white} />}
              style={styles.actionBtn}
            />

            <View style={styles.buttonRow}>
              <Button
                title="Accueil"
                type="secondary"
                onPress={handleGoHome}
                icon={<HomeIcon size={16} color={colors.text} />}
                style={[styles.actionBtnHalf, { marginRight: 10 }]}
              />

              <Button
                title="Nouvelle"
                type="secondary"
                onPress={handleNewAd}
                icon={<Plus size={16} color={colors.text} />}
                style={styles.actionBtnHalf}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '90%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  checkmarkOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkmarkInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  titleHighlight: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  highlightText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statIconWrapper: {
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  actionContainer: {
    width: '100%',
    gap: 12,
  },
  actionBtn: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  actionBtnHalf: {
    flex: 1,
  },
});
