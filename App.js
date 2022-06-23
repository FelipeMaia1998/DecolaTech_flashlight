import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {

  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //ligar e desligar flash
    Torch.switchState(toggle);
//    return () => Alert.alert('Atualizou o toggle para ' + toggle); // para usar precisa importar componente 'Alert'
  }, [toggle]);

  useEffect(() => {
    // Quando o celular for cacoalhado será modificado o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    // Essa fução vai ser chamada quando o components for desmontado
    return () => subscription.remove();
  }, []);

  //if toggle return light
  return (
    <SafeAreaView style={toggle ? style.conteinerLight : style.conteiner}>
        <StatusBar backgroundColor={toggle ? 'white' : 'black'} barStyle={toggle ? 'dark-content' : 'light-content'} />
        <View style={toggle ? style.conteinerLight : style.conteiner}>
        <TouchableOpacity onPress = {handleChangeToggle}>

        <Image
          style={toggle ? style.lightinOn : style.lightinOff}
          source={toggle
            ? require('./assets/icons/eco-light.png')
            : require('./assets/icons/eco-light-off.png')}
        />
        <Image
          style={toggle ? [style.lightinOn, style.dioLogo] : [style.lightinOff, style.dioLogo]}
          source={toggle
            ? require('./assets/icons/logo-dio.png')
            : require('./assets/icons/logo-dio-white.png')}
        />

          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );

}

export default App;

const style = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteinerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: 'white',
    color: 'dark-content',
  },
  lightinOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightinOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    tintColor: 'white',
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
})