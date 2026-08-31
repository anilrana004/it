import { absoluteUrl, ORGANIZATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    email: ORGANIZATION.email,
    logo: ORGANIZATION.logo,
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type ArticleJsonLdInput = {
  headline: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string | null;
  authorName: string;
  authorUrl?: string | null;
  articleType?: 'BlogPosting' | 'NewsArticle';
  keywords?: string[];
};

export function buildFaqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const url = absoluteUrl(input.path);
  const image = input.image ? absoluteUrl(input.image) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': input.articleType ?? 'BlogPosting',
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(image ? { image: [image] } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      '@type': 'Person',
      name: input.authorName,
      ...(input.authorUrl ? { url: input.authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION.logo,
      },
    },
    ...(input.keywords?.length ? { keywords: input.keywords.join(', ') } : {}),
  };
}
