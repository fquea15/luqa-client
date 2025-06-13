import axios from "axios";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function QuestionCard({ questions, lessonId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentIndex];

  const handleSelect = async (option: any) => {
    setSelectedOptionId(option.answerId);
    setIsCorrect(option.isCorrect);
    setShowFeedback(true);

    try {
      if (option.isCorrect) {
        await axios.put(`${API_URL}/UserStats/2/add-points`, { totalPoints: 15 });
      } else {
        await axios.put(`${API_URL}/UserStats/2/remove-life`);
      }
    } catch (error) {
      console.error("⚠️ Error actualizando user_stats:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setIsCorrect(null);
      setShowFeedback(false);
    } else {
      alert("¡Lección finalizada!");
    }
  };

  return (
    <View className="flex-1 bg-background-100 p-6 justify-center">
      <Text className="text-xl font-bold text-textPrimary-800 mb-4">{question.text}</Text>

      {question.options?.map((opt: any) => {
        const isSelected = selectedOptionId === opt.answerId;
        const optionStyle =
          isSelected && showFeedback
            ? opt.isCorrect
              ? "bg-success-500"
              : "bg-danger-500"
            : "bg-neutral-200";

        return (
          <TouchableOpacity
            key={opt.answerId}
            className={`p-4 rounded-lg mb-3 ${optionStyle}`}
            disabled={showFeedback}
            onPress={() => handleSelect(opt)}
          >
            <Text className="text-base text-textPrimary-800">{opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <View className="items-center mt-6">
          <Image
            source={require("@/assets/logo/logo-main.png")}
            className="w-20 h-20 mb-4"
          />
          <Text className="text-center text-textSecondary-500 mb-4">
            {
              question.options.find(
                (opt: any) => opt.answerId === selectedOptionId
              )?.feedback
            }
          </Text>

          <TouchableOpacity
            className="bg-secondary-500 px-6 py-3 rounded-full"
            onPress={handleNext}
          >
            <Text className="text-white font-semibold text-base">Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
