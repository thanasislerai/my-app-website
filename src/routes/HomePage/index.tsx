import { Box, Typography, Button, useTheme } from "@material-ui/core";

const HomePage = () => {
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
          Welcome!!
        </Typography>
        <Button variant="contained" color="primary">
          Start Journey
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
