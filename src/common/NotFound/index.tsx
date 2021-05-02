import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import FullScreenWrapper from "../FullScreenWrapper";

const NotFound = () => (
  <FullScreenWrapper>
    <Box>
      <Typography color="textPrimary" variant="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back To Home
      </Button>
    </Box>
  </FullScreenWrapper>
);

export default NotFound;
