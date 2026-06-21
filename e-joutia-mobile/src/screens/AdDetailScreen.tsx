import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { colors } from '../theme/colors';
import { ArrowLeft, Plus, Camera, Tag, Sparkles, Coins, Pencil, Home as HomeIcon } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'AdDetail'>;

const { width } = Dimensions.get('window');
const carouselHeight = 280;

const conditionColors: Record<string, { bg: string; color: string }> = {
  'Neuf': { bg: 'rgba(16, 185, 129, 0.1)', color: 'hsl(142, 70%, 35%)' },
  'Comme neuf': { bg: 'rgba(59, 130, 246, 0.1)', color: 'hsl(217, 80%, 45%)' },
  'Bon état': { bg: 'rgba(245, 158, 11, 0.1)', color: 'hsl(38, 90%, 38%)' },
  'Correct': { bg: 'rgba(239, 68, 68, 0.1)', color: 'hsl(350, 80%, 50%)' },
};

export default function AdDetailScreen({ route, navigation }: Props) {
  const { ad, images } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const condStyle = conditionColors[ad.condition] || { bg: '#e2e8f0', color: colors.textSecondary };
  const formattedPrice = Number(ad.price).toLocaleString('fr-MA', { minimumFractionDigits: 2 }) + ' DH';

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeImageIndex) {
      setActiveImageIndex(roundIndex);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aperçu de l'annonce</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Publish')} style={styles.headerBtn}>
          <Plus size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Photo Gallery */}
        {images.length > 0 ? (
          <View style={styles.carouselContainer}>
            <FlatList
              data={images}
              keyExtractor={(item) => item}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.carouselImage} />
              )}
            />
            
            {/* Index indicator overlay */}
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorText}>
                {activeImageIndex + 1} / {images.length}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.noImageContainer}>
            <Camera size={48} color={colors.textMuted} strokeWidth={1.5} />
            <Text style={styles.noImageText}>Aucune photo disponible</Text>
          </View>
        )}

        <View style={styles.detailsContainer}>
          {/* Status and Category row */}
          <View style={styles.badgeRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>En ligne</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.badgeText}>{ad.category}</Text>
            </View>
            <View style={[styles.conditionBadge, { backgroundColor: condStyle.bg }]}>
              <Text style={[styles.conditionText, { color: condStyle.color }]}>{ad.condition}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{ad.title}</Text>

          {/* Price */}
          <Text style={styles.price}>{formattedPrice}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{ad.description}</Text>
          </View>

          {/* Specifications Table */}
          <View style={styles.specTable}>
            {[
              { label: 'Catégorie', value: ad.category, Icon: Tag },
              { label: 'État', value: ad.condition, Icon: Sparkles },
              { label: 'Prix', value: `${Number(ad.price).toLocaleString('fr-MA')} DH`, Icon: Coins },
              { label: 'Photos', value: `${images.length} photo(s)`, Icon: Camera },
            ].map((row, i, arr) => (
              <View 
                key={row.label} 
                style={[
                  styles.specRow, 
                  i < arr.length - 1 && styles.specRowDivider
                ]}
              >
                <View style={styles.specLabelWrapper}>
                  <row.Icon size={16} color={colors.textMuted} strokeWidth={2} />
                  <Text style={styles.specLabel}>{row.label}</Text>
                </View>
                <Text style={styles.specValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          {/* Action CTAs */}
          <View style={styles.btnRow}>
            <Button
              title="Modifier"
              type="secondary"
              onPress={() => navigation.goBack()}
              icon={<Pencil size={16} color={colors.text} />}
              style={styles.modifyBtn}
            />
            <Button
              title="Accueil"
              onPress={() => navigation.navigate('Home')}
              icon={<HomeIcon size={16} color={colors.white} />}
              style={styles.homeBtn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  carouselContainer: {
    width: width,
    height: carouselHeight,
    position: 'relative',
    backgroundColor: colors.black,
  },
  carouselImage: {
    width: width,
    height: carouselHeight,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  indicatorText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  noImageContainer: {
    width: width,
    height: 200,
    backgroundColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
    textTransform: 'uppercase',
  },
  categoryBadge: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 26,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  specTable: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  specRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  specLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modifyBtn: {
    flex: 1,
  },
  homeBtn: {
    flex: 1.5,
  },
});
