import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { createHDWallet, Wallet } from 'react-native-hd-wallet';

export default function App() {
  const [wallet, setWallet] = React.useState<Wallet>();

  React.useEffect(() => {
    createHDWallet(0, 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat', 'password').then(setWallet);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Wallet: {JSON.stringify(wallet, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
