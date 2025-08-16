import { InputFieldProps } from "@/src/interfaces/interface";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getBorderStyle,
  getIconColor,
  getPlaceholderColor,
  getTextColor,
} from "./inputFieldHelpers";
import ValidationError from "./ValidationError";

const InputField: React.FC<InputFieldProps> = (props) => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const placeholderColor = getPlaceholderColor(props, isDarkMode);
  const inputTextClasses = clsx([
    "ml-2 flex-1 text-gray-700",
    props.error && "text-red-600",
  ]);

  return (
    <View className="mb-4">
      <View className={`input border-[1.5px] ${getBorderStyle(props)}`}>
        {/* Start Icon */}
        {props.leftIcon && (
          <Ionicons
            name={props.leftIcon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={getIconColor(props)}
          />
        )}

        {/* TextInput */}
        <TextInput
          className={inputTextClasses}
          placeholder={props.placeholder}
          placeholderTextColor={placeholderColor}
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry ?? false}
          editable={props.editable ?? true}
          autoCapitalize={props.autoCapitalize ?? "none"}
          keyboardType={props.keyboardType ?? "default"}
          returnKeyType={props.returnKeyType ?? "done"}
          textContentType={
            props.textContentType as TextInputProps["textContentType"]
          }
          autoComplete={props.autoComplete as TextInputProps["autoComplete"]}
          onBlur={props.onBlur}
          onSubmitEditing={props.onSubmitEditing}
          accessibilityLabel={props.accessibilityLabel}
          ref={props.inputRef}
          onFocus={props.onFocus}
          style={{
            color: getTextColor(props, isDarkMode),
            fontFamily: "Nexa-400",
          }}
          cursorColor={isDarkMode ? "#00a377" : "#4d7111"}
          selectionColor={isDarkMode ? "#00a377" : "#effbcc"}
        />

        {/* End Icon */}
        {props.rightIcon && (
          <TouchableOpacity
            onPress={() => {
              if (props.onRightIconPress) props.onRightIconPress();
            }}
            accessibilityLabel={props.rightIconAccessibleLabel}
            className="ml-2"
          >
            <Ionicons
              name={props.rightIcon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={getIconColor(props)}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Text */}
      {props.error && <ValidationError message={props.error} />}
    </View>
  );
};

export default InputField;
