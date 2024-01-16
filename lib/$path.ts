export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/404" as const,
      hash: url?.hash,
    }),
  },
  _channel: (channel: string | number) => ({
    _locale: (locale: string | number) => ({
      _sitemap: (sitemap: string | number) => ({
        $url: (url?: { hash?: string }) => ({
          pathname: "/[channel]/[locale]/[sitemap]" as const,
          query: { channel, locale, sitemap },
          hash: url?.hash,
        }),
      }),
      order: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[channel]/[locale]/order" as const,
          query: { channel, locale },
          hash: url?.hash,
        }),
      },
      products: {
        _slug: (slug: string | number) => ({
          $url: (url?: { query?; hash?: string }) => ({
            pathname: "/[channel]/[locale]/products/[slug]" as const,
            query: { channel, locale, slug, ...url?.query },
            hash: url?.hash,
          }),
        }),
      },
      search: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[channel]/[locale]/search" as const,
          query: { channel, locale },
          hash: url?.hash,
        }),
      },
      dashboard: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/[channel]/[locale]/dashboard" as const,
          hash: url?.hash,
        }),
      },
      $url: (url?: { hash?: string }) => ({
        pathname: "/[channel]/[locale]/dashboard" as const,
        query: { channel, locale },
        hash: url?.hash,
      }),
    }),
  }),
  $url: (url?: { hash?: string }) => ({
    pathname: "/[channel]/[locale]/dashboard" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;
