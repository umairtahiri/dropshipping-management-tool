import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LanguageIcon from "@mui/icons-material/Language";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

import { FileUpload } from "../../FileUpload/FileUpload";

interface ProfilePropTypes {
  formik?: any;
  logo: string;
  storefrontUrl: string;
  handleChangeLogo?: (file: File) => void;
}

export function Profile({
  formik,
  logo,
  storefrontUrl,
  handleChangeLogo,
}: ProfilePropTypes) {
  const getInputProps = (key) => {
    const isFilled = Boolean(formik?.values?.[key]);
    return {
      style: { color: isFilled ? "#4bbcaa" : "#bdbdbd" },
    };
  };

  const brokenStorefrontUrl = ((storefrontUrl || "").split(".sharove.co") ||
    [])[0];

  return (
    <Paper elevation={0} className="w-full rounded-t p-4 md:p-8">
      <Typography variant="h4" gutterBottom component="div">
        Profile
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et.
      </Typography>
      <Grid container className="mt-2" spacing={3}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Store Name *:
            </Typography>
            <TextField
              id="name"
              name="name"
              placeholder="Store Name"
              variant="outlined"
              fullWidth
              value={formik?.values?.name}
              onChange={formik?.handleChange}
              error={formik?.touched?.name && Boolean(formik?.errors?.name)}
              helperText={formik?.touched?.name && formik?.errors?.name}
              InputProps={getInputProps("name")}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Store URL:
            </Typography>
            <Box className="h-[39px] border border-[#00000042] rounded w-full px-4 py-2 flex justify-between">
              <Box className="flex gap-x-3.5">
                <LanguageIcon
                  className={
                    brokenStorefrontUrl ? "sharove-color" : "text-[#bdbdbd]"
                  }
                />
                {brokenStorefrontUrl ? (
                  <Tooltip title="Visit your storefront" placement="top">
                    <Link
                      passHref
                      href={`https://${storefrontUrl}`}
                      target="_blank"
                    >
                      <Typography variant="body1" className="sharove-color">
                        {brokenStorefrontUrl}
                      </Typography>
                    </Link>
                  </Tooltip>
                ) : (
                  <Typography variant="body1" className="text-[#e3e3e3]">
                    Store URL
                  </Typography>
                )}
              </Box>

              <Box className="flex gap-x-5">
                <Typography
                  variant="h5"
                  className={
                    brokenStorefrontUrl ? "sharove-color" : "text-[#bdbdbd]"
                  }
                >
                  .sharove.co
                </Typography>
                <CheckCircleRoundedIcon
                  className={
                    brokenStorefrontUrl ? "sharove-color" : "text-[#bdbdbd]"
                  }
                />
              </Box>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              About Store:
            </Typography>
            <TextField
              id="description"
              name="description"
              multiline
              rows={4}
              placeholder="About Store"
              fullWidth
              value={formik?.values?.description}
              onChange={formik?.handleChange}
              error={
                formik?.touched?.description &&
                Boolean(formik?.errors?.description)
              }
              helperText={
                formik?.touched?.description && formik?.errors?.description
              }
              InputProps={getInputProps("description")}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6} className="hidden md:block">
          <Box className="mt-8">
            <FileUpload
              url={logo}
              height="125px"
              sizeDetails="177 x 28 recommended size"
              title="Upload Store Logo"
              uploadFile={handleChangeLogo}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
