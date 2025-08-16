import { Ionicons, Octicons } from "@expo/vector-icons";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInput,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from "react-native";
import { AutoCapitalize, TextContentType } from "../enums";

export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon: keyof typeof Ionicons.glyphMap | keyof typeof Octicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap | keyof typeof Octicons.glyphMap;
  onRightIconPress?: () => void;
  rightIconAccessibleLabel?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  autoCapitalize?: AutoCapitalize;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  autoComplete?: string;
  textContentType?: TextContentType;
  error?: string | null;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  accessibilityLabel?: string;
  inputRef?: React.Ref<TextInput> | null;

  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  isFocused?: boolean;
  fieldName?: "email" | "password" | "username" | string; // For identifying which field is focused
  focusedBorderColor?: string; // Custom focus border color
  defaultBorderColor?: string; // Default border color
}
