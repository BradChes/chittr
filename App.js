// Navigation Screen
import { TabScreen } from './screens/navigation/TabScreen'
import UpdateScreen from './screens/app/UpdateScreen';
import FollowsScreen from './screens/app/FollowsScreen';

// Authentication Screens
import LandingScreen from './screens/auth/LandingScreen'
import LoginScreen from './screens/auth/LoginScreen'
import SignupScreen from './screens/auth/SignupScreen'
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const AppStack = createStackNavigator({ 
    Tab: TabScreen, 
    UserUpdate: UpdateScreen,
    Following: FollowsScreen,
    Followers: FollowsScreen }, { headerMode: 'none' });
const AuthStack = createStackNavigator({ 
    Landing: LandingScreen, 
    Login: LoginScreen,
    Signup: SignupScreen}, { headerMode: 'none' }); 

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