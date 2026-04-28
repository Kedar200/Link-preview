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
  imageSize?: number;        // bytes – from HEAD request on og:image
  imageContentType?: string; // Content-Type header from HEAD (e.g. "image/jpeg")
  imageType?: string;        // og:image:type tag value
  twitterSite?: string;      // twitter:site (@username)
  twitterCreator?: string;   // twitter:creator (@authorname)
  multipleOgImages?: boolean; // true if page has >1 og:image tag
}
