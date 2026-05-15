import 'server-only';
import { load } from 'cheerio';

const CONTENT_API_URL = 'https://api.visualref.com/api/v1/content';
const CONTENT_API_TOKEN =
  process.env.VISUALREF_API_TOKEN ?? 'vr_live_no-2c0EEK_kyHsGV3JfqGVZE7N4vejuq';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  htmlContent?: string;
  coverImageUrl?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  excerpt?: string;
  author?: string;
};

type RawBlogPost = {
  id?: unknown;
  slug?: unknown;
  title?: unknown;
  htmlContent?: unknown;
  content?: unknown;
  coverImageUrl?: unknown;
  imageUrl?: unknown;
  featuredImage?: unknown;
  publishedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  description?: unknown;
  excerpt?: unknown;
  metaDescription?: unknown;
  author?: unknown;
};

function authHeaders(): Record<string, string> {
  if (!CONTENT_API_TOKEN) return {};

  return {
    Authorization: CONTENT_API_TOKEN.startsWith('Bearer ')
      ? CONTENT_API_TOKEN
      : `Bearer ${CONTENT_API_TOKEN}`,
  };
}

function valueToString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function normalizePost(raw: RawBlogPost): BlogPost | null {
  const id = valueToString(raw.id);
  const title = valueToString(raw.title);

  if (!id || !title) {
    return null;
  }

  const rawSlug = valueToString(raw.slug);
  const slugBase = rawSlug && !isUuidLike(rawSlug) ? rawSlug : title;
  const description =
    valueToString(raw.description) ||
    valueToString(raw.metaDescription) ||
    valueToString(raw.excerpt);

  return {
    id,
    slug: slugify(slugBase) || slugify(title) || id,
    title,
    htmlContent: valueToString(raw.htmlContent) || valueToString(raw.content),
    coverImageUrl:
      valueToString(raw.coverImageUrl) ||
      valueToString(raw.imageUrl) ||
      valueToString(raw.featuredImage),
    publishedAt: valueToString(raw.publishedAt),
    createdAt: valueToString(raw.createdAt),
    updatedAt: valueToString(raw.updatedAt),
    description,
    excerpt: valueToString(raw.excerpt) || description,
    author: valueToString(raw.author),
  };
}

function uniquifySlugs(posts: BlogPost[]) {
  const seen = new Map<string, number>();

  return posts.map((post) => {
    const count = seen.get(post.slug) ?? 0;
    seen.set(post.slug, count + 1);

    return {
      ...post,
      slug: count === 0 ? post.slug : `${post.slug}-${count + 1}`,
    };
  });
}

export function getBlogPath(post: Pick<BlogPost, 'slug'>) {
  return `/blog/${post.slug}`;
}

export function getBlogDate(post: BlogPost) {
  return post.publishedAt || post.createdAt || post.updatedAt || '';
}

export function getBlogDescription(post: BlogPost) {
  if (post.description) return post.description;
  if (post.excerpt) return post.excerpt;

  const text = (post.htmlContent ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text
    ? `${text.slice(0, 155)}${text.length > 155 ? '...' : ''}`
    : 'Read LinkPeek articles about Open Graph previews, social sharing, and better link presentation.';
}

function getAnchorTokens(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 3)
    .map((token) => token.replace(/(ing|ions|ion|ments|ment|ness|ity|ies|s)$/i, ''))
    .filter(Boolean);
}

function scoreHeadingForAnchor(headingText: string, anchorText: string, targetId: string) {
  const normalizedHeading = slugify(headingText);
  const targetTokens = getAnchorTokens(`${anchorText} ${targetId}`);
  const headingTokens = getAnchorTokens(headingText);

  if (!normalizedHeading) return 0;
  if (normalizedHeading === targetId) return 100;
  if (normalizedHeading.includes(targetId) || targetId.includes(normalizedHeading)) return 80;

  return targetTokens.reduce((score, token) => {
    const hasToken = headingTokens.some(
      (headingToken) =>
        headingToken === token ||
        headingToken.startsWith(token.slice(0, 6)) ||
        token.startsWith(headingToken.slice(0, 6))
    );

    return score + (hasToken ? 1 : 0);
  }, 0);
}

export function enhanceBlogHtml(html: string) {
  if (!html) return html;

  const $ = load(html);
  const usedIds = new Set<string>();

  $('[id]').each((_, element) => {
    const id = $(element).attr('id');
    if (id) usedIds.add(id);
  });

  const makeUniqueId = (base: string) => {
    let id = base || 'section';
    let count = 2;

    while (usedIds.has(id)) {
      id = `${base}-${count}`;
      count += 1;
    }

    usedIds.add(id);
    return id;
  };

  const headings = $('h1,h2,h3,h4')
    .toArray()
    .filter((element) => {
      const text = $(element).text().trim();
      return text && !/table\s+of\s+contents/i.test(text);
    });

  headings.forEach((heading) => {
    if ($(heading).attr('id')) return;

    $(heading).attr('id', makeUniqueId(slugify($(heading).text())));
    $(heading).attr('style', `${$(heading).attr('style') ?? ''}; scroll-margin-top: 24px;`);
  });

  const tocHeading = $('h2,h3')
    .toArray()
    .find((heading) => /table\s+of\s+contents/i.test($(heading).text()));

  if (tocHeading) {
    const tocLinks: Array<{ targetId: string; text: string }> = [];
    let sibling = $(tocHeading).next();

    while (sibling.length) {
      if (/^h[1-3]$/i.test(sibling.prop('tagName') ?? '')) break;

      sibling.find('a[href^="#"]').each((_, link) => {
        const href = $(link).attr('href') ?? '';
        const targetId = slugify(decodeURIComponent(href.replace(/^#/, '')));

        if (targetId) {
          tocLinks.push({
            targetId,
            text: $(link).text().trim(),
          });
        }
      });

      sibling = sibling.next();
    }

    const headingsAfterToc = headings.filter((heading) => {
      return $(heading).index() > $(tocHeading).index();
    });
    const claimedHeadings = new Set<unknown>();

    tocLinks.forEach((link, index) => {
      if ($(`#${link.targetId}`).length) return;

      let bestHeading = headingsAfterToc[index];
      let bestScore = 0;

      headingsAfterToc.forEach((heading) => {
        if (claimedHeadings.has(heading)) return;

        const score = scoreHeadingForAnchor($(heading).text(), link.text, link.targetId);
        if (score > bestScore) {
          bestHeading = heading;
          bestScore = score;
        }
      });

      if (!bestHeading) return;

      claimedHeadings.add(bestHeading);
      usedIds.add(link.targetId);
      $(bestHeading).before(
        `<span id="${link.targetId}" aria-hidden="true" style="display:block;scroll-margin-top:24px"></span>`
      );
    });
  }

  return $('body').html() ?? $.root().html() ?? html;
}

export async function getBlogs(limit = 50) {
  const res = await fetch(`${CONTENT_API_URL}?page=1&limit=${limit}`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const payload = await res.json();
  const rows = Array.isArray(payload?.data?.data)
    ? payload.data.data
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload)
        ? payload
        : [];

  return uniquifySlugs(
    rows
      .map((post: RawBlogPost) => normalizePost(post))
      .filter((post: BlogPost | null): post is BlogPost => Boolean(post))
  );
}

async function getBlogById(id: string) {
  const res = await fetch(`${CONTENT_API_URL}/${id}`, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  const payload = await res.json();
  return normalizePost(payload?.data ?? payload);
}

export async function getBlogBySlugOrId(slugOrId: string) {
  const posts = await getBlogs();
  const listedPost = posts.find((post) => post.slug === slugOrId || post.id === slugOrId);

  if (listedPost) {
    const fullPost = await getBlogById(listedPost.id);
    return fullPost ? { ...listedPost, ...fullPost, slug: listedPost.slug } : listedPost;
  }

  const fullPost = await getBlogById(slugOrId);

  if (!fullPost) {
    return null;
  }

  const canonicalPost = posts.find((post) => post.id === fullPost.id);
  return canonicalPost ? { ...canonicalPost, ...fullPost, slug: canonicalPost.slug } : fullPost;
}
