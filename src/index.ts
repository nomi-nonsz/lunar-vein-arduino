import express, { Request, Response } from 'express';
import Firmata from 'firmata';
import promises from './promises';
const app = express();

const board = new Firmata('/dev/ttyUSB0');

const host = 'localhost';
const port = 3000;

const PIN = {
    servo: 0,
    rgb_led: {
        r: 10,
        g: 9,
        b: 8
    }
}

app.use(express.static('client'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('./client/index.html', { root: __dirname });
})

app.get('/api-arduino/led/:p', async (req: Request, res: Response) => {
    const { p } = req.params;
    const pin = Number.parseInt(p);

    if (Number.isNaN(pin)) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid pin param, it should be integer'
        });
    }

    const pinState = board.pins[pin].value;

    return res.status(200).json({
        status: 200,
        message: `Pin ${pin} state ${pinState}`
    });
})

app.patch('/api-arduino/led/:p/:a', (req: Request, res: Response) => {
    const { p, a } = req.params;
    const act = a.toLocaleLowerCase();
    const pin = Number.parseInt(p);

    try {
        if (Number.isNaN(pin)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid pin param, it should be integer'
            });
        }
    
        switch (act) {
            case 'on':
                board.digitalWrite(pin, board.HIGH);
                console.log(`${req.hostname} | ${pin} | ${act.toLocaleUpperCase()}`);
                break;
            case 'off':
                board.digitalWrite(pin, board.LOW);
                console.log(`${req.hostname} | ${pin} | ${act.toLocaleUpperCase()}`);
                break;
            default:
                console.log(`${req.hostname} | ${pin} | INVALID ACT`);
        }

        res.status(200).json({
            status: 200,
            message: `Success changed pin ${pin} to state ${act}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
});

app.listen(port, host, () => {
    console.log(`Server is running in ${host} at port ${port}`);
    console.log("Connecting Board");
    board.on('ready', () => {
        console.log(`Board ${board.ports[0]} Connected`);
    })
});