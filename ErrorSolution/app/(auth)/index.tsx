import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router'


import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing
} from "react-native-reanimated";

export default function AuthIndex() {

  const router = useRouter()

  // start from bottom
  const translateY = useSharedValue(400);
  const scale = useSharedValue(1);

  useEffect(()=> {
    scale.value = withRepeat(
      withTiming(1.5, {
        duration: 800,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  useEffect(() => {
    // move card upward
    translateY.value = withTiming(0, {
      duration: 1000,
    });
  }, []);

  const upAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View className="flex-1 bg-background items-center">
      <Animated.View style={scaleAnimatedStyle} className="absolute top-[40%] h-7 w-7 bg-white rounded-full" />
    {/* Animated Card */}
      <Animated.View
        style={upAnimatedStyle}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] px-6 pt-10 pb-12"
      >

        {/* Email */}
        <TouchableOpacity
          className="bg-black h-14 rounded-2xl items-center justify-center flex-row mb-4"
          onPress={()=>router.replace("(auth)/signin")}
        >
          <Ionicons name="mail-outline" size={22} color="white" />

          <Text className="text-white font-semibold ml-3">
            Continue with Email
          </Text>
        </TouchableOpacity>

        {/* GitHub */}
        <TouchableOpacity
          className="border border-zinc-300 h-14 rounded-2xl items-center justify-center flex-row mb-4"
        >
          <Ionicons name="logo-github" size={22} color="black" />

          <Text className="text-black font-semibold ml-3">
            Continue with GitHub
          </Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          className="border border-zinc-300 h-14 rounded-2xl items-center justify-center flex-row"
        >
          <Ionicons name="logo-google" size={22} color="#EA4335" />

          <Text className="text-black font-semibold ml-3">
            Continue with Google
          </Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}