import { InputFieldProps } from "@/src/interfaces/interface";

export const getBorderStyle = (props: InputFieldProps): string => {
  if (props.error) {
    return "border-red-500 dark:border-red-600"; // Error state - red border
  }
  if (props.isFocused) {
    return "border-light-accent dark:border-dark-accent"; // Focused state - accent border
  }
  return "border-gray-200 dark:border-gray-700"; // Default state
};

export const getIconColor = (props: InputFieldProps): string => {
  if (props.error) {
    return "#e53935"; // Red color for error state
  }
  return "#71717a"; // Default gray color
};

export const getPlaceholderColor = (
  props: InputFieldProps,
  isDarkMode: boolean,
): string => {
  if (props.error) return "#ef5350";
  return isDarkMode ? "#71717a" : "#a1a1aa";
};

export const getTextColor = (
  props: InputFieldProps,
  isDarkMode: boolean,
): string => {
  if (props.error) return "#ef5350";
  return isDarkMode ? "#d4d4d8" : "#52525b";
};
