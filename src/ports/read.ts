import * as SerialPort from 'serialport';

export async function ReadPorts (): Promise<string[]> {
    const ports = await SerialPort.SerialPort.list();
    return ports
        .filter(port => port.pnpId != null)
        .map(port => port.path)
}