import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface SocialPropTypes {
  formik: any;
}

export function Social({ formik }: SocialPropTypes) {
  return (
    <Paper elevation={0} className="w-full rounded-t p-4 md:p-8">
      <Typography variant="h4" gutterBottom component="div">
        Social
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et.
      </Typography>
      <Grid container className="mt-2" spacing={3}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Facebook:
            </Typography>
            <TextField
              id="facebook"
              placeholder="Facebook"
              variant="outlined"
              fullWidth
              name="facebook"
              value={formik?.values?.facebook}
              onChange={formik?.handleChange}
              error={
                formik?.touched?.facebook && Boolean(formik?.errors?.facebook)
              }
              helperText={formik?.touched?.facebook && formik?.errors?.facebook}
              InputProps={{
                style: {
                  color: formik?.values?.facebook ? "#4bbcaa" : "#bdbdbd",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon
                      className={
                        formik?.values?.facebook ? "sharove-color" : ""
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Instagram:
            </Typography>
            <TextField
              id="instagram"
              placeholder="Instagram"
              variant="outlined"
              fullWidth
              name="instagram"
              value={formik?.values?.instagram}
              onChange={formik?.handleChange}
              error={
                formik?.touched?.instagram && Boolean(formik?.errors?.instagram)
              }
              helperText={
                formik?.touched?.instagram && formik?.errors?.instagram
              }
              InputProps={{
                style: {
                  color: formik?.values?.instagram ? "#4bbcaa" : "#bdbdbd",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon
                      className={
                        formik?.values?.instagram ? "sharove-color" : ""
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Twitter:
            </Typography>
            <TextField
              id="twitter"
              placeholder="Twitter"
              variant="outlined"
              fullWidth
              name="twitter"
              value={formik?.values?.twitter}
              onChange={formik?.handleChange}
              error={
                formik?.touched?.twitter && Boolean(formik?.errors?.twitter)
              }
              helperText={formik?.touched?.twitter && formik?.errors?.twitter}
              InputProps={{
                style: {
                  color: formik?.values?.twitter ? "#4bbcaa" : "#bdbdbd",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon
                      className={formik?.values?.twitter ? "sharove-color" : ""}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Pinterest:
            </Typography>
            <TextField
              id="pinterest"
              placeholder="Pinterest"
              variant="outlined"
              fullWidth
              name="pinterest"
              value={formik?.values?.pinterest}
              onChange={formik?.handleChange}
              error={
                formik?.touched?.pinterest && Boolean(formik?.errors?.pinterest)
              }
              helperText={
                formik?.touched?.pinterest && formik?.errors?.pinterest
              }
              InputProps={{
                style: {
                  color: formik?.values?.pinterest ? "#4bbcaa" : "#bdbdbd",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PinterestIcon
                      className={
                        formik?.values?.pinterest ? "sharove-color" : ""
                      }
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
