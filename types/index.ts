export interface OGData {
  title: string;
  description: string;
  image: string;
  siteName: string;
  domain: string;
  imageWidth: string;
  imageHeight: string;
  type: string;
  twitterCard: string;
  url: string;
  isLocalhost: boolean;
}

export interface AuditIssue {
  id: string;
  severity: 'error' | 'warning' | 'success';
  category: 'image' | 'text' | 'technical';
  message: string;
  detail?: string;
  cutoffIndex?: number;
}

export interface PlatformScore {
  platform: Platform;
  score: number;
  label: string;
  reason?: string;
}

export interface AuditResult {
  issues: AuditIssue[];
  scores: PlatformScore[];
  fixTags: string;
}

export type Platform = 'whatsapp' | 'twitter' | 'linkedin' | 'slack' | 'discord' | 'instagram';

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  dotColor: string;
}
