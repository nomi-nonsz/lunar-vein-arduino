import { Request, Response } from "express";
import { board } from "../setup";
import { ChannelPins, digitalValue, voltage } from ".";
import { digitalRead } from "../promises";


export async function readLed (req: Request, res: Response) {
    const { p } = req.params;
    const pin: number = Number.parseInt(p);

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const pinState: digitalValue = board.pins[pin].value == 1 ? 'ON' : 'OFF';

    return res.status(200).json({
        status: 200,
        pin_state: {
            [pin]: pinState
        }
    });
}

export async function writeLed (req: Request, res: Response) {
    const { p, a } = req.params;
    const act: string = a.toLocaleLowerCase();
    const pin: number = Number.parseInt(p);

    let state: digitalValue;
    let volt: voltage;

    try {
        if (Number.isNaN(pin)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid pin param, it should be integer'
            });
        }
    
        switch (act) {
            case 'on':
                state = 'ON';
                volt = 'HIGH';
                console.log(`${req.hostname} | ${pin} | LED: ${state}`);
                break;
            case 'off':
                state = 'OFF';
                volt = 'LOW';
                console.log(`${req.hostname} | ${pin} | LED: ${state}`);
                break;
            default:
                console.log(`${req.hostname} | ${pin} | LED: INVALID ACT`);
                return res.status(400).json({
                    status: 400,
                    message: `Invalid act ${act}`
                });
        }

        board.digitalWrite(pin, board[volt]);

        res.status(200).json({
            status: 200,
            message: `Success changed pin ${pin} to state ${state}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};


export async function readRgbLed (req: Request, res: Response) {
    const r: number = Number.parseInt(req.body.r);
    const g: number = Number.parseInt(req.body.b);
    const b: number = Number.parseInt(req.body.b);

    const rgbPins: number[] = Object.values({ r, g, b });
    const pinStates: number[] = [];

    for (let i = 0; i < rgbPins.length; i++) {
        const pin = rgbPins[i];
        
        if (Number.isNaN(pin)) {
            return res.status(400).json({
                status: 400,
                message: `Invalid pin ${pin} param, it should be integer`
            });
        }
    
        const state: number = await digitalRead(board, pin);
        pinStates.push(state);
    }

    return res.status(200).json({
        status: 200,
        pin_state: {
            [r]: pinStates[0],
            [g]: pinStates[1],
            [b]: pinStates[2]
        }
    });
}

export async function writeRgbLed (req: Request, res: Response) {
    const r: ChannelPins = req.body.r;
    const g: ChannelPins = req.body.b;
    const b: ChannelPins = req.body.b;

    const rgbLeds: ChannelPins[] = Object.values({ r, g, b });

    try {
        rgbLeds.forEach((led, i) => {
            if (Number.isNaN(led.pin)) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid pin ${led.pin} param, it should be integer`
                });
            }
        
            switch (led.value) {
                case 'ON':
                    board.analogWrite(led.pin, board.HIGH);
                    console.log(`${req.hostname} | ${led.pin} | LED: ${led.value}`);
                    break;
                case 'OFF':
                    board.analogWrite(led.pin, board.LOW);
                    console.log(`${req.hostname} | ${led.pin} | LED: ${led.value}`);
                    break;
                default:
                    console.log(`${req.hostname} | ${led.pin} | LED: INVALID VALUE`);
            }
        })

        const pins: string[] = rgbLeds.map(c => `${c.pin}, `);
        const values: string[] = rgbLeds.map(c => `${c.value}, `);

        res.status(200).json({
            status: 200,
            message: `Success changed pins ${pins} to state ${values}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};