import { RootState } from "../configure";
import { ThemeState } from "../theme/types";

export const themeTypeSelector = (state: RootState): ThemeState["mode"] =>
  state.theme.mode;
