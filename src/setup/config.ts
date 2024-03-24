import { config } from 'dotenv';

config();

export const cfg = {
  port: process.env.SERIAL_PORT || '/dev/ttyUSB0',
  server: {
    port: 3000,
    host: 'localhost',
    cors: "*"
  }
}