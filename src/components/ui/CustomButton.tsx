import { cn } from "@/shared/lib/utils";
import { ButtonProps } from "@/types/type";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-secondary-600";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-primary-500";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-neutral-900";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={cn(
      "flex w-full flex-row items-center justify-center rounded-full p-3 shadow-md shadow-neutral-400/70",
      getBgVariantStyle(bgVariant),
      className
    )}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={cn("text-lg font-bold", getTextVariantStyle(textVariant))}>{title}</Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);
export default CustomButton;
