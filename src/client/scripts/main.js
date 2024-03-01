document.getElementById('toggleLed1').addEventListener('mousedown', async () => {
    const res = await fetch('/api-arduino/led/13/on', {
        method: 'PATCH'
    });
    const data = await res.json();

    console.log(data);
})

document.getElementById('toggleLed1').addEventListener('mouseup', async () => {
    const res = await fetch('/api-arduino/led/13/off', {
        method: 'PATCH'
    });
    const data = await res.json();

    console.log(data);
})