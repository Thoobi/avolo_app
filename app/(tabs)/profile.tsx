import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <View className="pb-6">
        <Text className="text-xl font-bold text-black">Profile</Text>
        <Text className="mt-1 text-sm text-muted">
          I will see if there is need to add a profile and auth screen
        </Text>
      </View>
    </View>
  );
}
