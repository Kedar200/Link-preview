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
  imageSize?: number; // bytes – from HEAD request on og:image
}
