// @ts-nocheck
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  DeleteIconContainer,
  EditIconContainer,
  ImageContainer,
  UploadContainer,
} from "./FileUpload.style";

interface FileUploadPropTypes {
  url: string;
  height: string;
  title: string;
  sizeDetails: string;
  uploadFile?: (file: File) => void;
}

export function FileUpload({
  url,
  height,
  title,
  sizeDetails,
  uploadFile,
}: FileUploadPropTypes) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const handleFileChange = (file) => {
    setSelectedImage(file);
    uploadFile(file);
  };

  return imageUrl ? (
    <ImageContainer mt={2} sx={{ height }}>
      <EditIconContainer htmlFor="file-upload">
        <BorderColorOutlinedIcon />
        <input
          hidden
          id="file-upload"
          accept="image/*"
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      </EditIconContainer>
      <DeleteIconContainer onClick={removeImage}>
        <DeleteIcon />
      </DeleteIconContainer>
      <img src={imageUrl} alt="storefront-logo" height="100%" width="100%" />
    </ImageContainer>
  ) : (
    <Box>
      <UploadContainer htmlFor="file-upload" style={{ height }}>
        <CloudUploadOutlinedIcon className="text-white text-5xl" />
        <Typography variant="h4" className="text-white">
          {sizeDetails}
        </Typography>
        <Typography variant="body2" className="text-white">
          {title}
        </Typography>
      </UploadContainer>
      <input
        hidden
        id="file-upload"
        accept="image/*"
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
    </Box>
  );
}
