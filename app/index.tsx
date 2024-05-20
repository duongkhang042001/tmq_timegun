import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');




  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);




  const handleLogin = async () => {
    if (password === 'TMQtg0856131313') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      Alert.alert('Sai mật khẩu', 'Vui lòng thử lại.');
    }
  };




  if (isLoggedIn) {
    return <TireCalculator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={styles.innerContainer}>
        <Image source={{ uri: 'https://i.imgur.com/RTRXXDl.png' }} style={styles.logo} />
        <Text style={styles.label}>MẬT KHẨU ĐĂNG NHẬP</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button title="Đăng nhập" onPress={handleLogin} color="#FF0000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};




const TireCalculator = () => {
  const [width, setWidth] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [rimDiameter, setRimDiameter] = useState('');
  const [circumference, setCircumference] = useState('');
  const [contactArea, setContactArea] = useState('');
  const [sprayTimeTread, setSprayTimeTread] = useState('');
  const [sprayTimeSidewall, setSprayTimeSidewall] = useState('');
  const [customSprayTimeValue, setCustomSprayTimeValue] = useState('100'); // Giá trị mặc định là "100"




  const calculateTire = () => {
    const circumferenceValue = ((parseInt(width) * (parseInt(aspectRatio) / 100)) + (parseInt(rimDiameter) * 25.4)) * Math.PI;
    const contactAreaValue = circumferenceValue * parseInt(width);
    const sprayTimeTreadValue = (contactAreaValue / 3400) * (parseInt(customSprayTimeValue) / 100); // Thêm phần nhân với giá trị tùy chỉnh
    const sprayTimeSidewallValue = (((contactAreaValue / 555857.7) + (circumferenceValue / 2021.3)) / 0.137) * (parseInt(customSprayTimeValue) / 100); // Thêm phần nhân với giá trị tùy chỉnh




    setCircumference(circumferenceValue.toFixed(2));
    setContactArea(contactAreaValue.toFixed(2));
    setSprayTimeTread(convertToMinuteAndSecond(sprayTimeTreadValue));
    setSprayTimeSidewall(convertToMinuteAndSecond(sprayTimeSidewallValue));




    Keyboard.dismiss();
  };




  const convertToMinuteAndSecond = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    if (seconds === 60) {
      return `${minutes + 1} phút 00 giây`;
    }
    return `${minutes} phút ${seconds} giây`;
  };




  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={styles.innerContainer}>
        <Image source={{ uri: 'https://i.imgur.com/RTRXXDl.png' }} style={styles.logoChild} />
        <View style={styles.topInputContainer}>
          <Text style={[styles.label, { fontSize: 18 }]}>Tùy chỉnh (%):</Text>
          <TextInput
            style={styles.customInput}
            placeholder=""
            onChangeText={text => setCustomSprayTimeValue(text)}
            value={customSprayTimeValue}
            keyboardType="numeric"
            maxLength={5} // Tối đa 5 chữ số
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontSize: 18 }]}>Chiều rộng lốp:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setWidth(text)}
            value={width}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontSize: 18 }]}>Chiều cao lốp:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setAspectRatio(text)}
            value={aspectRatio}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontSize: 18 }]}>Đường kính mâm:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => setRimDiameter(text)}
            value={rimDiameter}
            keyboardType="numeric"
          />
        </View>
        <Button title="Tính toán" onPress={calculateTire} color="#FF0000" />
        <Text style={styles.resultText}>Thời gian phun cao su: {sprayTimeTread}</Text>
        <Text style={styles.resultText}>Thời gian phun mép: {sprayTimeSidewall}</Text>
      </TouchableOpacity>
      <View style={styles.waterMark}>
        <Text>Designed by Minh Vu</Text>
        <Text>Data by Minh Hy</Text>
      </View>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#98FB98', // Màu nền xanh mint
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    top: '10%',
    position: 'absolute',
    width: '60%', // Phóng to hình ảnh gấp 3 lần
    height: '20%', // Nhỏ hình ảnh lại 20%
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị biến đổi tỷ lệ
    marginBottom: 20, // Đưa ảnh lên cao hơn
  },
  logoChild: {
    width: '60%', // Phóng to hình ảnh gấp 3 lần
    height: '20%', // Nhỏ hình ảnh lại 20%
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị biến đổi tỷ lệ
    marginBottom: 20, // Đưa ảnh lên cao hơn
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  topInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Đã thay đổi để đẩy ô nhập liệu sang bên phải
    alignItems: 'center',
    marginBottom: 40,
    width: '100%', // Đã thêm để chiếm hết chiều rộng
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold', // In đậm chữ
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    fontSize: 18,
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '30%', // Đã thay đổi kích thước
    fontSize: 18,
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold', // In đậm chữ
  },
  waterMark: {
    width: '100%',
    marginTop: 150,
    alignItems: 'flex-end'
  }
});




export default () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);
