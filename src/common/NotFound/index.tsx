import { Link } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@material-ui/core";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor={theme.palette.background.default}
    >
      <Box>
        <Typography color="textSecondary" variant="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back To Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
