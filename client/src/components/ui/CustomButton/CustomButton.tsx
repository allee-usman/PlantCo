import { ButtonProps } from "@/src/interfaces/interface";
import { useColorScheme } from "nativewind";
import { clsx } from "clsx";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getBgVariantStyle, getTextVariantStyle } from "./buttonHelpers";

const CustomButton: React.FC<ButtonProps> = ({
  label,
  loading,
  disabled,
  onPress,
  bgVariant = "gradient",
  textVariant = "default",
  Icon,
  iconPosition = "start",
  accessibilityLabel,
  accessibilityRole = "button",
  className,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const isGradient = bgVariant === "gradient";

  const gradientImage = isDark
    ? require("@/assets/images/button-dark.png")
    : require("@/assets/images/light-dark.png");

  const baseClasses =
    "justify-center items-center flex-row rounded-full h-14 px-4";

  const buttonClasses = clsx(
    baseClasses,
    getBgVariantStyle(bgVariant, isDark),
    className,
  );

  const content = (
    <View className="flex-row items-center justify-center space-x-2">
      {loading && (
        <ActivityIndicator className="mr-2" size="small" color="#fff" />
      )}
      {iconPosition === "start" && Icon && <Icon />}
      <Text
        className={`text-body-lg font-nexa-bold tracking-wide ${getTextVariantStyle(
          textVariant,
          isDark,
        )}`}
      >
        {label}
      </Text>
      {iconPosition === "end" && Icon && <Icon />}
    </View>
  );

  if (isGradient) {
    return (
      <ImageBackground
        source={gradientImage}
        resizeMode="cover"
        className={clsx(baseClasses, "overflow-hidden", className)}
      >
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={onPress}
          disabled={disabled || loading}
          activeOpacity={0.8}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityRole={accessibilityRole}
        >
          {content}
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
    >
      {content}
    </TouchableOpacity>
  );
};

export default CustomButton;
