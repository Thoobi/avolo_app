import { Text, ScrollView } from 'react-native';

export default function ScreenProvider() {
  return (
    <ScrollView
      style={{
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}>
      <Text>Screen Provider</Text>
    </ScrollView>
  );
}
