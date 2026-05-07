import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import Animated from "react-native-reanimated"

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  // ---------------- SIGN IN ----------------
  const handleSignIn = async () => {
    if (!isLoaded) return
    setLoading(true)
    setError(null)

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.replace('(drawer)')
      } else {
        console.log('Additional steps required:', result)
      }
    } catch (err) {
      setError(err)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  // ---------------- GUARD ----------------
  if (!isLoaded) return null

  return (
    <View className="flex-1 h-screen bg-background p-5 gap-3">
      <View className="flex-1 flex-row gap-3 items-center justify-center">
        <Text className="text-3xl text-white text-center font-bold mb-2">
          Error Solution
        </Text>
        <Animated.View className="h-7 w-7 bg-white rounded-full" />

      </View>
      <Text className="text-2xl text-white font-bold mb-2">
        Sign in
      </Text>

      {/* Email */}
      <Text className="text-white">Email address</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-white"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />

      {/* Password */}
      <Text className="text-white">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-white"
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Error */}
      {error && (
        <Text className="text-red-600 text-xs">
          {error?.errors?.[0]?.message}
        </Text>
      )}

      {/* Button */}
      <Pressable
        onPress={handleSignIn}
        disabled={!emailAddress || !password || loading}
        className={`py-3 px-6 rounded-lg items-center ${
          !emailAddress || !password || loading
            ? 'opacity-50 bg-[#0a7ea4]'
            : 'bg-[#0a7ea4]'
        }`}
      >
        <Text className="text-white font-semibold">
          Sign in
        </Text>
      </Pressable>

      {/* Link */}
      <View className="flex-row gap-1 mt-3">
        <Text className="text-white">Don't have an account?</Text>
        <Link href="/signup">
          <Text className="text-blue-500 font-semibold">
            Sign up
          </Text>
        </Link>
      </View>
    </View>
  )
}