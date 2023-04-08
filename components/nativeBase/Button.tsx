import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, IButtonProps } from 'native-base';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';

type Props = {
  children?: string | JSX.Element;
  colorScheme?: string;
  size?: string;
  shadow?: ResponsiveValue<
    (string & {}) | (number & {}) | 'none' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  >;
  _pressed?: Partial<IButtonProps> | undefined;
  _android?: Partial<IButtonProps> | undefined;
  borderRadius?: ResponsiveValue<
    'lg' | 'md' | 'sm' | 'xs' | 'xl' | '2xl' | (string & {}) | 'none' | (number & {}) | '3xl' | 'full'
  >;
  onPress?(event: any): void;
};

export function ButtonNativeBase(props: Props): JSX.Element {
  return (
    <View>
      <Button
        colorScheme={props.colorScheme}
        size={props.size}
        variant={'subtle'}
        borderRadius={props.borderRadius}
        shadow={props.shadow}
        _pressed={props._pressed}
        _android={props._android}
        onPress={props.onPress}
      >
        {props.children}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'white',
    color: 'black',
    marginVertical: 20,
    padding: 10,
    shadowColor: '#171717',
    elevation: 10,
  },
});
