#include "DHT.h"
#define TIPO_SENSOR DHT11
const int PINO_SENSOR_DHT11 = A4;
const int PINO_SENSOR_LM35 = A5;
float temperatura;
DHT sensor(PINO_SENSOR_DHT11, TIPO_SENSOR);
void setup() {
  Serial.begin(9600);
  sensorDHT.begin();

}

void loop() {
  float leitura = analogRead(PINO_SENSOR_LM35);
  temperatura = ((leitura * 5.0 / 1023.0) / 0.01);
  float umidade = sensorDHT.readHumidity();
  if(isnan(umidade)){
    Serial.println("Erro ao ler a umidade");
  }
  else{
    Serial.print(temperatura);
    Serial.print(";");
    Serial.println(umidade);
  }
  delay(2000);
}
