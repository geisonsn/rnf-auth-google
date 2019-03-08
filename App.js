import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class App extends Component {
  
  constructor() {
    super()
    this.state = {userInfo: null, error: '', userText: null};
    GoogleSignin.configure();
  }

  signIn = () => {
    this.setState({ error: 'Testando'});
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const userInfo = await GoogleSignin.signIn();

      console.warn(userInfo);
      this.setState({ userInfo });
      this.setState({userText: JSON.stringify(userInfo)});

      // console.warn(userInfo);
    } catch (error) {

      // console.warn(error.code);
      // console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // console.warn(error);
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}/>
        <Text>{this.state.userText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
