import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	FlatList,
	KeyboardAvoidingView,
	Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { ChevronUp } from 'lucide-react-native'

interface Message{
	id: string;
	role: string;
	message: string
}

export default function SettingsScreen(){
	const { getToken } = useAuth()
	const { id } = useLocalSearchParams()

	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState("")
	const [loading, setLoading] = useState(false)

	// GET CHAT
	useEffect(() => {
		const getChat = async () => {
			try{
				const token = await getToken()

				if(!id) return;

				const res = await fetch(`http://192.168.1.12:8000/chat/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				const data = await res.json()
				setMessages(data)

			}catch(error){
				console.log(error)
			}
		}

		getChat()
	}, [id])






	// SEND MESSAGE
	const sendMessage = async () => {
		try{
			if(!input.trim()) return;

			setLoading(true)

			const token = await getToken()

			// ADD USER MESSAGE DIRECTLY
			const userMessage: Message = {
				id: Date.now().toString(),
				role: "user",
				message: input
			}

			setMessages(prev => [...prev, userMessage])

			const currentInput = input
			setInput("")

			const res = await fetch(
				"http://192.168.1.12:8000/message/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
						chat_id: id ?? null,
						message: currentInput
					})
				}
			)

			const data = await res.json()

			// AI MESSAGE
			const aiMessage: Message = {
				id: `${Date.now()}-ai`,
				role: "assistant",
				message: data.response
			}

			setMessages(prev => [...prev, aiMessage])

		}catch(error){
			console.log(error)
		}finally{
			setLoading(false)
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>

				{/* CHAT LIST */}
				<FlatList
					data={messages}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						padding: 16,
						paddingBottom: 100
					}}
					renderItem={({ item }) => (
						<View
							className={`
								max-w-[80%]
								p-4
								mb-4
								rounded-3xl
								${item.role === "user"
									? "bg-black self-end"
									: "bg-gray-100 self-start"
								}
							`}
						>
							{
								item.role === "user" ? (
								<Text
									className={
										item.role === "user"
											? "text-white text-base"
											: "text-black text-base"
									}
								>
									{item.message}
								</Text>
							): (
								<View>
									{item.message.map((obj, idx) => (
										<View key={idx}>
											{
												Object.entries(obj).map(([key, value])=>(
													<Text key={key}>
														{key}: {String(value)}
													</Text>
												))
											}
										</View>
									))}
								</View>
							)}
							
						</View>
					)}
				/>

				{/* INPUT */}
				<View className="px-4 pb-5">
					<View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">

						<TextInput
							value={input}
							onChangeText={setInput}
							placeholder="Message..."
							className="flex-1 text-base py-3"
							multiline
						/>

						<TouchableOpacity
							onPress={sendMessage}
							disabled={loading}
							className="bg-black w-10 h-10 rounded-full items-center justify-center"
						>
							<ChevronUp color="white" size={22} />
						</TouchableOpacity>

					</View>
				</View>

			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}