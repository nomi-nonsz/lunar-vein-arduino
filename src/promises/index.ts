import Board, { PIN_MODE } from "firmata";

export function digitalRead (board: Board, pin: number): Promise<PIN_MODE | number> {
    return new Promise((resolve, reject) => {
        board.digitalRead(pin, (val) => {
            resolve(val);
        });
        setTimeout(() => {
            reject(new Error("Reading digital timeout"));
        }, 5000);
    });
}

export function analogRead (board: Board, pin: number): Promise<number> {
    return new Promise((resolve, reject) => {
        board.analogRead(pin, (val) => {
            resolve(val);
        })
        setTimeout(() => {
            reject(new Error("Reading analog timeout"));
        }, 5000);
    })
}