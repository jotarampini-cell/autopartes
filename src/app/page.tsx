'use client';

import React, { useState, useMemo } from 'react';
import { AppStoreHeader } from '@/components/AppStoreHeader';
import { HeroCarousel } from '@/components/HeroCarousel';
import { CategoryShortcutRow } from '@/components/CategoryShortcutRow';
import { CategoryTileGrid } from '@/components/CategoryTileGrid';
import { VehicleFitmentStrip } from '@/components/VehicleFitmentStrip';
import { TrustBar } from '@/components/TrustBar';
import { ProductCarousel } from '@/components/ProductCarousel';
import { AppCatalogSection } from '@/components/AppCatalogSection';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BrandWall } from '@/components/BrandWall';
import { PopularLinksSection } from '@/components/PopularLinksSection';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PRODUCTS } from '@/data/autoparts-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Themed rows, each drawing a different slice so the page keeps
  // offering something new as the shopper scrolls.
  const rows = useMemo(() => {
    const discounted = PRODUCTS.filter(p => p.originalPrice)
      .map(p => ({ p, off: (p.originalPrice! - p.price) / p.originalPrice! }))
      .sort((a, b) => b.off - a.off)
      .map(x => x.p);

    return {
      bestSellers: [...PRODUCTS].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 12),
      deals: discounted.slice(0, 12),
      topRated: PRODUCTS.filter(p => p.rating >= 4.7)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12),
      maintenance: PRODUCTS.filter(p =>
        ['filtros', 'motor', 'refrigeracion'].includes(p.category)
      ).slice(0, 12),
      brakesAndSuspension: PRODUCTS.filter(p =>
        ['frenos', 'suspension'].includes(p.category)
      ).slice(0, 12),
      upgrades: PRODUCTS.filter(p =>
        ['iluminacion', 'escape', 'electrico'].includes(p.category)
      ).slice(0, 12),
      underFifty: PRODUCTS.filter(p => p.price < 50)
        .sort((a, b) => a.price - b.price)
        .slice(0, 12),
    };
  }, []);

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

      {/* 4. Department tiles — dense entry points above the fold */}
      <CategoryTileGrid onSelectCategory={handleCategorySelect} />

      {/* 5. Best sellers, ranked */}
      <ScrollReveal>
        <ProductCarousel
          title="Los más vendidos"
          products={rows.bestSellers}
          onSeeAll={handleExploreCatalog}
          ranked
        />
      </ScrollReveal>

      {/* 6. Service / value band */}
      <TrustBar />

      {/* 7. Deal-driven rows */}
      <ScrollReveal>
        <ProductCarousel
          title="Ofertas del día"
          products={rows.deals}
          onSeeAll={handleExploreCatalog}
          seeAllLabel="Ver todas las ofertas"
        />
      </ScrollReveal>

      <ScrollReveal>
        <ProductCarousel
          title="Frenos y suspensión"
          products={rows.brakesAndSuspension}
          onSeeAll={() => handleCategorySelect('frenos')}
        />
      </ScrollReveal>

      <ScrollReveal>
        <ProductCarousel
          title="Mantenimiento programado"
          products={rows.maintenance}
          onSeeAll={() => handleCategorySelect('filtros')}
        />
      </ScrollReveal>

      {/* 8. Recently viewed — appears once the shopper has browsed */}
      <ScrollReveal>
        <RecentlyViewed />
      </ScrollReveal>

      <ScrollReveal>
        <ProductCarousel
          title="Mejoras para tu vehículo"
          products={rows.upgrades}
          onSeeAll={() => handleCategorySelect('iluminacion')}
        />
      </ScrollReveal>

      <ScrollReveal>
        <ProductCarousel
          title="Mejor calificados"
          products={rows.topRated}
          onSeeAll={handleExploreCatalog}
        />
      </ScrollReveal>

      <ScrollReveal>
        <ProductCarousel
          title="Menos de $50"
          products={rows.underFifty}
          onSeeAll={handleExploreCatalog}
        />
      </ScrollReveal>

      {/* 9. Full catalog with filters */}
      <ScrollReveal>
        <AppCatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />
      </ScrollReveal>

      {/* 10. Certified brands */}
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
