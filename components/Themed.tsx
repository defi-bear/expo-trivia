/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import React from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
} from 'react-native';

import useThemeColor from '../hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultText
      style={[{ color, textAlign: 'center' }, style]}
      {...otherProps}
    />
  );
}

Text.defaultProps = {
  lightColor: '',
  darkColor: '',
};

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'border',
  );

  return (
    <DefaultView
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}

View.defaultProps = {
  lightColor: '',
  darkColor: '',
};

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'border',
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}

TouchableOpacity.defaultProps = {
  lightColor: '',
  darkColor: '',
};
