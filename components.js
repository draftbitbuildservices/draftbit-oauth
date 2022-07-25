//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

// export default function Apple() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: '122244295972-gq660fbei8fcjjtdgsnghj668kuuhdv8.apps.googleusercontent.com',
//     iosClientId: '122244295972-nqo5sa9rvov9cb7ecrmulqahhepl3jm3.apps.googleusercontent.com',
//    // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//     webClientId: '122244295972-gq660fbei8fcjjtdgsnghj668kuuhdv8.apps.googleusercontent.com',
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       }
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//         }}
//     />
//   );
// }

//WebBrowser.maybeCompleteAuthSession();

export function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      '122244295972-gq660fbei8fcjjtdgsnghj668kuuhdv8.apps.googleusercontent.com',
    iosClientId:
      '122244295972-nqo5sa9rvov9cb7ecrmulqahhepl3jm3.apps.googleusercontent.com',
    expoClientId:
      '122244295972-gq660fbei8fcjjtdgsnghj668kuuhdv8.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button
        title={accessToken ? 'Get User Data' : 'Login'}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ useProxy: false, showInRecents: true });
              }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
