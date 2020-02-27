// React
import React, { Component } from 'react';
import { 
    View, 
    Button, 
    Text, 
    StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonTextDivider: {
        marginVertical: 20,
        fontSize: 18
    }
});

export default class LandingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button 
                    title = "Log In"
                    color = 'red'
                    onPress={() => this.props.navigation.navigate('Login')} />
                <Text style = {styles.buttonTextDivider}>Or...</Text>
                <Button 
                    title = "Sign Up"
                    color = 'red'
                    onPress={() => this.props.navigation.navigate('Signup')} />
            </View>
        );
    }
}