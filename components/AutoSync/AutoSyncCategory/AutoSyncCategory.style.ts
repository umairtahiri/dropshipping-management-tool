import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

interface StyledLinearProps {
  success?: boolean;
}

export const CategoryItem = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "success",
})<StyledLinearProps>(({ success, theme }) => ({
  height: 8,
  borderRadius: 25,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.paper,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 25,
    ...(success
      ? {
          backgroundColor: "#4bbcaa",
        }
      : {
          backgroundColor: "#333333",
        }),
  },
}));
