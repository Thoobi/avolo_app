import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoggedIn = true;

      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-5xl">Loading...</Text>
    </View>
  );
}
