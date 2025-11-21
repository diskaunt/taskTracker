import { createContext, useCallback, useMemo, useState } from "react";

export interface ThemeProviderProps {
  children: React.ReactNode;
}
export type Theme = "light" | "dark";

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}>({ theme: "light", toggleTheme: () => {} });

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const setItemLocalStorage = (name: string, data: Theme) => {
    localStorage.setItem(name, data);
  };
  const getItemLocalStorage = (name: string) => {
    return localStorage.getItem(name);
  };

  const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  const themeInpput =
    (getItemLocalStorage("theme") as Theme) || prefersColorScheme;

  const [theme, setTheme] = useState<Theme>(themeInpput);

  const toggleTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    setItemLocalStorage("theme", theme);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
