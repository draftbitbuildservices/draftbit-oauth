import React from 'react';
import * as OAuthApi from '../apis/OAuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonOutline,
  ButtonSolid,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';

const BlankScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  const [url, setUrl] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ButtonSolid
        onPress={async () => {
          try {
            const test = await OAuthApi.newEndpointGET(Constants, {
              link: 'https://auth.expo.io/@draftbitbuildservices/social-auth://HomeScreen/:code/:redirect_uri',
            });

            const valuejfjJTONV = test?.authUrl;
            setUrl(valuejfjJTONV);
            const abc = valuejfjJTONV;

            await WebBrowser.openBrowserAsync(`${abc}`);
          } catch (err) {
            console.error(err);
          }
        }}
        style={[
          styles.ButtonSolidkl,
          { backgroundColor: theme.colors.primary },
        ]}
        title={'Deep link'}
      />
      <ButtonOutline
        onPress={async () => {
          try {
            await OAuthApi.newEndpointGET(Constants, {
              link: 'https://auth.expo.io/@draftbitbuildservices/social-auth/HomeScreen',
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.ButtonOutlineRp}
        title={'Normal'}
      />
      <ButtonOutline
        onPress={async () => {
          try {
            await OAuthApi.newEndpointGET(Constants, {
              link: 'https://auth.expo.io/@draftbitbuildservices/social-auth/HomeScreen?code=code&redirect_uri=jajakjlaj',
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles.ButtonOutline_5B}
        title={'Normal with Param'}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonSolidkl: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ButtonOutlineRp: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 50,
  },
  ButtonOutline_5B: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default withTheme(BlankScreen);
