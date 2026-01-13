import { useAppSelector } from "../store";
import { selectIsDark } from "../store/themeSlice";
import { darkTheme, lightTheme } from "./theme";

export function useTheme() {
  const isDark = useAppSelector(selectIsDark);
  return isDark ? darkTheme : lightTheme;
}
