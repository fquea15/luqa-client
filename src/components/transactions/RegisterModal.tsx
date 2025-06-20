import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { amount: number; description: string }) => void;
}

export default function RegisterModal({ visible, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const speak = () => {
    const example = "Gasté 20 soles en comida";
    Speech.speak("Por favor, di algo como: " + example);
  };

  const simulateVoiceInput = () => {
    const simulatedText = "Gasté 25 soles en transporte";

    const montoMatch = simulatedText.match(/(\d+(?:[\.,]\d+)?)/);
    const descMatch = simulatedText.match(/en (.+)/i);

    if (montoMatch && descMatch) {
      const monto = parseFloat(montoMatch[1]);
      const descripcion = descMatch[1];

      setAmount(monto);
      setDescription(descripcion);

      Alert.alert("🎤 Entrada por voz", `Monto: ${monto}\nDescripción: ${descripcion}`);
    } else {
      Alert.alert("❌ No se pudo reconocer la voz correctamente");
    }
  };

  const handleSave = () => {
    if (!amount || !description) {
      Alert.alert("Campos incompletos", "Ingresa monto y descripción.");
      return;
    }
    onSubmit({ amount, description });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}> Registrar Movimiento</Text>

          <TextInput
            placeholder="Monto en soles"
            keyboardType="numeric"
            value={amount.toString()}
            onChangeText={(text) => setAmount(parseFloat(text) || 0)}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="¿En qué lo gastaste?"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <Text style={styles.hintText}>Puedes usar tu voz para llenar los campos</Text>

          <TouchableOpacity onPress={simulateVoiceInput} style={styles.micButtonCentered}>
            <Ionicons name="mic" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={speak}>
            <Text style={[styles.hintText, { marginTop: 8 }]}>¿Ejemplo?</Text>
          </TouchableOpacity>

          <View style={styles.actions}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#f5f9ff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    borderColor: "#cfd8dc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "white",
    fontSize: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  micButtonCentered: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 50,
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelText: {
    color: "#888",
    fontSize: 16,
  },
});
