import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './Themed';

type Props = {
  path?: string;
  view?: JSX.Element;
};

export default function EditScreenInfo(props: Props) {
  return <View style={styles.l_container}>{props.view}</View>;
}

const styles = StyleSheet.create({
  l_container: {
    alignItems: 'center',
    marginBottom: 120,
  },
});
