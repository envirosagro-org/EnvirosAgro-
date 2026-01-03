import { GreenLensHero } from '@/components/greenlens/GreenLensHero';
import { FeaturedDoc } from '@/components/greenlens/FeaturedDoc';
import { DocCategories } from '@/components/greenlens/DocCategories';
import { DocsLibrary } from '@/components/greenlens/DocsLibrary';
import { FilmStrip } from '@/components/greenlens/FilmStrip';
import { ImpactSection } from '@/components/greenlens/ImpactSection';

const GreenLensPage = () => {
  return (
    <div className="bg-gray-900">
        <GreenLensHero />
        <FeaturedDoc />
        <DocCategories />
        <DocsLibrary />
        <FilmStrip />
        <ImpactSection />
    </div>
  );
};

export default GreenLensPage;