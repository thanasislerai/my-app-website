import { Box, Typography } from "@material-ui/core";
import React from "react";

const HomePage = () => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor="#0d1117"
    >
      <Typography
        color="textSecondary" 
        variant="h2"
      >
        Welcome!!
      </Typography>
    </Box>
  );
};

export default HomePage;
