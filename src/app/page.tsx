'use client';

import React, { useState } from 'react';
import { AppStoreHeader } from '@/components/AppStoreHeader';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CategoryShortcutRow } from '@/components/CategoryShortcutRow';
import { VehicleFitmentStrip } from '@/components/VehicleFitmentStrip';
import { TrustBar } from '@/components/TrustBar';
import { FeaturedProductsGrid } from '@/components/FeaturedProductsGrid';
import { AppCatalogSection } from '@/components/AppCatalogSection';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BrandWall } from '@/components/BrandWall';
import { PopularLinksSection } from '@/components/PopularLinksSection';
import { NewsletterSignup } from '@/components/NewsletterSignup';
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
      <AppStoreHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchChange={q => setSearchQuery(q)}
      />

      {/* 1. Promotional hero carousel */}
      <HeroCarousel onSelectCategory={handleCategorySelect} />

      {/* 2. Vehicle fitment selector — the core utility of a parts store */}
      <VehicleFitmentStrip />

      {/* 3. Category shortcut row */}
      <CategoryShortcutRow onSelectCategory={handleCategorySelect} />

      {/* 4. Service / value band */}
      <TrustBar />

      {/* 5. Featured product grid */}
      <ScrollReveal>
        <FeaturedProductsGrid onSeeAll={handleExploreCatalog} />
      </ScrollReveal>

      {/* 6. Full catalog with filters */}
      <ScrollReveal>
        <AppCatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />
      </ScrollReveal>

      {/* 7. Recently viewed — appears once the shopper has browsed */}
      <ScrollReveal>
        <RecentlyViewed />
      </ScrollReveal>

      {/* 8. Certified brands */}
      <ScrollReveal>
        <BrandWall />
      </ScrollReveal>

      {/* 9. Popular link columns */}
      <ScrollReveal>
        <PopularLinksSection onSelectCategory={handleCategorySelect} />
      </ScrollReveal>

      {/* 10. FAQ */}
      <ScrollReveal>
        <FaqAccordion />
      </ScrollReveal>

      {/* 11. Newsletter */}
      <ScrollReveal>
        <NewsletterSignup />
      </ScrollReveal>
    </main>
  );
}
