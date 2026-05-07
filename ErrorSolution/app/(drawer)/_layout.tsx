import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useUser, useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"



// Custom Drawer Content using NativeWind classes
function CustomDrawerContent(props: any) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        {/* Header with User Email */}
        <View className="p-5 border-b border-gray-200 mb-2 items-start">
          <TouchableOpacity 
            className="mt-2 py-1" 
            onPress={() => setShowLogout(!showLogout)}
          >
            <Text className="text-red-500 font-medium">{user?.primaryEmailAddress?.emailAddress}</Text>
          </TouchableOpacity>
          {showLogout && (
          <TouchableOpacity 
              className="mt-2 py-1" 
              onPress={() => signOut()}
              >
              <Text className="text-red-500 font-medium">Logout</Text>
          </TouchableOpacity>
          )}
          
          
          
        </View>

        {/* The list of navigation items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1 h-screen bg-white">
       <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerTitle: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },

          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              className="absolute top-[-7px] left-[10px]"
            >
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="chat/[id]"
          options={{ 
            drawerLabel: 'New Chat', 
            title: 'New Chat' 
          }}
        />
        <Drawer.Screen
          name="history"
          options={{ 
            drawerLabel: 'History', 
            title: 'History' 
          }}
        />
        <Drawer.Screen
          name="settings/index"
          options={{ 
            drawerLabel: 'Settings', 
            title: 'Settings' 
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{ 
            drawerLabel: 'My Profile', 
            title: 'Profile' 
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
