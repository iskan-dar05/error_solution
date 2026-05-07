import { useAuth, useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import Animated from "react-native-reanimated"


export default function SignupScreen() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  // ---------------- SIGN UP ----------------
  const handleSubmit = async () => {
    if (!isLoaded) return
    setLoading(true)
    setError(null)

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
    } catch (err) {
      setError(err)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  // ---------------- VERIFY ----------------
  const handleVerify = async () => {
    if (!isLoaded) return
    setLoading(true)
    setError(null)

    try {
      await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId })
        router.replace('(drawer)')
      }
    } catch (err) {
      setError(err)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  // ---------------- GUARDS ----------------
  if (!isLoaded) return null
  if (isSignedIn) return null

  // ---------------- VERIFY SCREEN ----------------
  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields?.includes('email_address')
  ) {
    return (
      <View className="flex-1 p-5 gap-3">
        <Text className="text-2xl font-bold mb-2">
          Verify your account
        </Text>

        <TextInput
          className="border border-gray-300 rounded-lg p-3 bg-white"
          value={code}
          placeholder="Enter verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />

        {error && (
          <Text className="text-red-600 text-xs">
            {error?.errors?.[0]?.message}
          </Text>
        )}

        <Pressable
          onPress={handleVerify}
          disabled={loading}
          className={`py-3 px-6 rounded-lg items-center ${
            loading ? 'opacity-50' : 'bg-[#0a7ea4]'
          }`}
        >
          <Text className="text-white font-semibold">
            Verify
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            signUp.prepareEmailAddressVerification({
              strategy: 'email_code',
            })
          }
          className="mt-2"
        >
          <Text className="text-[#0a7ea4] font-semibold">
            Resend code
          </Text>
        </Pressable>
      </View>
    )
  }

  // ---------------- SIGNUP SCREEN ----------------
  return (
    <View className="flex-1 p-5 gap-3 bg-background">
      <View className="flex-1 flex-row gap-3 items-center justify-center">
        <Text className="text-3xl text-white text-center font-bold mb-2">
          Error Solution
        </Text>
        <Animated.View className="h-7 w-7 bg-white rounded-full" />
      </View>
      <Text className="text-2xl text-white font-bold mb-2">
        Sign up
      </Text>

      <Text className="text-white">Email address</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-white"
        value={emailAddress}
        onChangeText={setEmailAddress}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter email"
      />

      <Text className="text-white">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 bg-white"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
      />

      {error && (
        <Text className="text-red-600 text-xs">
          {error?.errors?.[0]?.message}
        </Text>
      )}

      <Pressable
        onPress={handleSubmit}
        disabled={!emailAddress || !password || loading}
        className={`py-3 px-6 rounded-lg items-center ${
          !emailAddress || !password || loading
            ? 'opacity-50 bg-[#0a7ea4]'
            : 'bg-[#0a7ea4]'
        }`}
      >
        <Text className="text-white font-semibold">
          Sign up
        </Text>
      </Pressable>

      <View className="flex-row gap-1 mt-3">
        <Text className="text-white">Already have an account?</Text>
        <Link href="/signin">
          <Text className="text-blue-500 font-semibold">
            Sign in
          </Text>
        </Link>
      </View>

      <View nativeID="clerk-captcha" />
    </View>
  )
}