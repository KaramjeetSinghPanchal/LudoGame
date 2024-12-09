import { NavigationContainer } from "@react-navigation/native"; 
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";
import LuddoboardScreen from "../Screens/LuddoboardScreen";
import HomeScreen from "../Screens/HomeScreen";
import { navigationRef } from "../helpers/NavigationUtil";
const Stack = createNativeStackNavigator();

function Navigation(){
  return(
    <NavigationContainer ref={navigationRef}>
    <Stack.Navigator 
    initialRouteName="LudoBoardScreen"      
    screenOptions={()=> ({
      headerShown : false
    })}>
      <Stack.Screen name="LudoBoardScreen" options={{
        animation:'fade'}}
         component={LuddoboardScreen}/>

<Stack.Screen name="HomeScreen" options={{
        animation:'fade'}}
         component={HomeScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation