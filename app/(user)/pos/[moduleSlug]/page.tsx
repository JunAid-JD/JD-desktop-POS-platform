'use client';

import { useParams } from 'next/navigation';
import { PharmacyPOS } from '@/components/pos/PharmacyPOS';
import { GroceryPOS } from '@/components/pos/GroceryPOS';
import { ClothingPOS } from '@/components/pos/ClothingPOS';
import { ElectronicsPOS } from '@/components/pos/ElectronicsPOS';
import { RestaurantPOS } from '@/components/pos/RestaurantPOS';
import { StationeryPOS } from '@/components/pos/StationeryPOS';
import { MobilePOS } from '@/components/pos/MobilePOS';

export default function ModulePOSPage() {
  const { moduleSlug } = useParams();

  const renderPOSModule = () => {
    switch (moduleSlug) {
      case 'pharmacy':
        return <PharmacyPOS />;
      case 'grocery':
        return <GroceryPOS />;
      case 'clothing':
        return <ClothingPOS />;
      case 'electronics':
        return <ElectronicsPOS />;
      case 'restaurant':
        return <RestaurantPOS />;
      case 'stationery':
        return <StationeryPOS />;
      case 'mobile':
        return <MobilePOS />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600">Module not found</h2>
            <p className="text-gray-500 mt-2">The requested POS module does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPOSModule()}
    </div>
  );
}