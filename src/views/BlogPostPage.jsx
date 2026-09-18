import React from 'react';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogData';
import { Calendar, Clock, ArrowLeft, Share2, Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BlogPostPage = ({ postSlug, locale = 'es' }) => {
  const { setIsBookVipModalOpen } = useApp();
  const post = getBlogPostBySlug(postSlug);
  const isEs = locale === 'es';

  if (!post) {
    return (
      <div className="blog_not_found" style={{ textAlign: 'center', padding: '10rem 1rem', color: '#888' }}>
        <h2>{isEs ? 'Artículo no encontrado' : 'Article Not Found'}</h2>
        <a href={`/${locale}/blog/`} style={{ color: '#ff3b5c', marginTop: '1rem', display: 'inline-block' }}>
          {isEs ? '← Volver al Blog' : '← Back to Blog'}
        </a>
      </div>
    );
  }

  const postData = post[locale] || post.es;
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postData.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isEs ? '¡Enlace copiado al portapapeles!' : 'Link copied to clipboard!');
    }
  };

  return (
    <article className="blog_post_page">
      {/* Post Hero Header */}
      <header className="blog_post_hero">
        <div className="py">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="blog_breadcrumbs">
            <a href={`/${locale}/`}>{isEs ? 'Inicio' : 'Home'}</a>
            <span>/</span>
            <a href={`/${locale}/blog/`}>Blog</a>
            <span>/</span>
            <span className="current">{post.category}</span>
          </nav>

          <div className="blog_post_hero_content">
            <span className="blog_post_badge">{post.category}</span>
            <h1 className="blog_post_h1">{postData.title}</h1>

            <div className="blog_post_meta_bar">
              <div className="blog_post_author_info">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="blog_author_avatar"
                />
                <div>
                  <div className="blog_author_name">{post.author.name}</div>
                  <div className="blog_author_role">{post.author.role}</div>
                </div>
              </div>

              <div className="blog_post_details">
                <span><Calendar size={13} /> {post.date}</span>
                <span>•</span>
                <span><Clock size={13} /> {post.readTime}</span>
              </div>

              <button 
                type="button" 
                onClick={handleShare}
                className="blog_share_btn"
                title={isEs ? 'Compartir artículo' : 'Share article'}
              >
                <Share2 size={15} />
                <span>{isEs ? 'Compartir' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="blog_post_cover_wrapper">
        <img 
          src={post.coverImage} 
          alt={postData.title} 
          className="blog_post_cover_img"
        />
      </div>

      {/* Post Body Content */}
      <div className="blog_post_body_container">
        <div className="blog_post_body">
          <p className="blog_post_lead">
            {postData.excerpt}
          </p>

          <div className="blog_post_text">
            {postData.content.map((block, idx) => {
              if (block.type === 'heading') {
                return <h2 key={idx} className="blog_content_h2">{block.text}</h2>;
              }
              return <p key={idx} className="blog_content_p">{block.text}</p>;
            })}
          </div>

          {/* Inline CTA Box */}
          <div className="blog_cta_box">
            <div className="blog_cta_glow"></div>
            <div className="blog_cta_content">
              <div className="blog_cta_badge">
                <Crown size={14} color="#ff3b5c" />
                <span>{isEs ? 'EXPERIENCIA VIP ARRIVE' : 'ARRIVE VIP EXPERIENCE'}</span>
              </div>
              <h3>{isEs ? '¿Planeas tu Noche en Panamá?' : 'Planning Your Night in Panama?'}</h3>
              <p>
                {isEs
                  ? 'Accede a pases digitales de cortesía con barra libre para chicas o reserva tu mesa VIP con atención personalizada.'
                  : 'Get complimentary digital guest list passes or secure a VIP table with dedicated bottle service.'}
              </p>
              <div className="blog_cta_actions">
                <a href={`/${locale}/`} className="btn-primary" style={{ textDecoration: 'none' }}>
                  {isEs ? 'Ver Pases Semanales' : 'Browse Passes'}
                </a>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsBookVipModalOpen(true)}
                >
                  <Crown size={15} />
                  <span>{isEs ? 'Reservar Mesa VIP' : 'Book VIP Table'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="blog_related_section">
            <h3 className="blog_related_title">{isEs ? 'Artículos Relacionados' : 'Related Articles'}</h3>
            <div className="blog_related_grid">
              {relatedPosts.map(rel => {
                const relData = rel[locale] || rel.es;
                return (
                  <a key={rel.id} href={`/${locale}/blog/${rel.slug}/`} className="blog_related_card">
                    <img src={rel.coverImage} alt={relData.title} className="blog_related_img" />
                    <div>
                      <span className="blog_related_cat">{rel.category}</span>
                      <h4 className="blog_related_card_title">{relData.title}</h4>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
