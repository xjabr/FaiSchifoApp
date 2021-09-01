import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Alert,
  View,
  TextInput,
  Text,
  Keyboard,
  Animated
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from './components/utils/Title';
import Card from './components/Card';
import Badge from './components/utils/Badge';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(0);
  const [KBOffset, setKBOffset] = useState(0);

  const backgroundColor = isDarkMode ? { backgroundColor: '#222', display: 'flex', height: '100%' } : { backgroundColor: '#f5f5f5', display: 'flex', height: '100%' }

  useEffect(() => {
    const fetchItems = async () => {
      let items = await AsyncStorage.getItem('items');
      setCards(items ? JSON.parse(items) : []);
    }

    fetchItems();
  }, [status, cards]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
  })

  const handleAddBox = async () => {
    let items = await AsyncStorage.getItem('items');
    Alert.alert('Pezz* di merda', 'Hai aggiunto un altro fallimento');


    if (items == null) {
      await AsyncStorage.setItem('items', JSON.stringify([{
        text: text,
        status: 0
      }]));

      setText('');
    }

    items = JSON.parse(items);

    items.push({
      text: text,
      status: 0
    });

    await AsyncStorage.setItem('items', JSON.stringify(items));

    setText('');
  }

  const setItemSuccess = async (index) => {
    let items = JSON.parse(await AsyncStorage.getItem('items'));
    items[index].status = 1;
    setCards(items);
    await AsyncStorage.setItem('items', JSON.stringify(items));

    return Alert.alert('Fortuna.', 'Forse finalmente ci sei riuscit*... ah no, solo fortuna.')
  }

  const setItemsSuck = async (index) => {
    let items = JSON.parse(await AsyncStorage.getItem('items'));
    items[index].status = 2;
    setCards(items);
    await AsyncStorage.setItem('items', JSON.stringify(items));

    return Alert.alert('Appunto.', 'Fai veramente pena... quando inizierai ad essere qualcun*?')
  }

  const _keyboardDidShow = (event) => {
    setKBOffset(event.endCoordinates.height);
  }

  const _keyboardDidHide = () => {
    setKBOffset(0);
  }

  return (
    <SafeAreaView style={backgroundColor}>
      <View style={isDarkMode ? stylesDark.topHeader : stylesLight.topHeader}>
        <Title>Lavora pezz* di 💩</Title>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            <Badge width='47%' text="🍗" type="normal" onPress={() => setStatus('all')} />
            <Badge width='47%' text="🤔" type="normal" onPress={() => setStatus(0)} />
            <Badge width='47%' text="💪🏻" type="normal" onPress={() => setStatus(1)} />
            <Badge width='47%' text="🤷🏻‍♀️" type="normal" onPress={() => setStatus(2)} />
          </View>

          <View style={isDarkMode ? stylesDark.divisor : stylesLight.divisor}></View>

          {
            cards.map((item, index) => {
              if (status != 'all') {
                if (item.status == status) {
                  return <Card key={index} status={item.status} text={item.text} onPressSuccess={() => setItemSuccess(index)} onPressSuck={() => setItemsSuck(index)} />
                }
              } else {
                return <Card key={index} status={item.status} text={item.text} onPressSuccess={() => setItemSuccess(index)} onPressSuck={() => setItemsSuck(index)} />
              }
            })
          }

          {cards.length > 0 ? null : <Text style={{ textAlign: 'center', color: isDarkMode ? '#fff' : '#111' }}>Co***ne fai qualcosa di produttivo!. A vero, sei...</Text>}
        </View>
      </ScrollView>

      <Animated.View style={isDarkMode ? { ...stylesDark.searchBar, bottom: KBOffset } : { ...stylesLight.searchBar, bottom: KBOffset }}>
        <TextInput onSubmitEditing={handleAddBox} value={text} onChangeText={val => setText(val)} placeholder="Scrivi cosa fare pezzo di me**a..." style={isDarkMode ? stylesDark.inputBar : stylesLight.inputBar} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 20, marginBottom: 20,
    marginLeft: 'auto', marginRight: 'auto'
  }
});

const stylesDark = StyleSheet.create({
  topHeader: {
    marginTop: -50,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#111',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  searchBar: {
    backgroundColor: '#111',
    width: '100%',
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#fff',
    shadowOffset: {
      height: -3,
      width: 0
    },
    shadowOpacity: 0.1,
    position: 'absolute'
  },

  inputBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#fff'
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginTop: 20, marginBottom: 20
  },
});

const stylesLight = StyleSheet.create({
  topHeader: {
    marginTop: -50,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  searchBar: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      height: -3,
      width: 0
    },
    shadowOpacity: 0.1,
    position: 'absolute'
  },

  inputBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    color: '#111'
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 20, marginBottom: 20
  },
});

export default App;
