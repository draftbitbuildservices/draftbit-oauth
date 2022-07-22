import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text } from 'react-native';

const HomeScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Text style={[styles.TextEN, { color: theme.colors.strong }]}>
        {'Code: '}
        {props.route?.params?.code ?? ''}
      </Text>

      <Text style={[styles.TextVW, { color: theme.colors.strong }]}>
        {'Redirect Uri : '}
        {props.route?.params?.redirect_uri ?? ''}
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextEN: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
  },
  TextVW: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
  },
});

export default withTheme(HomeScreen);
