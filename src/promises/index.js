function digitalRead (board, pin) {
    return new Promise((resolve, reject) => {
        board.digitalRead(pin, (val) => {
            resolve(val);
        });
    });
}

module.exports = { digitalRead };