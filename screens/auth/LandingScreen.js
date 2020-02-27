// React
import React, { Component } from 'react';
import { 
    View, 
    Button, 
    Text, 
    Image,
    StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    headingContainer: {
        flex: 3,
        alignItems: 'center'
    },
    loginContainer: {
        flex: 2,
    },
    signupContainer: {
        flex: 1
    },
    header: {
        fontSize: 44,
        fontWeight: 'bold'
    },
    image: {
        width: 150,
        height: 150
    },
    slogan: {
        fontSize: 18,
        marginVertical: 20
    },
    signupPrompt: {
        marginVertical: 10,
        fontSize: 14
    }
});

export default class LandingScreen extends Component {
    render() {
        return (
            <View style = { styles.container }>
                <View style = {styles.headingContainer}>
                    <Text style = { styles.header }>Chittr</Text>
                    <Image
                        source = {require('./../../images/app-icon.png')}
                        style = {styles.image}
                    />
                    <Text style = { styles.slogan }>What has happened?</Text>
                </View>
                <View style = {styles.loginContainer}>
                    <Button 
                        title = "Log In"
                        color = 'red'
                        onPress = {() => this.props.navigation.navigate('Login')} />
                </View>
                <View style = {styles.signupContainer}>
                    <Text style = {styles.signupPrompt}>Otherwise...</Text>
                    <Button 
                        title = "Sign Up"
                        color = 'red'
                        onPress= {() => this.props.navigation.navigate('Signup')} />
                </View>
            </View>
        );
    }
}