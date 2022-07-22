import React from 'react';
import * as OAuthApi from '../apis/OAuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { ButtonSolid, ScreenContainer, withTheme } from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from 'react-native';

const BlankCopyScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;

  const [url, setUrl] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ButtonSolid
        onPress={async () => {
          try {
            const test = await OAuthApi.newEndpointGET(Constants);

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
        title={'Get Started'}
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
});

export default withTheme(BlankCopyScreen);
