import { TabScreen } from './screens/navigation/TabScreen'
import LoginScreen from './screens/auth/LoginScreen'
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const AppStack = createStackNavigator({ TabScreen }, { headerMode: 'none' });
const AuthStack = createStackNavigator({ Signin: LoginScreen }, { headerMode: 'none' }); 

export default createAppContainer(createSwitchNavigator(
    {
        Starter: AuthLoadingScreen, 
        App: AppStack, 
        Auth: AuthStack
    }, 
    {
        initialRouteName: 'Starter'
    }
));