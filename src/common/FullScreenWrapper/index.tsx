import { Box, useTheme } from "@material-ui/core";
import { PropsWithChildren } from "react";

const FullScreenWrapper = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  return (
    <Box flexGrow={1} py={3} bgcolor={theme.palette.background.default}>
      {children}
    </Box>
  );
};

export default FullScreenWrapper;
