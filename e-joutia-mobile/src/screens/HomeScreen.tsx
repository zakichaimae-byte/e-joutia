import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { Laptop, Shirt, Home as HomeIcon, BookOpen, Search, Plus, Sliders, MapPin } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const categories = [
  { name: 'Électronique', Icon: Laptop, color: '#3b82f6' },
  { name: 'Vêtements', Icon: Shirt, color: '#ec4899' },
  { name: 'Maison', Icon: HomeIcon, color: '#10b981' },
  { name: 'Livres', Icon: BookOpen, color: '#f59e0b' },
];

const mockProducts = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max - 256Go',
    price: '7,800 DH',
    location: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1632649680682-7507851a899b?w=400&q=80',
    category: 'Électronique',
  },
  {
    id: '2',
    title: 'Veste en cuir vintage',
    price: '450 DH',
    location: 'Rabat',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    category: 'Vêtements',
  },
  {
    id: '3',
    title: 'Machine à café Nespresso',
    price: '1,200 DH',
    location: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80',
    category: 'Maison',
  },
  {
    id: '4',
    title: 'Collection de livres SF',
    price: '200 DH',
    location: 'Tanger',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
    category: 'Livres',
  },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>e-joutia</Text>
          <View style={styles.locationBadge}>
            <MapPin size={14} color={colors.primary} />
            <Text style={styles.locationText}>Maroc</Text>
          </View>
        </View>

        {/* Search Bar Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color={colors.textMuted} style={styles.searchIcon} />
            <TextInput
              placeholder="Que recherchez-vous aujourd'hui ?"
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.filterBtn}>
            <Sliders size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Vendez vos objets en quelques secondes</Text>
              <Text style={styles.heroSubtitle}>Publiez des annonces gratuitement avec des photos de qualité.</Text>
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <View style={styles.categoriesRow}>
              {categories.map((cat) => (
                <TouchableOpacity key={cat.name} activeOpacity={0.7} style={styles.catCard}>
                  <View style={[styles.catIconContainer, { backgroundColor: cat.color + '15' }]}>
                    <cat.Icon size={24} color={cat.color} />
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Ads Grid */}
          <View style={[styles.section, { marginBottom: 80 }]}>
            <Text style={styles.sectionTitle}>Annonces récentes</Text>
            <View style={styles.gridContainer}>
              {mockProducts.map((item) => (
                <View key={item.id} style={styles.productCard}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.productTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.productLocation}>
                      <MapPin size={10} color={colors.textMuted} />
                      <Text style={styles.productLocationText}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Floating Action CTA Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Publish')}
          style={styles.floatingBtn}
        >
          <Plus size={20} color={colors.white} strokeWidth={3} />
          <Text style={styles.floatingBtnText}>Créer une annonce</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  heroBanner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  heroTextContainer: {
    maxWidth: '85%',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 24,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catCard: {
    alignItems: 'center',
    flex: 1,
  },
  catIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  catName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.background,
  },
  productDetails: {
    padding: 12,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  productLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productLocationText: {
    fontSize: 10,
    color: colors.textMuted,
    marginLeft: 3,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  floatingBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});
