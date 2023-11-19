import React, { useImperativeHandle, useRef } from 'react';
import {View, StyleSheet, StyleProp, TextStyle, ViewStyle, KeyboardTypeOptions} from 'react-native';
import AppColors from '../static/AppColors';
import { TextInput } from 'react-native';
import { Input } from 'native-base';

type InputFormProps = {
  value?: string,
  placeholder?: string,
  onChangeText?: (value: string) => void,
  style?: StyleProp<ViewStyle>,
  onSubmitEditing?: () => void,
  secureTextEntry?: boolean,
  returnKeyType?: 'next' | 'done' | 'search' | 'go' | 'send' | 'default' | 'emergency-call' | 'google' | 'join' | 'route' | 'yahoo' | undefined,
  ref?: any,
  keyboardType?: KeyboardTypeOptions,
  readonly?: boolean,
  variant?: 'underlined' | 'rounded' | 'outline' | 'filled' | undefined,
  h?: number | string,
  w?: number | string,
  mr?: number | string,
  ml?: number | string,
  size?: number | string,
  maxW?: number | string,
  marginBottom?: number | string,
  InputRightElement?: JSX.Element | JSX.Element[],
  color?: string,
}

const InputForm = React.forwardRef<inputHandle, InputFormProps>(({
  value, placeholder, style, onChangeText, onSubmitEditing, returnKeyType, secureTextEntry, keyboardType, readonly = false, ...props
}, ref) => {

  const textInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    onFocus: () => textInputRef.current?.focus(),
  }));

//   return (
//     <View style={[styles.container, style]}>
//       <View style={styles.inputContainer}>
//         <TextInput 
//           style={{color: AppColors.fullblack}}
//           editable={!readonly}
//           ref={textInputRef}
//           secureTextEntry={secureTextEntry}
//           returnKeyType={returnKeyType}
//           keyboardType={keyboardType}
//           placeholder={placeholder} 
//           value={value} 
//           onSubmitEditing={onSubmitEditing}
//           onChangeText={onChangeText}/>
//       </View>
//     </View>
//   );

  return (
    <Input 
      variant={props.variant??'underlined'}
      h={props.h??10}
      w={props.w??'100%'}
      maxW={props.maxW??'xs'}
      marginBottom={props.marginBottom??1}
      mr={props.mr??0}
      ml={props.ml??0}
      size={props.size??'sm'}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      editable={!readonly}
      style={style}
      ref={textInputRef}
      InputRightElement={props.InputRightElement} />
  )
});

export default InputForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#9FDEFB',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});

export type inputHandle = {
  onFocus: () => void;
};