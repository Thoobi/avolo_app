import '../global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaProvider className="flex-1">
      <StatusBar style="auto" backgroundColor="#000000" translucent={true} />
      <SafeAreaView
        edges={['top', 'bottom', 'right', 'left']}
        style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
