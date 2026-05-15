'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { MasonryGrid } from 'react-masonry-virtualized';

export type BlogMasonryPost = {
  id: string;
  title: string;
  href: string;
  dateTime: string;
  formattedDate: string;
  description?: string;
  coverImageUrl?: string;
};

const BASE_CARD_WIDTH = 340;
const GRID_GAP = 24;
const CARD_VERTICAL_PADDING = 48;
const DATE_LINE_HEIGHT = 20;
const TITLE_TOP_MARGIN = 16;
const TITLE_LINE_HEIGHT = 33;
const DESCRIPTION_TOP_MARGIN = 16;
const DESCRIPTION_LINE_HEIGHT = 24;
const CARD_HEIGHT_SAFETY = 18;

function estimateLineCount(text: string | undefined, charsPerLine: number, minLines: number, maxLines: number) {
  if (!text) return 0;
  return Math.min(maxLines, Math.max(minLines, Math.ceil(text.length / charsPerLine)));
}

function getImageHeight(post: BlogMasonryPost, index: number) {
  const titleWeight = estimateLineCount(post.title, 26, 2, 4);
  const rhythm = [178, 210, 156, 226, 188, 168, 238, 196];

  return post.coverImageUrl ? rhythm[(index + titleWeight) % rhythm.length] : 150;
}

function getCardHeight(post: BlogMasonryPost, index: number) {
  const titleLines = estimateLineCount(post.title, 22, 2, 4);
  const descriptionLines = estimateLineCount(post.description, 52, 1, 3);
  const imageHeight = getImageHeight(post, index);
  const descriptionHeight = descriptionLines > 0
    ? DESCRIPTION_TOP_MARGIN + descriptionLines * DESCRIPTION_LINE_HEIGHT
    : 0;
  const contentHeight =
    CARD_VERTICAL_PADDING +
    DATE_LINE_HEIGHT +
    TITLE_TOP_MARGIN +
    titleLines * TITLE_LINE_HEIGHT +
    descriptionHeight +
    CARD_HEIGHT_SAFETY;

  return imageHeight + contentHeight;
}

function BlogCard({ post, index }: { post: BlogMasonryPost; index: number }) {
  const imageHeight = getImageHeight(post, index);

  return (
    <Link
      href={post.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#1a2b21]/10 bg-white transition-all hover:border-[#1a2b21]/25 hover:shadow-[0_18px_50px_rgba(26,43,33,0.08)]"
    >
      <div className="shrink-0 bg-[#dce6dd]" style={{ height: imageHeight }}>
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#1a2b21]/35">
            LinkPeek
          </div>
        )}
      </div>

      <article className="flex flex-1 flex-col p-6">
        <time dateTime={post.dateTime} className="text-sm text-[#4f6f5b]">
          {post.formattedDate}
        </time>
        <h2 className="mt-4 line-clamp-4 text-2xl font-semibold leading-snug text-[#1a2b21]">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#4f6f5b]">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-[#1a2b21]/10 bg-white">
      <div className="h-[42%] bg-[#dce6dd]" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-24 rounded-full bg-[#dce6dd]" />
        <div className="space-y-2">
          <div className="h-5 w-full rounded-full bg-[#dce6dd]" />
          <div className="h-5 w-4/5 rounded-full bg-[#dce6dd]" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 w-full rounded-full bg-[#dce6dd]/80" />
          <div className="h-3 w-5/6 rounded-full bg-[#dce6dd]/80" />
        </div>
      </div>
    </div>
  );
}

function BlogGridPlaceholder({ posts }: { posts: BlogMasonryPost[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <div key={post.id} style={{ height: getCardHeight(post, index) }}>
          <BlogCard post={post} index={index} />
        </div>
      ))}
    </div>
  );
}

export default function BlogMasonryGrid({ posts }: { posts: BlogMasonryPost[] }) {
  const getItemSize = useCallback((post: BlogMasonryPost, index: number) => {
    return Promise.resolve({
      width: BASE_CARD_WIDTH,
      height: getCardHeight(post, index),
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <MasonryGrid
      items={posts}
      renderItem={(post, index) => <BlogCard post={post} index={index} />}
      getItemSize={getItemSize}
      baseWidth={BASE_CARD_WIDTH}
      minWidth={300}
      gap={GRID_GAP}
      className="mt-10"
      ssrPlaceholder={<BlogGridPlaceholder posts={posts} />}
      loadingPlaceholder={<BlogCardSkeleton />}
      skeletonCount={posts.length}
      skeletonAspectRatio={1.32}
      bufferMultiplier={1.2}
    />
  );
}
