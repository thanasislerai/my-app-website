import { Box, useTheme } from "@material-ui/core";
import { PropsWithChildren } from "react";

const FullScreenWrapper = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      pt="24px"
      pb="24px"
      bgcolor={theme.palette.background.default}
    >
      {children}
    </Box>
  );
};

export default FullScreenWrapper;
