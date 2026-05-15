import type { Metadata } from 'next';
import Link from 'next/link';
import {
  type BlogPost,
  getBlogDate,
  getBlogDescription,
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

export default async function BlogIndex() {
  let blogs: BlogPost[] = [];

  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error(error);
  }

  const [featuredPost, ...remainingPosts] = blogs;

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
        {featuredPost ? (
          <Link
            href={getBlogPath(featuredPost)}
            className="group grid overflow-hidden rounded-lg border border-[#1a2b21]/10 bg-white shadow-[0_18px_60px_rgba(26,43,33,0.08)] transition-transform hover:-translate-y-1 lg:grid-cols-[1fr_0.9fr]"
          >
            <div className="aspect-[16/10] bg-[#dce6dd] lg:aspect-auto">
              {featuredPost.coverImageUrl ? (
                <img
                  src={featuredPost.coverImageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#dce6dd] text-[#1a2b21]/40">
                  LinkPeek
                </div>
              )}
            </div>
            <article className="flex min-h-[360px] flex-col justify-between p-7 sm:p-9 lg:p-10">
              <div>
                <div className="mb-5 flex items-center gap-3 text-sm text-[#4f6f5b]">
                  <time dateTime={getBlogDate(featuredPost)}>{formatDate(getBlogDate(featuredPost))}</time>
                  <span aria-hidden="true">/</span>
                  <span>Featured</span>
                </div>
                <h2 className="text-3xl font-semibold leading-tight text-[#1a2b21] sm:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 line-clamp-4 text-base leading-7 text-[#4f6f5b]">
                  {getBlogDescription(featuredPost)}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1a2b21]">
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

        {remainingPosts.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((blog) => (
              <Link
                key={blog.id}
                href={getBlogPath(blog)}
                className="group flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-[#1a2b21]/10 bg-white transition-all hover:-translate-y-1 hover:border-[#1a2b21]/25 hover:shadow-[0_18px_50px_rgba(26,43,33,0.08)]"
              >
                <div className="aspect-[16/10] bg-[#dce6dd]">
                  {blog.coverImageUrl ? (
                    <img
                      src={blog.coverImageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#1a2b21]/35">
                      LinkPeek
                    </div>
                  )}
                </div>
                <article className="flex flex-1 flex-col p-6">
                  <time dateTime={getBlogDate(blog)} className="text-sm text-[#4f6f5b]">
                    {formatDate(getBlogDate(blog))}
                  </time>
                  <h2 className="mt-4 line-clamp-3 text-2xl font-semibold leading-snug text-[#1a2b21]">
                    {blog.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4f6f5b]">
                    {getBlogDescription(blog)}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-[#1a2b21]">
                    Read
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
