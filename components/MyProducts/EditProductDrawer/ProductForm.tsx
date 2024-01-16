import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/redux/store";

import { replaceImageUrl } from "../../../lib/util";

interface ProductFormTypes {
  formik: any;
  imageUrl: string;
}

export default function ProductForm({ imageUrl, formik }: ProductFormTypes) {
  const menus = useSelector(
    (state: RootState) => state?.categories?.menusCategories
  );
  return (
    <Stack direction="row" spacing={3}>
      <Image
        src={replaceImageUrl(imageUrl) || ""}
        alt=""
        width={435}
        height={635}
      />
      <Box width="396px">
        <Stack direction="column" spacing={4}>
          <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Product Name:
            </Typography>
            <TextField
              id="name"
              name="name"
              placeholder="Product Name"
              variant="outlined"
              fullWidth
              value={formik?.values?.name}
              onChange={formik?.handleChange}
              error={formik?.touched?.name && Boolean(formik?.errors?.name)}
              helperText={formik?.touched?.name && formik?.errors?.name}
            />
          </FormControl>

          <FormControl>
            <Typography variant="h5" className="mb-2">
              Description:
            </Typography>
            <TextField
              id="description"
              name="description"
              multiline
              rows={10}
              placeholder="Description"
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
            />
          </FormControl>

          {/* NOTE: will be used later */}
          {/* <FormControl className="w-full">
            <Typography variant="h5" className="mb-2">
              Tags:
            </Typography>
            <TextField
              id="tags"
              name="tags"
              placeholder="Tags"
              variant="outlined"
              fullWidth
              value={formik?.values?.tags}
              onChange={formik?.handleChange}
              error={formik?.touched?.tags && Boolean(formik?.errors?.tags)}
              helperText={formik?.touched?.tags && formik?.errors?.tags}
            />
          </FormControl> */}

          <FormControl
            className="w-full"
            error={
              formik?.touched?.category && Boolean(formik?.errors?.category)
            }
          >
            <Typography variant="h5" className="mb-2">
              Product Type:
            </Typography>
            <Select
              labelId="demo-multiple-name-label"
              id="category"
              name="category"
              input={<OutlinedInput fullWidth placeholder="Please select" />}
              size="small"
              value={formik?.values?.category}
              onChange={formik?.handleChange}
            >
              {menus.map((menu: any) => (
                <MenuItem key={menu?.node?.id} value={menu?.node?.id}>
                  {menu?.node?.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik?.touched?.category && formik?.errors?.category}
            </FormHelperText>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
}
