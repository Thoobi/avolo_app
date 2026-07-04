import { requireNativeModule } from 'expo-modules-core';

const CallBlocker = requireNativeModule('CallBlocker');

export type Blocklist = { prefixes: string[]; exact: string[] };

export type BlockedCall = {
  number: string;
  timestamp: number; // epoch millis
};

export function getBlockedCalls(): BlockedCall[] {
  return CallBlocker.getBlockedCalls();
}

export function clearBlockedCalls(): boolean {
  return CallBlocker.clearBlockedCalls();
}

export function saveBlocklist(prefixes: string[], exact: string[]): void {
  CallBlocker.saveBlocklist(prefixes, exact);
}

export function getBlocklist(): Blocklist {
  return CallBlocker.getBlocklist();
}

export function requestRole(): void {
  CallBlocker.requestRole();
}

export function isRoleHeld(): boolean {
  return CallBlocker.isRoleHeld();
}
