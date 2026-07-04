import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getBlockedCalls, clearBlockedCalls, type BlockedCall } from '../../modules/call-blocker';

export default function History() {
  const [calls, setCalls] = useState<BlockedCall[]>([]);

  const load = useCallback(() => {
    setCalls(getBlockedCalls());
  }, []);

  // reload every time the tab regains focus, so new blocks show up
  useFocusEffect(load);

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Blocked calls</Text>
        {calls.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              clearBlockedCalls();
              load();
            }}>
            <Text className="text-red-500">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={calls}
        keyExtractor={(item, i) => `${item.timestamp}-${i}`}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-400">No blocked calls yet</Text>
        }
        renderItem={({ item }) => (
          <View className="border-b border-gray-100 py-3">
            <Text className="text-base">{item.number}</Text>
            <Text className="text-xs text-gray-400">
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
