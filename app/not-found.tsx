import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      <div className="bg-[#1a2b21] text-white">
        <Header />
        <main className="max-w-[960px] mx-auto px-6 sm:px-12 pt-16 pb-24">
          <p className="label-sm text-white/55 mb-5">404</p>
          <h1 className="h1 max-w-[760px]">Page not found</h1>
          <p className="body-lg text-white/70 max-w-[640px] mt-8">
            This page does not exist, but the Open Graph preview checker and developer guides are
            still available.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex justify-center rounded-lg bg-[#dde6e1] px-5 py-3 text-sm font-semibold text-[#1a2b21] no-underline transition-colors hover:bg-white"
            >
              Open preview checker
            </Link>
            <Link
              href="/tools"
              className="inline-flex justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
            >
              Browse tools
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
            >
              Read guides
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
