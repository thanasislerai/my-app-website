import { RootState } from "../configure";
import { ThemeState } from "../theme/types";

export const themeTypeSelector = (state: RootState): ThemeState["type"] =>
  state.theme.type;
