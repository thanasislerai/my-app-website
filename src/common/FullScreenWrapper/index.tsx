import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const FullScreenWrapper = ({ children }: PropsWithChildren<{}>) => (
  <Box flexGrow={1} bgcolor="background.default">
    {children}
  </Box>
);

export default FullScreenWrapper;
