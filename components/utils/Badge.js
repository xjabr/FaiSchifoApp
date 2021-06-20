import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const Badge = ({ width = '50%', text = 'Conferma', onPress = () => {}, type = 'success' }) => {
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

    if (type == 'normal') {
      return isDarkMode ? {
        backgroundColor: '#111',
      } : {
        backgroundColor: '#444',
      }
    }
  }

  return (
    <TouchableOpacity onPress={onPress} title={text} style={{ ...styles.badgeWrap, ...getPerfectColor(), width: width }}>
      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12, fontWeight: '500' }}>{ text }</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  badgeWrap: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10
  }
});

export default Badge;