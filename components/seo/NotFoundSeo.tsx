import { NextSeo } from "next-seo";

export function NotFoundSeo() {
  const title = "Not found - Sharove B2B Marketplace";
  const description = "Page not found.";

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: "https://og-image.vercel.app/React%20Storefront.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Fsaleor.io%2Fstatic%2Flogo-ad1b99aa7c6f5acf58a61640af760cfd.svg",
            alt: "Sharove B2B Marketplace hero image",
          },
        ],
        site_name: "Sharove B2B Marketplace",
      }}
    />
  );
}

export default NotFoundSeo;
