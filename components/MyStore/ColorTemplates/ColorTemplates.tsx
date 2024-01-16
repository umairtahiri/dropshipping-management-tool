import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

import { templateLists } from "@/lib/templates";

export const TemplateCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "25px",
  border: `2px solid ${theme.palette.background.default}`,
  cursor: "pointer",
  position: "relative",
  borderRadius: "6px",
  "&.selected": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  ".MuiSvgIcon-root": {
    color: "#4bbcaa",
  },
}));

interface TemplateTypes {
  name: string;
  background: string;
  textColor: string;
  buttonBackground: string;
  buttonTextColor: string;
  isSelected: boolean;
}

export function ColorTemplates() {
  const [templates, setTemplates] = useState<Array<TemplateTypes>>([]);

  useEffect(() => {
    setTemplates(templateLists);
  }, [templateLists]);

  const selectTemplate = (name) => {
    setTemplates(
      (templates || []).map((template) => {
        if (template?.name === name) {
          return {
            ...template,
            isSelected: true,
          };
        }
        return {
          ...template,
          isSelected: false,
        };
      })
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom component="div">
        Color Templates
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et.
      </Typography>
      <Grid container className="mt-2" spacing={2}>
        {(templates || []).map((template) => {
          const {
            name,
            background,
            textColor,
            buttonBackground,
            buttonTextColor,
            isSelected,
          } = template;
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Box>
                <TemplateCard
                  sx={{ background }}
                  className={isSelected ? "selected" : ""}
                  onClick={() => selectTemplate(name)}
                >
                  {isSelected && (
                    <CheckCircleIcon className="absolute right-1.5 top-1.5 z-10" />
                  )}
                  <Typography
                    className="text-5xl	font-medium mb-12"
                    sx={{ color: textColor }}
                  >
                    Aa
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ background: `${buttonBackground} !important` }}
                  >
                    <Typography variant="h6" sx={{ color: buttonTextColor }}>
                      Aa
                    </Typography>
                  </Button>
                </TemplateCard>
                <Typography variant="body1" className="mt-2">
                  {name}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
