import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable, useColorScheme} from 'react-native';

import Colors from '../../common/constants/Colors';
import {routes} from '../../common/routes/routes';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const ROUTES: routes = new routes();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name={ROUTES.badge.list}
        options={{
          title: 'List Badges',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name={`${ROUTES.badge.detail}`}
        options={{
          title: 'Detail badge',
          tabBarIcon: ({ color }) => <TabBarIcon name='desktop' color={color} />,
        }}
      />
    <Tabs.Screen
    name={ROUTES.badge.create}
    options={{
        title: 'Create Badge',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
    />
    </Tabs>
  );
}
