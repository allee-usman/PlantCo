import { TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;

  Icon?: React.ComponentType<{ size?: number; color?: string; name?: string }>;
  iconPosition?: "start" | "end"; // default: 'start'

  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "gradient"; // default: 'gradient'
  textVariant?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "gradient"; // default: 'gradient'

  size?: "sm" | "md" | "lg"; // default: 'md'
  accessibilityLabel?: string;
  accessibilityRole?: "button" | "link";

  className?: string;
}
