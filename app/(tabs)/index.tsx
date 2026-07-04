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
    <SafeAreaView className="bg-ink flex-1">
      <View className="px-5 pb-6 pt-4">
        <Text className="text-2xl font-bold text-white">Call Blocker</Text>
        <Text className="text-muted mt-1 text-sm">Silently rejects matching incoming calls.</Text>
      </View>

      {/* Role banner */}
      {!roleOk && (
        <Pressable
          onPress={() => {
            requestRole();
            // re-check shortly after the dialog
            setTimeout(() => setRoleOk(isRoleHeld()), 1500);
          }}
          className="bg-danger/15 border-danger/40 mx-5 mb-4 rounded-2xl border px-4 py-3">
          <Text className="text-danger font-semibold">
            Blocking is OFF — tap to grant call-screening permission
          </Text>
        </Pressable>
      )}

      {/* Input */}
      <View className="gap-3 px-5">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="+234…  or  full number"
          placeholderTextColor="#5b606b"
          keyboardType="phone-pad"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white"
        />

        <View className="flex-row items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
          <Text className="text-white">
            {asPrefix ? 'Block as prefix (range)' : 'Block exact number'}
          </Text>
          <Switch value={asPrefix} onValueChange={setAsPrefix} />
        </View>

        <Pressable onPress={add} className="rounded-2xl bg-white px-4 py-4 active:opacity-80">
          <Text className="text-ink text-center text-base font-semibold">Add to blocklist</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        className="mt-6"
        contentContainerClassName="px-5 pb-10 gap-2"
        data={entries}
        keyExtractor={(e) => e.value}
        ListEmptyComponent={
          <Text className="text-muted mt-8 text-center">No numbers blocked yet.</Text>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <View>
              <Text className="text-base text-white">
                {item.value}
                {item.isPrefix ? '…' : ''}
              </Text>
              <Text className="text-muted mt-0.5 text-xs">
                {item.isPrefix ? 'Prefix' : 'Exact'}
              </Text>
            </View>
            <Pressable
              onPress={() => remove(item.value)}
              className="bg-danger/15 rounded-xl px-3 py-2 active:opacity-70">
              <Text className="text-danger font-medium">Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
