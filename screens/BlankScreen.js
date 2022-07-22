import React from 'react';
import * as OAuthApi from '../apis/OAuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { ButtonSolid, ScreenContainer, WebView, withTheme } from '@draftbit/ui';
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
            const test = await OAuthApi.newEndpointGET(Constants);
            setUrl(test?.authUrl);
            console.log(JSON.stringify(test));
          } catch (err) {
            console.error(err);
          }
        }}
        style={[
          styles.ButtonSolidMP,
          { backgroundColor: theme.colors.primary },
        ]}
        title={'Get Started'}
      />
      <WebView style={styles.WebViewin} source={{ uri: `${url}` }} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonSolidMP: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  WebViewin: {
    flex: 1,
    width: '100%',
    height: 600,
  },
});

export default withTheme(BlankScreen);
