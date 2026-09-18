import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Search } from 'lucide-react';

export const BlogListPage = ({ locale = 'es' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isEs = locale === 'es';

  const categories = [
    { key: 'all', label: isEs ? 'TODOS LOS ARTÍCULOS' : 'ALL ARTICLES' },
    { key: 'Nightlife Guide', label: isEs ? 'GUÍAS NIGHTLIFE' : 'NIGHTLIFE GUIDES' },
    { key: 'VIP Experience', label: isEs ? 'EXPERIENCIA VIP' : 'VIP EXPERIENCE' },
    { key: 'Rooftops & Bars', label: isEs ? 'ROOFTOPS & BARES' : 'ROOFTOPS & BARS' }
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const postData = post[locale] || post.es;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      postData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      postData.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog_list_page">
      {/* Centered Hero */}
      <header className="section_home_hero blog_hero_section" aria-label="Blog Hero">
        <div className="py">
          <div className="home_hero_wrapper">
            <div className="heading_flex">
              <div className="hero_title_row">
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/heart.gif" 
                  alt="Corazón Arrive Izquierda" 
                  className="heart_title_flame left" 
                  width="60"
                  height="60"
                />
                <h1 className="is-center hero_title_text">
                  {isEs ? 'BLOG & GUÍA VIP PANAMÁ' : 'PANAMA VIP NIGHTLIFE BLOG'}
                </h1>
                <img 
                  loading="eager" 
                  fetchPriority="high"
                  src="/images/heart.gif" 
                  alt="Corazón Arrive Derecha" 
                  className="heart_title_flame right" 
                  width="60"
                  height="60"
                />
              </div>

              <div className="hero_subtitle_emojis">
                <span>{isEs ? '📖 GUÍAS DE EXPERIENCIA' : '📖 EXPERIENCE GUIDES'}</span>
                <span className="hero_sub_dot">•</span>
                <span>{isEs ? '🍸 CONSEJOS VIP' : '🍸 VIP TIPS'}</span>
                <span className="hero_sub_dot">•</span>
                <span>{isEs ? '🌆 CASCO ANTIGUO SECRETS' : '🌆 CASCO VIEJO SECRETS'}</span>
              </div>

              <p className="hero_page_centered_desc">
                {isEs
                  ? 'Artículos editoriales, tendencias de moda nocturna, guías de discotecas y secretos de hospitalidad en Ciudad de Panamá.'
                  : 'Editorial articles, nightlife fashion trends, clubbing guides, and hospitality insights in Panama City.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="blog_content_container">
        {/* Category Pills & Search */}
        <div className="blog_filter_bar">
          <div className="blog_categories_scroll">
            {categories.map(cat => (
              <button
                key={cat.key}
                type="button"
                className={`blog_category_pill ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="blog_search_wrapper">
            <Search size={16} color="#888888" />
            <input
              type="text"
              placeholder={isEs ? 'Buscar artículos...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog_search_input"
              aria-label="Buscar en el blog"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="blog_grid">
          {filteredPosts.map(post => {
            const postData = post[locale] || post.es;
            return (
              <article key={post.id} className="blog_card">
                <a href={`/${locale}/blog/${post.slug}/`} className="blog_card_link">
                  <div className="blog_card_img_wrap">
                    <img 
                      src={post.coverImage} 
                      alt={postData.title} 
                      className="blog_card_img"
                      loading="lazy"
                    />
                    <div className="blog_card_tag">
                      {post.category}
                    </div>
                  </div>

                  <div className="blog_card_body">
                    <div className="blog_card_meta">
                      <span><Calendar size={12} /> {post.date}</span>
                      <span>•</span>
                      <span><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h2 className="blog_card_title">{postData.title}</h2>
                    <p className="blog_card_excerpt">{postData.excerpt}</p>

                    <div className="blog_card_footer">
                      <div className="blog_card_author">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="blog_author_avatar"
                        />
                        <span>{post.author.name}</span>
                      </div>

                      <div className="blog_card_read_more">
                        <span>{isEs ? 'Leer' : 'Read'}</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
