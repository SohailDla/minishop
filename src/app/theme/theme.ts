export type AppTheme = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
};

export const lightTheme: AppTheme = {
  background: "#ffffff",
  card: "#ffffff",
  text: "#111111",
  mutedText: "#555555",
  border: "#dddddd",
};

export const darkTheme: AppTheme = {
  background: "#0b0b0f",
  card: "#15151c",
  text: "#f2f2f2",
  mutedText: "#bdbdbd",
  border: "#2a2a33",
};
