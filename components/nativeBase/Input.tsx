import { Input } from 'native-base';
import { InputModeOptions } from 'react-native';
import React from 'react';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';

type Props = {
  value?: string;
  style?: {};
  fontSize?: string;
  inputMode?: InputModeOptions | undefined;
  variant?: ResponsiveValue<'outline' | 'underlined' | 'rounded' | 'filled' | 'unstyled' | (string & {})>;
  type?: 'text' | 'password' | undefined;
  templateLeft?: JSX.Element;
  templateRight?: JSX.Element;
  onChange?(event: any): void;
};

export function InputNativeBase(props: Props): JSX.Element {
  return (
    <Input
      w={{
        base: '80%',
        md: '25%',
      }}
      fontSize={props.fontSize}
      inputMode={props.inputMode}
      type={props.type}
      variant={props.variant}
      style={props.style}
      placeholder='Procurar'
      value={props.value}
      InputRightElement={props.templateRight}
      InputLeftElement={props.templateLeft}
      onChangeText={props.onChange}
    />
  );
}
