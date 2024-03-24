import { address } from 'ip';

export function getPublicIp () {
  return address("public", "ipv4") || '127.0.0.1';
}