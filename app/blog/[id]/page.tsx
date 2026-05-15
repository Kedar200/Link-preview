import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
  enhanceBlogHtml,
  getBlogBySlugOrId,
  getBlogDate,
  getBlogDescription,
  getBlogPath,
  getBlogs,
} from '@/lib/blogs';
import { getSiteUrl } from '@/lib/site';

type BlogPostParams = {
  params: Promise<{ id: string }>;
};

function formatDate(value: string) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({ id: blog.slug }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogBySlugOrId(id);

  if (!blog) {
    return {
      title: 'Blog Not Found - LinkPeek',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getBlogDescription(blog);
  const path = getBlogPath(blog);

  return {
    title: `${blog.title} - LinkPeek Blog`,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: blog.title,
      description,
      type: 'article',
      url: path,
      publishedTime: blog.publishedAt || blog.createdAt,
      modifiedTime: blog.updatedAt,
      images: blog.coverImageUrl
        ? [
            {
              url: blog.coverImageUrl,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: blog.coverImageUrl ? 'summary_large_image' : 'summary',
      title: blog.title,
      description,
      images: blog.coverImageUrl ? [blog.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { id } = await params;
  const blog = await getBlogBySlugOrId(id);

  if (!blog) {
    notFound();
  }

  if (id !== blog.slug) {
    redirect(getBlogPath(blog));
  }

  const content = enhanceBlogHtml(blog.htmlContent || '<p>No content available.</p>');
  const publishedDate = getBlogDate(blog);
  const formattedDate = formatDate(publishedDate);
  const articleUrl = `${getSiteUrl()}${getBlogPath(blog)}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: getBlogDescription(blog),
    image: blog.coverImageUrl ? [blog.coverImageUrl] : undefined,
    datePublished: blog.publishedAt || blog.createdAt || undefined,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt || undefined,
    author: {
      '@type': 'Organization',
      name: blog.author || 'LinkPeek',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LinkPeek',
      logo: {
        '@type': 'ImageObject',
        url: `${getSiteUrl()}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#1a2b21] selection:bg-[#dce6dd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-[#1a2b21]/10 bg-[#1a2b21] text-[#f4f0e6]">
        <div className="mx-auto w-full max-w-[980px] px-6 pb-14 pt-8 sm:px-10 lg:px-12">
          <nav className="mb-14 flex items-center justify-between">
            <Link href="/blog" className="text-sm font-medium text-[#dce6dd]/75 transition-colors hover:text-[#f4f0e6]">
              &lt;- Blog
            </Link>
            <Link href="/" className="text-sm font-medium text-[#dce6dd]/75 transition-colors hover:text-[#f4f0e6]">
              Open app
            </Link>
          </nav>

          <header>
            {formattedDate && (
              <time dateTime={publishedDate} className="label-sm text-[#dce6dd]/65">
                {formattedDate}
              </time>
            )}
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#dce6dd]/78">
              {getBlogDescription(blog)}
            </p>
          </header>
        </div>
      </section>

      {blog.coverImageUrl && (
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-10 sm:px-10 lg:px-12">
          <div className="overflow-hidden rounded-lg border border-[#1a2b21]/10 bg-[#dce6dd] shadow-[0_18px_60px_rgba(26,43,33,0.08)]">
            <img src={blog.coverImageUrl} alt="" className="aspect-[16/9] h-full w-full object-cover" />
          </div>
        </div>
      )}

      <article
        className="mx-auto max-w-[820px] px-6 py-12 text-lg leading-8 text-[#263a2e] sm:px-10 lg:px-12 lg:py-16
          [&_a]:font-medium [&_a]:text-[#1a2b21] [&_a]:underline [&_a]:decoration-[#4f6f5b]/35 [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-[#4f6f5b]
          [&_blockquote]:my-10 [&_blockquote]:rounded-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[#4f6f5b] [&_blockquote]:bg-white [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:text-[#1a2b21]
          [&_code]:rounded [&_code]:bg-[#dce6dd] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-[#1a2b21]
          [&_h1]:mb-5 [&_h1]:mt-12 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-[#1a2b21]
          [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#1a2b21]
          [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-[#1a2b21]
          [&_img]:my-10 [&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-[#1a2b21]/10
          [&_li]:mb-2 [&_ol]:mb-7 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:mb-7 [&_pre]:mb-8 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#1a2b21] [&_pre]:p-5 [&_pre]:text-[#f4f0e6] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-[#1a2b21] [&_ul]:mb-7 [&_ul]:list-disc [&_ul]:pl-7"
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}
