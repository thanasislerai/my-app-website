import React from "react";
import { Box, Typography } from "@material-ui/core";

const NotFound = () => {
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
        Not found...
      </Typography>
    </Box>
  );
};

export default NotFound;
