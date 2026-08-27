import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { GarageProvider } from '@/context/GarageContext';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailSheet } from '@/components/ProductDetailSheet';
import { GarageModal } from '@/components/GarageModal';
import { ToastNotification } from '@/components/ToastNotification';
import { AddedToCartPanel } from '@/components/AddedToCartPanel';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Haztap Store | Repuestos Automotrices & Alto Rendimiento',
  description:
    'Haztap AutoPartes: Experiencia digital estilo App Store para refacciones originales OEM y de alto rendimiento con garantía de ajuste 100%.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <GarageProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <ProductDetailSheet />
            <GarageModal />
            <ToastNotification />
            <AddedToCartPanel />
            <Footer />
          </CartProvider>
        </GarageProvider>
      </body>
    </html>
  );
}
