import React from 'react';
import {
  View,
  useColorScheme,
  StyleSheet,
  Text
} from 'react-native';

import Title from './utils/Title';
import Button from './utils/Button';

const Card = ({
  title = 'La tua vita fa schifo...\nalmeno fai questo.',
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum dolor, eleifend sed magna eu, suscipit blandit nulla. Sed et ultrices lacus, eu placerat eros.',
  status = 0,
  onPressSuccess = () => { },
  onPressSuck = () => { }
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={isDarkMode ? cardStyleDark.cardWrap : cardStyleLight.cardWrap}>
      <Title>{title}</Title>


      <Text style={isDarkMode ? cardStyleDark.text : cardStyleLight.text}>{text}</Text>

      {status == 0 ?
        <>

          <View style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Button text="👍🏻" type="success" onPress={onPressSuccess}></Button>
            <Button text="👎🏻" type="danger" onPress={onPressSuck}></Button>
          </View>
        </>
        : null}
    </View>
  )
}

const cardStyleDark = StyleSheet.create({
  cardWrap: {
    backgroundColor: '#111',
    padding: 20,
    width: '100%',
    borderRadius: 18,
    marginBottom: 15
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginTop: 20, marginBottom: 20
  },

  text: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 20, marginBottom: 20
  }
})

const cardStyleLight = StyleSheet.create({
  cardWrap: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderRadius: 18,
    marginBottom: 15
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginTop: 20, marginBottom: 20
  },

  text: {
    color: '#555',
    fontSize: 14,
    marginTop: 20, marginBottom: 20
  }
});

export default Card;