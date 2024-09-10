import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { View } from 'react-native';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!




const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const segment = useSegments()
  const { isSignedIn, isLoaded } = useAuth()

   if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segment[0] === '(tabs)'

    console.log('isSignedIn changed', isSignedIn);
    
    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats')
    }else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return <View/>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerTitle: 'Enter your phone number', headerTitleAlign: 'center', headerBackVisible: false }} />
      <Stack.Screen name="verify/[phone]" options={{  headerTitleAlign: 'center', headerBackTitle: 'Edit Number' }} />
    </Stack>
  )
}


function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
      <RootLayout />
    </ClerkLoaded>
    </ClerkProvider>
  )
}
