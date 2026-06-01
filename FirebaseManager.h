#ifndef FIREBASE_MANAGER_H
#define FIREBASE_MANAGER_H
#include<WiFi.h>
#include<Firebase_ESP_Client.h>
#define WIFI_SSID "TP-Link_D038"
#define WIFI_PASSWORD ""
#define API_KEY "AIzaSyA-NC2cnrfdggNm7q-20aYNw_cILK6WoXE"
#define DATABASE_URL "https://iot-led-2c3f1-default-rtdb.asia-southeast1.firebasedatabase.app"

#define LED_PIN 2
#define PWM_CHANNEL 0
#define PWM_FREQ 5000
#define PWM_RESOLUTION 8

void initSystem();
void updateLEDHardware();

#endif