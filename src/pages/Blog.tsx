import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { blogPostsMeta } from '../data/blog';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Blog() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <SEO 
        title={t('blogList.seoTitle')}
        description={t('blogList.seoDesc')}
      />
      
      <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <nav className="mb-6 flex justify-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>{t('blogList.breadcrumbs')}</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">{t('blogList.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light italic">{t('blogList.subtitle')}</p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {blogPostsMeta.map((post) => (
              <article key={post.id} className="group flex flex-col">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-[4/3] mb-6">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                  <img 
                    src={post.image} 
                    alt={t(`blogPosts.${post.slug}.title`)} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      {format(new Date(post.date), 'dd.MM.yyyy.')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-2" />
                      {post.readTime} {t('blogList.readTime')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif text-primary mb-4 group-hover:text-accent transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {t(`blogPosts.${post.slug}.title`)}
                    </Link>
                  </h2>
                  <p className="text-gray-500 font-light italic mb-6 leading-relaxed flex-1">
                    {t(`blogPosts.${post.slug}.excerpt`)}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-primary group-hover:text-accent transition-colors mt-auto"
                  >
                    {t('blogList.readMore')}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
