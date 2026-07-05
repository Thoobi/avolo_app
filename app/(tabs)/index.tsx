import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveBlocklist, getBlocklist, requestRole, isRoleHeld } from '@/modules/call-blocker';

type Entry = { value: string; isPrefix: boolean };

export default function BlocklistScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [asPrefix, setAsPrefix] = useState(true);
  const [roleOk, setRoleOk] = useState(false);

  // Load existing list + check role on mount.
  useEffect(() => {
    const { prefixes, exact } = getBlocklist();
    setEntries([
      ...prefixes.map((v) => ({ value: v, isPrefix: true })),
      ...exact.map((v) => ({ value: v, isPrefix: false })),
    ]);
    setRoleOk(isRoleHeld());
  }, []);

  // Persist to native whenever the list changes.
  useEffect(() => {
    const prefixes = entries.filter((e) => e.isPrefix).map((e) => e.value);
    const exact = entries.filter((e) => !e.isPrefix).map((e) => e.value);
    saveBlocklist(prefixes, exact);
  }, [entries]);

  const add = () => {
    const v = input.trim();
    if (!v || entries.some((e) => e.value === v)) return;
    setEntries((prev) => [{ value: v, isPrefix: asPrefix }, ...prev]);
    setInput('');
  };

  const remove = (value: string) => setEntries((prev) => prev.filter((e) => e.value !== value));

  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="pb-6">
        <Text className="text-xl font-bold text-black">Call Blocker</Text>
        <Text className="mt-1 text-sm text-muted">Silently rejects matching incoming calls.</Text>
      </View>

      {/* Role banner */}
      {!roleOk && (
        <Pressable
          onPress={() => {
            requestRole();
            // re-check shortly after the dialog
            setTimeout(() => setRoleOk(isRoleHeld()), 1500);
          }}
          className="mb-4 rounded-2xl border border-danger/40 bg-danger/15 px-4 py-3">
          <Text className="font-semibold text-danger">
            Blocking is OFF — tap to grant call-screening permission
          </Text>
        </Pressable>
      )}

      {/* Input */}
      <View className="gap-3">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="+234…  or  full number"
          placeholderTextColor="#5b606b"
          keyboardType="phone-pad"
          className="rounded-2xl border border-black bg-white/5 px-4 py-3 text-base text-black dark:text-black"
        />

        <View className="flex-row items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
          <Text className="text-black">
            {asPrefix ? 'Block as prefix (range)' : 'Block exact number'}
          </Text>
          <Switch value={asPrefix} onValueChange={setAsPrefix} />
        </View>

        <Pressable onPress={add} className="rounded-2xl bg-black px-4 py-4 active:opacity-80">
          <Text className="text-center text-base font-semibold text-white">Add to blocklist</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        className="mt-6"
        contentContainerClassName="pb-10 gap-2"
        data={entries}
        keyExtractor={(e) => e.value}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-muted">No numbers blocked yet.</Text>
        }
        renderItem={({ item }) => (
          <View className="flex w-full flex-row items-center justify-between rounded-xl bg-black/5 px-4 py-3">
            <View className="flex-1">
              <Text className="text-base text-black">
                {item.value}
                {item.isPrefix ? '…' : ''}
              </Text>
              <Text className="mt-0.5 text-xs text-muted">
                {item.isPrefix ? 'Prefix' : 'Exact'}
              </Text>
            </View>
            <Pressable
              onPress={() => remove(item.value)}
              className="rounded-lg bg-danger/15 px-3 py-2 active:opacity-70">
              <Text className="font-semibold text-danger">Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
