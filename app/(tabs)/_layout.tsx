import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { HouseIcon, UserCircleIcon, ClockIcon } from 'phosphor-react-native';

const TabData = [
  { name: 'index', icon: HouseIcon },
  { name: 'history', icon: ClockIcon },
  { name: 'profile', icon: UserCircleIcon },
];

export default function Authlayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarPosition: 'bottom',
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 80,
          height: 60,
          backgroundColor: 'rgba(0, 0, 15, 0.9)',
          borderRadius: 35,
          paddingHorizontal: 5,
          paddingTop: 10,
          borderTopColor: 'transparent',
          elevation: 0,
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
                <BlurView
                  intensity={focused ? 50 : 0}
                  tint="light"
                  experimentalBlurMethod="dimezisBlurView"
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 24,
                    overflow: 'hidden',
                    backgroundColor: focused ? 'rgba(255,255,255,0.9)' : 'transparent',
                  }}>
                  <Icon
                    size={26}
                    color={focused ? '#F56C27' : '#ffffff'}
                    weight={focused ? 'fill' : 'regular'}
                  />
                </BlurView>
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
