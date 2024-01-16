import { NextSeo } from "next-seo";

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const baseTitle = "Sharove Dropshipping Dashboard";
  const baseDescription = "Manage your storefront";

  const seoTitle = title || baseTitle;
  const seoDescription = description || baseDescription;

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      openGraph={{
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            alt: "Sharove Dropshipping Dashboard",
          },
        ],
        site_name: "Sharove Dropshipping Dashboard",
      }}
    />
  );
}

export default BaseSeo;
