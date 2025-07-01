import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  questions: any[];
  lessonId: number;
  onFinish?: (answeredCorrectly: boolean) => void;
  onReplay?: () => void;
}

export default function QuestionCard({ questions, lessonId, onFinish, onReplay }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<{ isCorrect: boolean }[]>([]);

  const question = questions[currentIndex];

  const handleSelect = async (option: any) => {
    setSelectedOptionId(option.answerId);
    setIsCorrect(option.isCorrect);
    setShowFeedback(true);
    setAnswers(prev => [...prev, { isCorrect: option.isCorrect }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  };

  const handleReplay = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setAnswers([]);
    onReplay?.();
  };

  const isLast = currentIndex === questions.length - 1 && showFeedback;

  const allCorrect = answers.every(a => a.isCorrect);

  return (
    <View className="bg-white rounded-3xl p-6 shadow-2xl justify-center">
      <Text className="text-2xl font-extrabold text-center text-primary-600 mb-6 leading-relaxed">
        {question.text}
      </Text>

      {question.options.map((opt: any) => {
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
            className={`p-5 rounded-2xl mb-4 ${optionStyle}`}
            disabled={showFeedback}
            onPress={() => handleSelect(opt)}
          >
            <Text className="text-base text-black text-center font-medium">{opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <View className="items-center mt-6 px-3">
          <Image
            source={
              isCorrect
                ? require("@/assets/images/correcta.png")
                : require("@/assets/images/incorrecta.png")
            }
            className="w-32 h-32 mb-4 rounded-full shadow-md"
            resizeMode="contain"
          />

          <View
            className={`flex-row items-center bg-white px-4 py-3 mb-4 rounded-xl border ${
              isCorrect ? "border-success-500" : "border-danger-500"
            }`}
          >
            <FontAwesome
              name={isCorrect ? "check-circle" : "times-circle"}
              size={22}
              color={isCorrect ? "#22c55e" : "#ef4444"}
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-700 text-base text-center flex-1">
              {question.options.find((opt: any) => opt.answerId === selectedOptionId)?.feedback}
            </Text>
          </View>

          {!isLast ? (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-secondary-600 px-8 py-3 rounded-full shadow-lg flex-row items-center space-x-2"
            >
              <FontAwesome name="arrow-right" size={16} color="#fff" />
              <Text className="text-white text-base font-semibold">Continuar</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={handleReplay}
                className="bg-white px-6 py-3 rounded-full border border-primary-500"
              >
                <Text className="text-primary-500 font-semibold">Volver a ver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onFinish?.(allCorrect)}
                className="bg-secondary-600 px-6 py-3 rounded-full shadow-lg"
              >
                <Text className="text-white font-semibold">Siguiente lección</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
