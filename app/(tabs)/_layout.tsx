import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { HouseIcon, WalletIcon, PackageIcon, ClockIcon } from 'phosphor-react-native';

const TabData = [
  { name: 'index', icon: PackageIcon },
  { name: 'history', icon: ClockIcon },
  { name: 'wallet', icon: WalletIcon },
  { name: 'profile', icon: HouseIcon },
];

export default function Authlayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: 'bottom',
        tabBarStyle: {
          height: 80,
          backgroundColor: '#000000',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 10,
          paddingTop: 20,
          borderTopColor: 'transparent',
        },
      }}>
      {TabData.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            animation: 'shift',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const Icon = tab.icon;
              return (
                <TouchableOpacity className="">
                  <Icon size={28} color={focused ? '#F56C27' : '#ffffff'} />
                </TouchableOpacity>
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
