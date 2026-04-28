import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { blogPostsMeta } from '../data/blog';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Markdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  
  const postMeta = blogPostsMeta.find(p => p.slug === slug);
  
  if (!postMeta) {
    return <Navigate to="/blog" replace />;
  }

  const title = t(`blogPosts.${postMeta.slug}.title`);
  const excerpt = t(`blogPosts.${postMeta.slug}.excerpt`);
  const content = t(`blogPosts.${postMeta.slug}.content`);

  return (
    <>
      <SEO 
        title={`${title} | Stan na Dan Čačak Centar`}
        description={excerpt}
      />
      
      <article className="pb-20 md:pb-32">
        {/* Header Hero */}
        <div className="relative h-[60vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={postMeta.image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-16 text-center text-white">
            <Link to="/blog" className="inline-flex items-center text-[10px] uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-8 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blogList.breadcrumbs')}
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
              {title}
            </h1>
            
            <div className="flex justify-center items-center text-[11px] uppercase tracking-widest font-bold opacity-80 space-x-6">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(postMeta.date), 'dd.MM.yyyy.')}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {postMeta.readTime} {t('blogList.readTime')}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
          <div className="prose prose-lg prose-neutral md:prose-xl mx-auto
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-primary
            prose-a:text-accent hover:prose-a:text-primary
            prose-strong:font-bold prose-strong:text-primary
            prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8
            prose-li:font-light prose-li:text-gray-600
            prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-gray-500
          ">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </article>
    </>
  );
}
