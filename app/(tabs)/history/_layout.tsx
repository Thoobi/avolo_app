import { Stack } from 'expo-router';

export default function TestimonyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          animation: 'fade',
          headerShown: true,
          headerTitle: 'History',
          headerShadowVisible: true,
          headerTransparent: false,
          headerTintColor: 'black',
          headerBackTitleStyle: {
            fontSize: 22,
          },
          headerBackVisible: true,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
