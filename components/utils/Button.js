import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const Button = ({ width = '50%', text = 'Conferma', onPress = () => {}, type = 'success' }) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  const getPerfectColor = () => {
    if (type == 'success') {
      return isDarkMode ? {
        backgroundColor: '#7ABB79',
      } : {
        backgroundColor: '#8FDC8D',
      }
    }

    if (type == 'danger') {
      return isDarkMode ? {
        backgroundColor: '#B56565',
      } : {
        backgroundColor: '#DC8D8D',
      }
    }
  }

  return (
    <TouchableOpacity onPress={onPress} title={text} style={{ ...styles.buttonWrap, ...getPerfectColor(), width: width }}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>{ text }</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  buttonWrap: {
    padding: 10,
    borderRadius: 8,
    margin: 2
  }
});

export default Button;