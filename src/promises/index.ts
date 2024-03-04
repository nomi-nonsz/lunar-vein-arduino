import { Board } from "johnny-five";

export function digitalRead (board: Board, pin: number): Promise<number> {
    return new Promise((resolve, reject) => {
        board.digitalRead(pin, (val) => {
            resolve(val);
        });
        setTimeout(() => {
            reject(new Error("Reading digital timeout"));
        }, 5000);
    });
}

export function analogRead (board: Board, pin: string): Promise<number> {
    return new Promise((resolve, reject) => {
        board.analogRead(pin, (val) => {
            resolve(val);
        })
        setTimeout(() => {
            reject(new Error("Reading analog timeout"));
        }, 5000);
    })
}