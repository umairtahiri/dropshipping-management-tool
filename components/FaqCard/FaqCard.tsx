import { Box, Divider, Paper, Typography } from "@mui/material";
import * as React from "react";

interface FaqCardPropTypes {
  faq: {
    id: string;
    title: string;
    questions: Array<{
      id: string;
      query: string;
      answer: string;
    }>;
  };
}

export function FaqCard({ faq }: FaqCardPropTypes) {
  const { id, title, questions } = faq;
  return (
    <Box key={id}>
      <Typography
        variant="h4"
        className="ml-7 my-4 text-base sm:text-2xl sm:my-6"
      >
        {title}
      </Typography>
      <Paper elevation={0} className="w-full p-4 sm:p-8 rounded-t">
        {(questions || []).map((question, indx) => (
          <Box key={question?.id}>
            <Typography
              variant="h5"
              className="text-sm sm:text-lg"
              gutterBottom
            >
              {question?.query}
            </Typography>
            <Typography
              variant="body1"
              className="text-xs sm:text-base"
              gutterBottom
            >
              {question?.answer}
            </Typography>
            {indx !== questions.length - 1 && <Divider className="my-6" />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
