import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import TasksScreen from '../screens/TasksScreen';
import { Entypo } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 47,
    background: '#fff',
  }
}

export default function BottomNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
        name='Main' 
        component={MainScreen}
        options={{ 
          tabBarIcon: ({focused}) => {
            return <Entypo name='home' size={28} color={focused ? '#fc4503' : '111'}/>;
          }
        }}
        />
        <Tab.Screen 
        name='Tasks' 
        component={TasksScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <FontAwesome5 name="tasks" size={28} color={focused ? '#fc4503' : '111'}/>;
          }
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};