import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GUIDE_CATEGORIES } from '../data/guidesData';
import { getGuidesPage, guidesInCategory, categoryUrl, getGuideById, HUB_COPY } from '../seo/guides';
import { GuideArticle } from '../components/guides/GuideArticle';
import { Breadcrumbs, CategoryChips, GuideCard, GuideCtas } from '../components/guides/GuideParts';

const HubPage = ({ page }) => {
  const featured = getGuideById('A01');
  const spotlight = ['A04', 'A17', 'A11'].map(getGuideById);
  return (
    <div className="gd_listing">
      <header className="gd_wrap gd_listing_head">
        <Breadcrumbs items={page.breadcrumbs} />
        <h1 className="gd_title">{page.h1}</h1>
        <p className="gd_listing_intro">{HUB_COPY.intro}</p>
        <CategoryChips />
      </header>

      <section className="gd_wrap gd_feature_row" aria-label="Guías destacadas">
        <GuideCard guide={featured} variant="feature" />
        <div className="gd_feature_side">
          {spotlight.map((g) => <GuideCard key={g.id} guide={g} variant="compact" />)}
        </div>
      </section>

      {GUIDE_CATEGORIES.map((c) => (
        <section key={c.slug} className="gd_wrap gd_cat_section" aria-labelledby={`cat-${c.slug}`}>
          <div className="gd_cat_head">
            <div>
              <h2 id={`cat-${c.slug}`}><a href={categoryUrl(c)}>{c.name}</a></h2>
              <p>{c.description}</p>
            </div>
            <a href={categoryUrl(c)} className="gd_more">Ver {guidesInCategory(c).length} guías <ArrowRight size={14} /></a>
          </div>
          <div className="gd_grid">
            {guidesInCategory(c).map((g) => <GuideCard key={g.id} guide={g} />)}
          </div>
        </section>
      ))}

      <section className="gd_wrap gd_cat_section">
        <GuideCtas keys={['agenda', 'venues', 'concierge']} />
        <p className="gd_disclaimer">{HUB_COPY.note}</p>
      </section>
    </div>
  );
};

const CategoryPage = ({ page }) => (
  <div className="gd_listing">
    <header className="gd_wrap gd_listing_head">
      <Breadcrumbs items={page.breadcrumbs} />
      <h1 className="gd_title">{page.h1}</h1>
      <p className="gd_listing_intro">{page.description}</p>
      <CategoryChips active={page.category.slug} />
    </header>
    <section className="gd_wrap gd_cat_section">
      <div className="gd_grid">
        {page.guides.map((g) => <GuideCard key={g.id} guide={g} />)}
      </div>
    </section>
    <section className="gd_wrap gd_cat_section">
      <GuideCtas keys={page.category.name === 'Nightlife' ? ['agenda', 'vip', 'venues'] : ['agenda', 'concierge']} />
      <p className="gd_disclaimer">{HUB_COPY.note}</p>
    </section>
  </div>
);

export const GuidesPage = ({ pathname }) => {
  const page = getGuidesPage(pathname);
  if (!page) return null;
  return (
    <main className="gd_page">
      {page.kind === 'hub' && <HubPage page={page} />}
      {page.kind === 'category' && <CategoryPage page={page} />}
      {page.kind === 'article' && <GuideArticle page={page} />}
    </main>
  );
};

export default GuidesPage;
