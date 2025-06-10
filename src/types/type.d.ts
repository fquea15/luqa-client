import { LucideIcon } from "lucide-react-native";
import { ComponentType } from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

// CustomButton types
declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: ComponentType<any>;
  IconRight?: ComponentType<any>;
  className?: string;
}

// InputFiled Types
declare interface InputFieldProps extends TextInputProps {
  icon?: LucideIcon;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  medium?: boolean;
}
