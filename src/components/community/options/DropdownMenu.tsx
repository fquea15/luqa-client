// components/community/DropdownMenu.tsx
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface MenuOption {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean; // Para opciones de eliminar, etc.
}

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  options: MenuOption[];
  anchorPosition?: { x: number; y: number }; // Posición del botón que activó el menú
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  onClose,
  options,
  anchorPosition = { x: screenWidth - 20, y: 100 }, // Posición por defecto (esquina superior derecha)
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Calcular posición del menú
  const menuWidth = 200;
  const menuHeight = options.length * 50 + 20;
  
  const left = Math.min(anchorPosition.x - menuWidth + 50, screenWidth - menuWidth - 9);
  const top = Math.min(anchorPosition.y - 50, screenHeight - menuHeight - 50);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                left: left,
                top: top,
                transform: [
                  { scale: scaleAnim },
                  { translateY: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }) }
                ],
                opacity: opacityAnim,
              },
            ]}
          >
            {/* Pequeña flecha apuntando hacia arriba */}
            <View style={[styles.arrow, { right: 15 }]} />
            
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  index === options.length - 1 && styles.lastOption,
                ]}
                onPress={() => {
                  option.onPress();
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  {option.icon && (
                    <Text style={styles.icon}>{option.icon}</Text>
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      option.destructive && styles.destructiveText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 12,
    minWidth: 180,
    maxWidth: 220,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  arrow: {
    position: "absolute",
    top: -6,
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
    textAlign: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "400",
  },
  destructiveText: {
    color: "#FF3B30",
  },
});

export default DropdownMenu;