import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/legacy/image";
import React from "react";

import { replaceImageUrl } from "../../../lib/util";

export const ImageContainer = styled(Box)(({ theme }) => ({
  border: "2px solid transparent",
  cursor: "pointer",
  position: "relative",
  ".MuiSvgIcon-root": {
    color: "#4bbcaa",
  },
  opacity: 0.7,

  "&.selected": {
    opacity: 1,
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

interface UrlType {
  id: string;
  url: string;
}
interface ImagesGalleryPropTypes {
  media?: UrlType[];
  selectedImages: string[];
  handleSelectImages: (id: string) => void;
}

export default function ImagesGallery({
  media = [],
  selectedImages,
  handleSelectImages,
}: ImagesGalleryPropTypes) {
  return (
    <Box className="flex gap-3 flex-wrap">
      {media.map((image) => {
        const isSelected = selectedImages.includes(image?.id);
        return (
          <ImageContainer
            className={isSelected ? "selected" : ""}
            onClick={() => handleSelectImages(image?.id)}
          >
            {isSelected && (
              <CheckCircleIcon className="absolute right-1.5 top-1.5 z-10" />
            )}
            <Image
              src={replaceImageUrl(image?.url) || ""}
              alt=""
              width={158}
              height={250}
            />
          </ImageContainer>
        );
      })}
    </Box>
  );
}
