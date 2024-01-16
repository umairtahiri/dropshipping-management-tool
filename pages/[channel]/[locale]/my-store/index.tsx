// @ts-nocheck
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  ColorTemplates,
  FullPageLoader,
  Layout,
  Profile,
  Social,
  StoreBanner,
  TabPanel,
  TemplatePreview,
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import {
  createStorefront,
  getFileUrl,
  getStoreInfo,
  updateStoreInfo,
} from "@/lib/api/requests";
import { setCreatingStore, setStoreFront } from "@/lib/redux/retailer";
import type { RootState } from "@/lib/redux/store";
import { getFieldValues } from "@/lib/util";

interface fieldType {
  name: string;
  newValues: string[];
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyStorePage() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const userEmail = useSelector((state: RootState) => state?.user?.user?.email);

  const retailerShop = useSelector(
    (state: RootState) => state?.retailer?.retailerShop
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const creatingStore = useSelector(
    (state: RootState) => state?.retailer?.creatingStore
  );

  const { id: retailerShopId } = retailerShop;

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    url: "",
    description: "",
    facebook: "",
    instagram: "",
    twitter: "",
    pinterest: "",
  });

  const setStoreFields = (storeData) => {
    const { name, description, url, fields = [] } = storeData;

    const logos = getFieldValues(fields, "logo");
    const facebook = getFieldValues(fields, "facebook");
    const instagram = getFieldValues(fields, "instagram");
    const twitter = getFieldValues(fields, "twitter");
    const pinterest = getFieldValues(fields, "pinterest");
    const banners = getFieldValues(fields, "banner");

    setLogo(logos);
    setBanner(banners);
    setStoreDetails({
      name,
      url,
      description,
      facebook,
      instagram,
      twitter,
      pinterest,
    });
  };

  const getStoreDetails = async (id?: string) => {
    const response: any = await getStoreInfo(storeFrontId || id);
    if (response?.status) {
      setStoreFields(response?.data?.data);
      dispatch(setStoreFront(response?.data?.data));
    }
  };

  useEffect(() => {
    if (storeFrontId) {
      getStoreDetails();
    }
  }, [storeFrontId]);

  const handleTabChange = (event: React.SyntheticEvent, tabValue: number) => {
    setActiveTab(tabValue);
  };

  const updateStorefront = async (payload) => {
    setLoading(true);
    const response: any = await updateStoreInfo(storeFrontId, payload);
    if (response?.data?.data?.errors?.length) {
      enqueueSnackbar(response?.data?.message, {
        variant: "error",
      });
    } else {
      getStoreDetails();
      enqueueSnackbar("Store information updated successfully", {
        variant: "success",
      });
    }
    setLoading(false);
  };

  const createFileUrl = async (file) => {
    setUploadingFile(true);
    const response = await getFileUrl(file);
    setUploadingFile(false);
    if (response?.status === 400) {
      enqueueSnackbar("File uploading failed", {
        variant: "error",
      });
      return "";
    }
    return response;
  };

  const handleChangeLogo = async (file) => {
    const logoUrl = await createFileUrl(file);
    setLogo(logoUrl);
  };

  const handleChangeBanner = async (file) => {
    const bannerUrl = await createFileUrl(file);
    setBanner(bannerUrl);
  };

  const handleCreateStore = async (payload) => {
    dispatch(setCreatingStore(true));
    const response: any = await createStorefront(retailerShopId, payload);
    if (response?.status) {
      getStoreDetails(response?.data?.data?.id);
      enqueueSnackbar("Storefront created successfully", {
        variant: "success",
      });
      dispatch(setCreatingStore(false));
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
      dispatch(setCreatingStore(false));
    }
  };

  const preparePayload = (data) => {
    const {
      name,
      description = "",
      facebook,
      instagram,
      pinterest,
      twitter,
    } = data;
    const fields: fieldType[] = [];
    if (logo) {
      fields.push({
        name: "logo",
        newValues: [logo],
      });
    }
    if (banner) {
      fields.push({
        name: "banner",
        newValues: [banner],
      });
    }
    if (facebook) {
      fields.push({
        name: "facebook",
        newValues: [facebook],
      });
    }
    if (instagram) {
      fields.push({
        name: "instagram",
        newValues: [instagram],
      });
    }
    if (twitter) {
      fields.push({
        name: "twitter",
        newValues: [twitter],
      });
    }
    if (pinterest) {
      fields.push({
        name: "pinterest",
        newValues: [pinterest],
      });
    }
    const payload = {
      name,
      description,
      fields,
    };
    return payload;
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Storefront name is required"),
    description: yup.string().max(250, "Text must not exceed 250 characters"),
    facebook: yup.string().url("Please enter valid url"),
    pinterest: yup.string().url("Please enter valid url"),
    instagram: yup.string().url("Please enter valid url"),
    twitter: yup.string().url("Please enter valid url"),
  });

  const formik = useFormik({
    initialValues: storeDetails,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: object, { setSubmitting }) => {
      const HAS_STOREFRONT = Boolean(storeFrontId);
      const HAS_RETAILER_SHOP = Boolean(retailerShopId);
      try {
        setSubmitting(true);
        const payload = {
          ...(preparePayload(values) || {}),
          url: storeDetails?.url,
        };
        if (HAS_STOREFRONT && HAS_RETAILER_SHOP) {
          updateStorefront(payload);
        } else {
          delete values["url"];
          const payload = {
            ...values,
            email: userEmail,
          };
          if (HAS_RETAILER_SHOP) {
            handleCreateStore(payload);
          } else {
            enqueueSnackbar("No retailer shop exists", {
              variant: "error",
            });
          }
        }
      } catch (err: any) {
        if (err?.response) {
          formik.setFieldError(
            err?.response?.data?.errors[0]?.field,
            err?.response?.data?.message
          );
          enqueueSnackbar(err?.response?.data?.message, {
            variant: "error",
          });
        }
      }
    },
  });

  const handleCancelButton = (event) => {
    event.preventDefault();
    formik.resetForm();
  };

  return (
    <div className="w-full">
      <BaseSeo />
      <div className="pt-0 pb-12 px-4 md:px-8 md:pt-3">
        <Box className="border-b border-slate-300 hidden md:block">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              className="text-base font-medium"
              label={<div>Profile</div>}
              {...a11yProps(0)}
            />
            <Tab
              className="text-base font-medium"
              label={<div className="flex gap-x-2">Personalization</div>}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <Box className={loading ? "hidden" : ""}>
          <form onSubmit={formik.handleSubmit}>
            <TabPanel value={activeTab} index={0}>
              <Stack direction="column" spacing={3}>
                <Profile
                  formik={formik}
                  logo={logo}
                  storefrontUrl={storeDetails?.url}
                  handleChangeLogo={handleChangeLogo}
                />
                <Social formik={formik} />
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="px-10"
                    disableElevation
                    disabled={formik.isSubmitting || uploadingFile}
                  >
                    Save
                  </Button>
                  <Button
                    variant="text"
                    disableElevation
                    className="ml-3"
                    onClick={handleCancelButton}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Stack direction="column" spacing={3}>
                <StoreBanner
                  banner={banner}
                  handleChangeBanner={handleChangeBanner}
                />
                <Paper elevation={0} className="w-full rounded-t p-8">
                  <Grid container>
                    <Grid item lg={6}>
                      <ColorTemplates />
                    </Grid>
                    <Grid item lg={6}>
                      <TemplatePreview />
                    </Grid>
                  </Grid>
                </Paper>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="px-10"
                    disableElevation
                    disabled={formik.isSubmitting || uploadingFile}
                  >
                    Save
                  </Button>
                  <Button
                    variant="text"
                    disableElevation
                    className="ml-3"
                    onClick={handleCancelButton}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </TabPanel>
          </form>
        </Box>
        <Box
          className={
            loading
              ? "w-full h-[500px] flex justify-center items-center"
              : "hidden"
          }
        >
          <CircularProgress />
        </Box>
      </div>
      <FullPageLoader
        backdrop={{
          open: creatingStore,
          message: "Your storefront is being created",
        }}
      />
    </div>
  );
}

export default MyStorePage;

MyStorePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
