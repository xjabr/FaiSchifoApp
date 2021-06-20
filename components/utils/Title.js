import React from 'react';
import {
  Text,
  useColorScheme
} from 'react-native';

const Title = ({ size = 18, children }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text style={{ fontWeight: 'bold', fontSize: size, color: isDarkMode ? '#fff' : '#000' }}>{children}</Text>
  )
};

export default Title;