# Lunar Vein: Arduino

A REST API based serial communication, assisted Firmata protocol and johnny-five API, enabling software communication with the Arduino board using the Server API., that's it. Idk about electronics and networking actually. But that piece of knowledge motivated me to interact it with other software. Enjoy (⁠づ⁠￣⁠ ⁠³⁠￣⁠)⁠づ

## Setup

### Board
Arduino assembly guide also available in [johnny-five](https://github.com/rwaldron/johnny-five?tab=readme-ov-file#setup-and-assemble-arduino) documentation
1. Download [Arduino IDE](https://www.arduino.cc/en/software)
2. Plug in your Board via USB
3. Open Arduino IDE then select your Board
4. Go to `File > Examples > Firmata` Select `StandarFirmataPlus`
5. Upload the sketch

### Server
1. Clone project and Install
    ```bash
    > git clone https://github.com/norman-andrians/lunar-vein-arduino.git && cd lunar-vein-arduino
    > npm i
    ```
2. Add `.env` file in the project root directory with the `SERIAL_PORT` variable
    ```
    SERIAL_PORT=/dev/ttyUSB0
    ```
3. Run the project
    ```bash
    > npm start
    ```