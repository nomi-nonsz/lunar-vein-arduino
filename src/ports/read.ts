import * as SerialPort from 'serialport';

export async function ReadPorts (): Promise<{ name?: string, path?: string, serialNumber?: string | number }[]> {
    const ports = await SerialPort.SerialPort.list();
    return ports
        .filter(port => port.pnpId != null)
        .map(port => {
            return {
                name: port['friendlyName'],
                path: port.path,
                serialNumber: port.serialNumber
            }
        })
}