'use client';

import React, { useState } from 'react';
import { AppStoreHeader } from '@/components/AppStoreHeader';
import { QuickCategoriesBar } from '@/components/QuickCategoriesBar';
import { TodayHeroStory } from '@/components/TodayHeroStory';
import { TrustBar } from '@/components/TrustBar';
import { TopChartsSection } from '@/components/TopChartsSection';
import { CuratedCollections } from '@/components/CuratedCollections';
import { AppCatalogSection } from '@/components/AppCatalogSection';
import { LifestyleSection } from '@/components/LifestyleSection';
import { BrandWall } from '@/components/BrandWall';
import { FaqAccordion } from '@/components/FaqAccordion';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'charts') {
      document.getElementById('charts-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'catalog') {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'brands') {
      document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--ios-bg)' }}>
      {/* App Store Frosted Glass Header */}
      <AppStoreHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchChange={q => setSearchQuery(q)}
      />

      {/* Quick Category Shortcuts */}
      <QuickCategoriesBar onSelectCategory={handleCategorySelect} />

      {/* Hero Offer + Vehicle Fitment Widget */}
      <TodayHeroStory onExploreCatalog={handleExploreCatalog} />

      {/* Shipping / Warranty / Returns / Support */}
      <TrustBar />

      {/* "Top Repuestos Más Populares" - Numbered Top Charts Ranking */}
      <TopChartsSection onSeeAll={handleExploreCatalog} />

      {/* "Colecciones Curadas" - Horizontal Systems Grid */}
      <CuratedCollections onSelectCategory={handleCategorySelect} />

      {/* App Store Catalog Explorer */}
      <AppCatalogSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
      />

      {/* Segments by Vehicle Lifestyle */}
      <LifestyleSection />

      {/* Certified Brand Wall */}
      <BrandWall />

      {/* Customer FAQs */}
      <FaqAccordion />
    </main>
  );
}
