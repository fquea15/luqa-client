import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon: Icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={"my-2 w-full"}>
          <Text className={cn("mb-3 text-lg text-primary-500", labelStyle)}>{label}</Text>
          <View
            className={cn(
              "relative flex flex-row items-center justify-start border border-neutral-100 bg-background-300 focus:border-secondary-500",
              isFocused ? "border-secondary-500" : "border-background-400",
              containerStyle
            )}
          >
            {Icon && (
              <View className={"ml-4"}>
                <Icon className={cn(iconStyle)} color={"#9EA8B9"} size={20} />
              </View>
            )}
            <TextInput
              className={cn(
                "font-JakartaSemiBold flex-1 rounded-full p-4 text-[15px] placeholder:text-neutral-500",
                inputStyle,
                "text-left"
              )}
              secureTextEntry={secureTextEntry}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default InputField;
