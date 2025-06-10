import { TextInputProps, TouchableOpacityProps } from "react-native";
import { ComponentType } from "react";
import { LucideIcon } from "lucide-react-native";

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
  label: string;
  icon?: LucideIcon;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

export type RootDrawerParamList = {
  "(tabs)": undefined;
  "(route)": undefined;
  "(home)": undefined;
  profile: undefined;
};
