import type { Metadata } from 'next';
import Link from 'next/link';
import BlogMasonryGrid, { type BlogMasonryPost } from '@/components/BlogMasonryGrid';
import {
  type BlogPost,
  getBlogById,
  getBlogDate,
  getBlogPath,
  getBlogs,
} from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blog - LinkPeek',
  description:
    'Practical articles about Open Graph previews, social sharing cards, and making links look right before you ship.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'LinkPeek Blog',
    description:
      'Practical articles about Open Graph previews, social sharing cards, and making links look right before you ship.',
    type: 'website',
    url: '/blog',
  },
};

function formatDate(value: string) {
  if (!value) return 'Recently published';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently published';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function cleanDescriptionForCard(description: string | undefined, title: string) {
  if (!description) return undefined;

  let cleaned = description.replace(/\s+/g, ' ').trim();
  const normalizedTitle = title.replace(/\s+/g, ' ').trim();

  if (normalizedTitle && cleaned.toLowerCase().startsWith(normalizedTitle.toLowerCase())) {
    cleaned = cleaned.slice(normalizedTitle.length).trim();
  }

  cleaned = cleaned
    .replace(/^\?*\s*(\[[^\]]+\])?\s*/g, '')
    .replace(/^[\s:;-]+/g, '')
    .trim();

  return cleaned || undefined;
}

function getOptionalBlogDescription(post: BlogPost) {
  const explicitDescription = post.description || post.excerpt;
  if (explicitDescription) return cleanDescriptionForCard(explicitDescription, post.title);

  const text = (post.htmlContent ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const cleaned = cleanDescriptionForCard(text, post.title);
  return cleaned ? `${cleaned.slice(0, 165)}${cleaned.length > 165 ? '...' : ''}` : undefined;
}

export default async function BlogIndex() {
  let blogs: BlogPost[] = [];

  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error(error);
  }

  const [featuredPost, ...remainingPosts] = blogs;
  let featuredPostWithContent = featuredPost;

  if (featuredPost) {
    try {
      const fullFeaturedPost = await getBlogById(featuredPost.id);
      featuredPostWithContent = fullFeaturedPost
        ? { ...featuredPost, ...fullFeaturedPost, slug: featuredPost.slug }
        : featuredPost;
    } catch (error) {
      console.error(error);
    }
  }

  const featuredDescription = featuredPostWithContent
    ? getOptionalBlogDescription(featuredPostWithContent)
    : undefined;
  const masonryPosts: BlogMasonryPost[] = remainingPosts.map((blog) => {
    const date = getBlogDate(blog);

    return {
      id: blog.id,
      title: blog.title,
      href: getBlogPath(blog),
      dateTime: date,
      formattedDate: formatDate(date),
      description: getOptionalBlogDescription(blog),
      coverImageUrl: blog.coverImageUrl,
    };
  });

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#1a2b21]">
      <section className="bg-[#1a2b21] text-[#f4f0e6]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10 px-6 pb-16 pt-8 sm:px-10 lg:px-12">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" aria-label="LinkPeek home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f0e6] text-sm font-bold text-[#1a2b21]">
                LP
              </span>
              <span className="text-lg font-semibold tracking-tight">LinkPeek</span>
            </Link>
            <Link
              href="/"
              className="rounded-md border border-[#f4f0e6]/20 px-4 py-2 text-sm font-medium text-[#f4f0e6]/80 transition-colors hover:border-[#f4f0e6]/40 hover:text-[#f4f0e6]"
            >
              Open app
            </Link>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="label-sm mb-4 text-[#dce6dd]/70">Link preview strategy</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Better links, cleaner previews, fewer surprises.
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#dce6dd]/78">
              Field notes on Open Graph tags, social preview debugging, and the small SEO details
              that help shared pages get crawled and clicked.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
        {featuredPostWithContent ? (
          <Link
            href={getBlogPath(featuredPostWithContent)}
            className="group grid overflow-hidden rounded-[1.25rem] border border-[#1a2b21]/10 bg-white shadow-[0_18px_60px_rgba(26,43,33,0.08)] transition-transform hover:-translate-y-1 lg:grid-cols-[0.95fr_1fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#dce6dd] lg:aspect-auto">
              {featuredPostWithContent.coverImageUrl ? (
                <img
                  src={featuredPostWithContent.coverImageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#dce6dd] text-[#1a2b21]/40">
                  LinkPeek
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b21]/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#f4f0e6]/90 px-4 py-2 text-sm font-semibold text-[#1a2b21] backdrop-blur">
                Featured read
                <span aria-hidden="true">-&gt;</span>
              </div>
            </div>
            <article className="flex min-h-[360px] flex-col p-7 sm:p-9 lg:p-12">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <time
                    dateTime={getBlogDate(featuredPostWithContent)}
                    className="rounded-full bg-[#dde6e1]/45 px-3 py-1.5 text-sm font-medium text-[#4f6f5b]"
                  >
                    {formatDate(getBlogDate(featuredPostWithContent))}
                  </time>
                  <span className="rounded-full border border-[#4f6f5b]/20 px-3 py-1.5 text-sm font-medium text-[#4f6f5b]">
                    Featured
                  </span>
                </div>
                <h2 className="max-w-3xl text-3xl font-semibold leading-[1.05] text-[#1a2b21] sm:text-4xl lg:text-5xl">
                  {featuredPostWithContent.title}
                </h2>
                {featuredDescription && (
                  <p className="mt-7 max-w-2xl border-l-2 border-[#4f6f5b]/25 pl-5 text-lg leading-8 text-[#4f6f5b]">
                    {featuredDescription}
                  </p>
                )}
              </div>
              <span className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a2b21] px-5 py-3 text-sm font-semibold text-[#f4f0e6] transition-colors group-hover:bg-[#2f4a3a]">
                Read article
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
              </span>
            </article>
          </Link>
        ) : (
          <div className="rounded-lg border border-[#1a2b21]/10 bg-white p-8 text-[#4f6f5b]">
            Articles are temporarily unavailable.
          </div>
        )}

        <BlogMasonryGrid posts={masonryPosts} />
      </section>
    </main>
  );
}
