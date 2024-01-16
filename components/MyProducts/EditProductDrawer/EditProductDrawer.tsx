import { Box, Button, Divider, Drawer, Stack, Tab, Tabs } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

import { TabPanel } from "../../Common/TabPanel/TabPanel";
import { productType } from "../product.type";
import ImagesGallery from "./ImagesGallery";
import ProductForm from "./ProductForm";

interface valuesTypes {
  name: string;
  description: string;
  category: string;
}

interface EditProductDrawerPropTypes {
  open: boolean;
  product: productType;
  toggleDrawer?: () => void;
  handleSaveChanges: (values: valuesTypes, removeMediaIds: string[]) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

export function EditProductDrawer({
  handleSaveChanges,
  toggleDrawer,
  product,
  open,
}: EditProductDrawerPropTypes) {
  const [tab, setTab] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>(
    product?.media?.map((img) => img?.id)
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleSelectImages = (url: string) => {
    if (selectedImages.includes(url)) {
      setSelectedImages(selectedImages.filter((imgUrl) => imgUrl !== url));
    } else {
      setSelectedImages([...selectedImages, url]);
    }
  };

  const handleCancelButton = (event) => {
    event.preventDefault();
    formik.resetForm();
    if (toggleDrawer) {
      toggleDrawer();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: product?.name,
      description: product?.description,
      category: product?.category?.id,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const removeMediaIds = (product.media || [])
        .filter((img) => !selectedImages.includes(img?.id))
        .map((img) => img?.id);
      setSubmitting(true);
      handleSaveChanges(values, removeMediaIds);
      setSubmitting(false);
      if (toggleDrawer) {
        toggleDrawer();
      }
    },
  });

  const { media } = product;

  return (
    <Drawer anchor="right" open={open} onClose={handleCancelButton}>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction="column"
          justifyContent="space-between"
          className="h-screen"
        >
          <Box className="p-8 w-[924px]">
            <Box className="border-b border-slate-300">
              <Tabs
                value={tab}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab
                  className="text-lg font-medium"
                  label={<div>Product</div>}
                  {...a11yProps(0)}
                />
                <Tab
                  className="text-lg font-medium"
                  label={
                    <div className="flex gap-x-2">
                      Images ({(selectedImages || []).length}/{media?.length})
                    </div>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <ProductForm imageUrl={media[0]?.url} formik={formik} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <ImagesGallery
                media={media}
                selectedImages={selectedImages || []}
                handleSelectImages={handleSelectImages}
              />
            </TabPanel>
          </Box>
          <Box className="w-full">
            <Divider />
            <Box className="w-full flex justify-end pt-6 pb-6 pr-6 gap-x-5">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disableElevation
              >
                Save
              </Button>
              <Button variant="text" autoFocus onClick={handleCancelButton}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </Drawer>
  );
}
