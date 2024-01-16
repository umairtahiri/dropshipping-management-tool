import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { TabContext, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { B2B_SHOP_URL } from "@/lib/const";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import type { RootState } from "@/lib/redux/store";
import { getCategoriesForCarousel } from "@/lib/util";

import { ProductListWrap, SliderWrapper } from "./Carousel.style";

export interface CarouselProps {}

function Slide() {
  const menus = useSelector(
    (state: RootState) => state?.categories?.menusCategories
  );

  const [value] = useState("1");

  const windowSize = useWindowSize();

  const [smallWindow, setSmallWindow] = useState<boolean>(false);

  const categories = getCategoriesForCarousel(
    (menus || []).map((menu) => menu?.node)
  );

  useEffect(() => {
    if (windowSize?.width && windowSize?.width < 650) {
      setSmallWindow(true);
    } else {
      setSmallWindow(false);
    }
  }, [windowSize?.width]);

  return (
    <Box>
      <div className="mainBanner">
        <img
          src={
            smallWindow ? "/slider/small-banner.png" : "/slider/main-banner.png"
          }
          alt="MAIN BANNER"
          loading="lazy"
        />
      </div>
      <ProductListWrap>
        <Grid
          container
          columnSpacing={0}
          className="sliderImageList md:w-full mt-1 w-custom-responsive"
        >
          <TabContext value={value}>
            <TabPanel value="1">
              <Grid item>
                <Link
                  href={`${B2B_SHOP_URL}/default-channel/en-US/`}
                  passHref
                  target="_blank"
                >
                  <img src="/slider/1.png" alt="IMAGE1" loading="lazy" />
                  <Typography
                    variant="inherit"
                    className="mt-1 text-[13px] capitalize default-black-color"
                  >
                    New Arrivals
                  </Typography>
                </Link>
              </Grid>

              {categories.map((category) => (
                <Grid item key={category?.id}>
                  <Link
                    href={`${B2B_SHOP_URL}/default-channel/en-US/category/${category?.name}?parent=${category?.slug}`}
                    passHref
                    target="_blank"
                  >
                    <img
                      src={category?.img}
                      alt={category?.slug}
                      loading="lazy"
                    />
                    <Typography
                      variant="caption"
                      className="mt-1 text-[13px] capitalize default-black-color"
                    >
                      {(category?.name || "").slice(0, 11).toLowerCase()}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </TabPanel>
          </TabContext>
        </Grid>
      </ProductListWrap>
    </Box>
  );
}

export function Carousel() {
  // MAIN CAROUSEL CONTROLS
  const sliderSettings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 500, // ms
    autoplaySpeed: 5000,
    dots: false,
  };

  return (
    <SliderWrapper>
      <Slider {...sliderSettings}>
        <Slide />
        <Slide />
      </Slider>
    </SliderWrapper>
  );
}
