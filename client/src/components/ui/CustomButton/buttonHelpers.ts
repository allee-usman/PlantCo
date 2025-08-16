import { ButtonProps } from "@/src/interfaces/interface";

export const getBgVariantStyle = (
  variant: ButtonProps["bgVariant"],
  isDark: boolean,
) => {
  switch (variant) {
    case "primary":
      return `${isDark ? "bg-dark-pallete-500" : "bg-light-pallete-500"}`;
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return `bg-transparent ${
        isDark ? "border-dark-pallete-500" : "border-light-pallete-500"
      } border-[1.5px]`;
    default:
      return "bg-transparent";
  }
};

export const getTextVariantStyle = (
  variant: ButtonProps["textVariant"],
  isDark: boolean,
) => {
  switch (variant) {
    case "primary":
      return `${isDark ? "text-dark-pallete-950" : "text-light-pallete-950"}`;
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    case "gradient":
      return "text-white";
    default:
      return `${isDark ? "text-white" : "text-light-pallete-900"}`;
  }
};
