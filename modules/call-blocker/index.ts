import { requireNativeModule } from 'expo-modules-core';

const CallBlocker = requireNativeModule('CallBlocker');

export type Blocklist = { prefixes: string[]; exact: string[] };

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
