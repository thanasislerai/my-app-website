import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import FullScreenWrapper from "../FullScreenWrapper";

const NotFound = () => (
  <FullScreenWrapper>
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography align="center" color="textPrimary" variant="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back To Home
      </Button>
    </Box>
  </FullScreenWrapper>
);

export default NotFound;
