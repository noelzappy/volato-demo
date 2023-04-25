import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationStackParamList } from "../types/navigation";
import Home from "../screens/Home";
import Forms from "../screens/Forms";

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Forms"
          component={Forms}
          options={({ route }) => ({
            title: route.params.form.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
