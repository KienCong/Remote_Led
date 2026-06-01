#include "esp32-hal-ledc.h"
#include "FirebaseManager.h"
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

FirebaseData streamData;
FirebaseAuth auth;
FirebaseConfig config;

bool ledPower = false;
int ledBrightness = 0;

void updateLEDHardware() {
  if(ledPower) {
    ledcWrite(LED_PIN, ledBrightness);
    Serial.printf("LED ON : Do sang %d\n", ledBrightness);
  } else {
    ledcWrite(LED_PIN, 0);
    Serial.printf("LED OFF");
  }
}

void streamCallback(FirebaseStream data) {
  String path = data.dataPath();
  if(path == "/power") {
    if(data.dataType() == "boolean") {
      ledPower = data.boolData();
      updateLEDHardware();
    }
  } 
  else if(path == "/brightness") {
     if(data.dataType() == "int" || data.dataType() == "float" || data.dataType() == "double") {
        ledBrightness = data.intData();
        updateLEDHardware();
      }
    }
  
}
void streamTimeoutCallback(bool timeout) {
  if(timeout) {
    Serial.println("dang ket noi lai....");
  }
}

// Hàm khởi tạo toàn bộ hệ thống (WiFi + Firebase)
void initSystem() {
  // Cấu hình chân PWM điều khiển LED
  ledcAttach(LED_PIN, PWM_FREQ, PWM_RESOLUTION);
  ledcWrite(LED_PIN, 0);

  // Kết nối WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Đang kết nối WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nKết nối WiFi thành công!");

  // Cấu hình Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Đăng nhập Firebase thành công!");
  } else {
    Serial.printf("Lỗi đăng nhập Firebase: %s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Bắt đầu Stream
  if (!Firebase.RTDB.beginStream(&streamData, "/")) {
    Serial.printf("Lỗi cấu hình Stream: %s\n", streamData.errorReason().c_str());
  }
  Firebase.RTDB.setStreamCallback(&streamData, streamCallback, streamTimeoutCallback);
}