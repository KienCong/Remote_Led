import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { updateBrightness, updatePowerStatus } from '../../firebaseService';

export default function App() {
  // Khai báo rõ kiểu dữ liệu cho State
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(0);

  const toggleSwitch = (value: boolean) => {
    // Ép kiểu boolean (đúng/sai) cho tham số value của công tắc
    setIsPowerOn(value);
    // GỌI API FIREBASE: Cập nhật trạng thái Bật/Tắt
    updatePowerStatus(value);
    console.log(" Trạng thái công tắc hiện tại:", value ? "ON" : "OFF");
  };

  // Ép kiểu number (số nguyên/thực) cho tham số value của thanh trượt
  const handleSliderComplete = (value: number) => {
    const intValue = Math.round(value);
    setBrightness(intValue);
    // GỌI API FIREBASE: Cập nhật độ sáng
    updateBrightness(intValue);
    console.log("Độ sáng thiết lập:", intValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Điều Khiển LED </Text>
        
        {/* Khu vực công tắc */}
        <View style={styles.row}>
          <Text style={styles.label}>Trạng thái: {isPowerOn ? "ĐANG BẬT" : "ĐANG TẮT"}</Text>
          <Switch
            value={isPowerOn}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isPowerOn ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        {/* Khu vực thanh trượt */}
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Độ sáng: {brightness}</Text>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={255}
            value={brightness}
            onSlidingComplete={handleSliderComplete}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  }
});