// app/history.tsx

import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock3, ChevronRight } from 'lucide-react-native';
import { useState, useEffect } from 'react'
import { timeFormating } from '../../utils/timeFormator'
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'


interface History{
  id: string;
  title: string;
  created_at: string;
}

export default function HistoryScreen() {
  const { getToken } = useAuth()
  const router = useRouter()
  const [histories, setHistories] = useState<History[]>([])

  useEffect(() => {
    const fecthHistories = async () => {
      try{
        const token = await getToken()
        const res = await fetch("http://192.168.1.12:8000/chats", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const data = await res.json();
        console.log(data)
        const formatData = data.map((item: History)=>({
          ...item,
          created_at: timeFormating(item.created_at)
        }))

        setHistories(formatData)
      }catch(error){
        console.log("History Error: ", error)
      }
    };

    fecthHistories()

  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      
      {/* Header */}
      <View className="py-6">
        <Text className="text-3xl font-bold text-black">
          History
        </Text>

        <Text className="text-zinc-400 mt-1">
          Your previous AI conversations
        </Text>
      </View>

      {/* History List */}
      <FlatList
        data={histories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white border border-zinc-800 rounded-2xl p-4 mb-3 flex-row items-center justify-between"
            onPress={()=>router.replace(`/chat/${item.id}`)}
          >
            {/* Left */}
            <View className="flex-row items-center flex-1">
              
              {/* Icon */}
              <View className="w-12 h-12 rounded-xl bg-zinc-800 items-center justify-center mr-3">
                <Clock3 size={22} color="#ffffff" />
              </View>

              {/* Texts */}
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-black text-base font-semibold"
                >
                  {item.title}
                </Text>

                <Text className="text-zinc-400 text-sm mt-1">
                  {item.created_at}
                </Text>
              </View>
            </View>

            {/* Arrow */}
            <ChevronRight size={20} color="#71717a" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}