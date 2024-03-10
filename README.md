# Lunar Vein: Arduino

A **SIMPLE** REST API based serial communication. Assisted Firmata protocol and johnny-five API, enabling software communication with the Arduino board using the Server API. that's it. Idk about electronics and networking actually. But that piece of knowledge motivated me to make some IoT stuff. Enjoy (⁠づ⁠￣⁠ ⁠³⁠￣⁠)⁠づ

![ENA BBQ](https://media1.tenor.com/m/Nl2_tsGV-qkAAAAC/enadbbq-dreambbq.gif)

<small>*the animation is from ENA BBQ series by JoelG</small>

## Setup
Tools that are required
- Arduino Board
- [Arduino IDE](https://www.arduino.cc/en/software)
- [Node.js](https://nodejs.org/en) v16.0.0^ or other javascript runtime

### Board
Arduino assembly guide also available in [johnny-five](https://github.com/rwaldron/johnny-five?tab=readme-ov-file#setup-and-assemble-arduino) documentation
1. Plug in your Board via USB
2. Open Arduino IDE then select your Board
3. Go to `File > Examples > Firmata` Select `StandarFirmataPlus`
4. Upload the sketch

### Server
1. Clone project and Install

    ```bash
    git clone https://github.com/norman-andrians/lunar-vein-arduino.git && cd lunar-vein-arduino
    npm i
    ```

2. Add `.env` file in the project root directory with the `SERIAL_PORT` variable

    ```dotenv
    SERIAL_PORT=/dev/ttyUSB0
    ```

3. Run the project

    ```bash
    npm start
    ```

4. If the board is connected try to open the client page in [https://localhost:3000/](https://localhost:3000/)

    ![Client page](./docs/client.png)

#### Other scripts
- You can see what ports are connected to the device by running `npm run ports` script.

    ```bash
    npm run ports
    ```
    ```
    > lunar-vein-arduino@1.0.0 ports
    > ts-node src/ports/print.ts

    3 Ports available
    1. /dev/ttyUSB0
    2. /dev/ttyUSB1
    3. /dev/ttyACM0
    ```

# API Documentation

## Table of contents
- [Common HTTP Responses](#common-http-responses)
- [JSON Response](#json-response)
- [Example Request](#example-request)
- [PIN](#pin)
    - [Read pin mode](#read-pin-mode)
    - [Set pin mode](#set-pin-mode)
- [LED](#led)
    - [Read LED state](#read-led-state)
    - [Set LED state](#set-led-state)
- [RGB LED](#rgb-led)
    - [Read RGB state](#read-rgb-state)
    - [Set RGB state](#set-rgb-state)

## Common HTTP Responses
Some HTTP responses are sent with JSON, otherwise an HTML body will be sent which is the default express.js response 

| HTTP Status | Marks |
|-------------|-------|
| 200 | The request `act` was successful |
| 400 | You may be making an invalid request, try to check the payload or recheck the documentation. |
| 404 | The resource wass not found |
| 405 | Method not allowed, servers usually only accept `GET` and `PATCH` methods |
| 500 | An error in the app server, if it continues please raise an issue or ask to contribute. |

## JSON Response
```json
{
    "status": 200,
    "pin_state": {
        "13": "HIGH"
    },
    "message": "Changed pin state 13 to HIGH"
}
```
| Property | Description |
|----------|-------------|
| status | HTTP Status code |
| pin_state | The state value of the pin that has been changed |
| message | Descriptive message of the changed state |

## Example Request
This is an example of javascript code sending a request to turn on the LED light, [See LED API](#set-led-state)

```javascript
async function turnOnLed() {
    const res = await fetch("http://localhost:3000/led/13/on"); // Set LED to HIGH
    const data = await res.json();
    console.log(data); // { status: 200, pin_state: { 13: high }, message: "Pin 13 Set to HIGH" }
}
```

## PIN

### Read pin mode
- **URL Endpoint**

    /pin/:p/
    
- **URL Params**
    
    | Params | Mark | Type | Required | Description |
    |--------|------|------|----------|-------------|
    | p | pin | `string` | true | Seleced pin |

- **Method**

    `GET`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pins": [
            {
                "pin": 13,
                "mode": "OUTPUT"
            }
        ],
        "message": "Pin 13 is OUTPUT"
    }
    ```

### Set pin mode
- **URL Endpoint**

    /pin/:p/:m
    
- **URL Params**
    
    | Params | Mark | Type | Required | Description |
    |--------|------|------|----------|-------------|
    | p | pin | `string` | true | Seleced pin |
    | m | mode | `'input'`, `'output'`, `'servo'` | true | Pin Mode |

- **Method**

    `PATCH`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pins": [
            {
                "pin": 13,
                "mode": "OUTPUT"
            }
        ],
        "message": "Pin 13 setted as OUTPUT"
    }
    ```


## LED

### Read LED state
- **URL Endpoint**

    /led/:p/
    
- **URL Params**
    
    | Params | Mark | Type | Required | Description |
    |--------|------|------|----------|-------------|
    | p | pin | `string` | true | Seleced pin |

- **Method**

    `GET`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pin_state": {
            "13": "HIGH"
        },
        "message": "Led pin 13 is HIGH"
    }
    ```

### Set LED state
- **URL Endpoint**

    /led/:p/:a
    
- **URL Params**
    
    | Params | Mark | Type | Required | Description |
    |--------|------|------|----------|-------------|
    | p | pin | `string` | true | Seleced pin |
    | a | act | `'on'`, `'off'`, `'high'`, `'low'` | true | Action |

- **Method**

    `PATCH`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pin_state": {
            "13": "HIGH"
        },
        "message": "Changed pin state 13 to HIGH"
    }
    ```



## RGB LED

### Read RGB state
- **URL Endpoint**

    /rgb-led
    
- **Body**

    ```javascript
    {
        r: number,
        g: number,
        b: number
    }
    ```

- **Method**

    `POST`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pin_state": {
            "7": true,
            "6": true,
            "5": false
        }
    }
    ```

### Set RGB state
- **URL Endpoint**

    /rgb-led
    
- **Body**
    
    ```javascript
    {
        r: {
            pin: number,
            value: boolean
        },
        g: {
            pin: number,
            value: boolean
        },
        b: {
            pin: number,
            value: boolean
        }
    }
    ```

- **Method**

    `PATCH`

- **Sample Response**

    ```json
    {
        "status": 200,
        "pin_state": {
            "7": true,
            "6": true,
            "5": false
        },
        "message": "Success changed pins 7, 6, 5 to state HIGH, HIGH, LOW"
    }
    ```

