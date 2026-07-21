'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const FEEDBACK_DONE_KEY = 'linkpeek_feedback_nudge_done';
const FEEDBACK_SNOOZE_KEY = 'linkpeek_feedback_nudge_snooze_until';
const FEEDBACK_DELAY_MS = 18000;
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const TESTIMONIAL_URL = 'https://www.producthunt.com/products/linkpeek?launch=linkpeek';
const ISSUE_URL = 'https://github.com/Kedar200/Link-preview/issues/new';

interface FeedbackNudgeProps {
  canShow: boolean;
  checkedDomain?: string;
  previewStatus?: 'success' | 'error' | 'idle';
}

type Step = 'ask' | 'yes' | 'no';
type Choice = 'yes' | 'no' | null;

export default function FeedbackNudge({
  canShow,
  checkedDomain,
  previewStatus = 'idle',
}: FeedbackNudgeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>('ask');
  const [selectedChoice, setSelectedChoice] = useState<Choice>(null);

  useEffect(() => {
    if (!canShow || isMounted) return;

    try {
      const isDone = localStorage.getItem(FEEDBACK_DONE_KEY);
      const snoozeUntil = Number(localStorage.getItem(FEEDBACK_SNOOZE_KEY) || 0);

      if (isDone || snoozeUntil > Date.now()) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMounted(true);
      trackEvent('feedback_nudge_shown', {
        checked_domain: checkedDomain,
        preview_status: previewStatus,
      });

      window.requestAnimationFrame(() => setIsVisible(true));
    }, FEEDBACK_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [canShow, checkedDomain, isMounted, previewStatus]);

  const finish = (eventName: string, params?: Record<string, string | number | boolean | undefined>) => {
    try {
      localStorage.setItem(FEEDBACK_DONE_KEY, new Date().toISOString());
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }

    trackEvent(eventName, {
      checked_domain: checkedDomain,
      preview_status: previewStatus,
      ...params,
    });

    setIsVisible(false);
    window.setTimeout(() => setIsMounted(false), 260);
  };

  const snooze = () => {
    try {
      localStorage.setItem(FEEDBACK_SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }

    trackEvent('feedback_nudge_snoozed', {
      checked_domain: checkedDomain,
      preview_status: previewStatus,
      step,
    });

    setIsVisible(false);
    window.setTimeout(() => setIsMounted(false), 260);
  };

  const choose = (choice: Exclude<Choice, null>) => {
    if (selectedChoice) return;

    setSelectedChoice(choice);
    trackEvent(choice === 'yes' ? 'feedback_nudge_yes_clicked' : 'feedback_nudge_no_clicked', {
      checked_domain: checkedDomain,
      preview_status: previewStatus,
    });

    window.setTimeout(() => {
      setStep(choice);
      setSelectedChoice(null);
    }, 260);
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed bottom-5 left-6 z-[115] w-[calc(100vw-3rem)] max-w-[340px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:left-8 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
      }`}
    >
      <div className="rounded-lg border border-[#1a2b21]/10 bg-[#f4f0e6]/95 p-3.5 text-[#1a2b21] shadow-[0_18px_50px_rgba(13,26,19,0.18)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => finish('feedback_nudge_dismissed', { step })}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-[#1a2b21]/45 transition hover:bg-white/70 hover:text-[#1a2b21]"
          aria-label="Close feedback"
          title="Close"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {step === 'ask' && (
          <div className="flex items-center gap-3 pr-7">
            <p className="min-w-0 flex-1 text-sm font-inter font-[700] leading-snug">Is LinkPeek useful?</p>
            <div className="flex flex-shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose('yes')}
                disabled={Boolean(selectedChoice)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-wait ${
                  selectedChoice === 'yes'
                    ? 'feedback-choice-pop border-[#1a2b21] bg-[#1a2b21] text-white'
                    : 'border-[#1a2b21]/10 bg-white/75 text-[#1a2b21] hover:bg-white'
                }`}
                aria-label="Yes, LinkPeek is useful"
                title="Yes"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={selectedChoice === 'yes' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v11" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-1.38 6A2 2 0 0 1 18.44 20H7" />
                  <path d="M7 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
                  <path d="M15 5.88A2 2 0 0 0 13 3h-.1a2 2 0 0 0-1.8 1.1L7 10" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => choose('no')}
                disabled={Boolean(selectedChoice)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-wait ${
                  selectedChoice === 'no'
                    ? 'feedback-choice-pop border-[#1a2b21] bg-[#1a2b21] text-white'
                    : 'border-[#1a2b21]/10 bg-white/75 text-[#1a2b21] hover:bg-white'
                }`}
                aria-label="No, LinkPeek is not useful yet"
                title="Not yet"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={selectedChoice === 'no' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 14V3" />
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l1.38-6A2 2 0 0 1 5.56 4H17" />
                  <path d="M17 14h3a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3" />
                  <path d="M9 18.12A2 2 0 0 0 11 21h.1a2 2 0 0 0 1.8-1.1L17 14" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 'yes' && (
          <div className="pr-7">
            <p className="text-sm font-inter font-[700] leading-snug">Can we quote you?</p>
            <p className="mt-1 text-xs leading-relaxed text-[#4f6f5b]">One short line helps other builders trust it.</p>
            <div className="mt-3 flex gap-2">
              <a
                href={TESTIMONIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => finish('feedback_testimonial_opened')}
                className="flex h-9 flex-1 items-center justify-center rounded-lg bg-[#1a2b21] px-3 text-sm font-inter font-[700] text-white no-underline transition hover:bg-[#233d2d]"
              >
                Write one
              </a>
              <button
                type="button"
                onClick={snooze}
                className="h-9 rounded-lg border border-[#1a2b21]/10 bg-white/75 px-3 text-sm font-inter font-[700] text-[#1a2b21] transition hover:bg-white"
              >
                Later
              </button>
            </div>
          </div>
        )}

        {step === 'no' && (
          <div className="pr-7">
            <p className="text-sm font-inter font-[700] leading-snug">What broke?</p>
            <p className="mt-1 text-xs leading-relaxed text-[#4f6f5b]">Report it on GitHub so we can fix it.</p>
            <div className="mt-3 flex gap-2">
              <a
                href={ISSUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => finish('feedback_issue_opened')}
                className="flex h-9 flex-1 items-center justify-center rounded-lg bg-[#1a2b21] px-3 text-sm font-inter font-[700] text-white no-underline transition hover:bg-[#233d2d]"
              >
                Report it
              </a>
              <button
                type="button"
                onClick={() => finish('feedback_issue_skipped')}
                className="h-9 rounded-lg border border-[#1a2b21]/10 bg-white/75 px-3 text-sm font-inter font-[700] text-[#1a2b21] transition hover:bg-white"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
