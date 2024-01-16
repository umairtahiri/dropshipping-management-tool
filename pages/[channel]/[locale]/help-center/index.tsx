// @ts-nocheck
import React, { ReactElement, useState } from "react";

import { FaqCard, Layout, SearchCard } from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { faqs } from "@/lib/faqs";

function HelpCenterPage() {
  const [searchStr, setSearchStr] = useState("");

  const handleSearchFaq = async () => {
    setSearchStr("");
  };

  return (
    <div className="w-full">
      <BaseSeo />
      <div className="px-4 pb-20 sm:px-8 sm:pb-10">
        <SearchCard
          title="Help Center"
          value={searchStr}
          placeholder="Search for questions"
          onChange={setSearchStr}
          handleSearch={handleSearchFaq}
        />
        {(faqs || []).map((faq) => (
          <FaqCard faq={faq} />
        ))}
      </div>
    </div>
  );
}

export default HelpCenterPage;

HelpCenterPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
