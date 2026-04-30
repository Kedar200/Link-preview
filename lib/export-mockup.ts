'use client';

import { toPng, toBlob } from 'html-to-image';

export type ExportFormat = 'png' | 'clipboard';

interface ExportOptions {
  format: ExportFormat;
  pixelRatio?: number;     // Default: 2 (Retina quality)
  backgroundColor?: string; // Default: transparent
}

/**
 * Exports a DOM node (the phone mockup) as a pixel-perfect image.
 * Uses html-to-image to capture the EXACT rendered output — no SVG duplication.
 * This is the ONLY export path for all platforms.
 */
export async function exportMockup(
  node: HTMLElement,
  options: ExportOptions = { format: 'png' }
): Promise<string | void> {
  const { format, pixelRatio = 2, backgroundColor } = options;

  const commonOptions: Record<string, unknown> = {
    pixelRatio,
    backgroundColor,
    cacheBust: true,
    // Filter out the hardware side buttons that extend beyond the phone body
    filter: (domNode: Element) => {
      if (!(domNode instanceof HTMLElement)) return true;
      const cls = domNode.className?.toString() || '';
      // Skip absolute-positioned hardware buttons on the sides
      if (cls.includes('-left-[19px]') || cls.includes('-right-[19px]')) {
        return false;
      }
      return true;
    },
  };

  switch (format) {
    case 'png': {
      const dataUrl = await toPng(node, commonOptions);
      // Trigger download
      const link = document.createElement('a');
      link.download = `linkpeek-mockup-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      return dataUrl;
    }

    case 'clipboard': {
      const blob = await toBlob(node, commonOptions);
      if (!blob) throw new Error('Failed to create image blob');
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return;
    }
  }
}
