package expo.modules.avoloblockers

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

object BlockedCallStore {
    private const val PREFS = "blocked_calls"
    private const val KEY = "log"
    private const val MAX_ENTRIES = 500   // cap so SharedPreferences never bloats

    fun add(context: Context, number: String?) {
        val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        val raw = prefs.getString(KEY, "[]") ?: "[]"
        val arr = try {
            JSONArray(raw)
        } catch (e: Exception) {
            JSONArray()
        }

        arr.put(JSONObject().apply {
            put("number", number ?: "unknown")
            put("timestamp", System.currentTimeMillis())
        })

        // keep only the most recent MAX_ENTRIES
        val trimmed = if (arr.length() > MAX_ENTRIES) {
            JSONArray().also { out ->
                for (i in (arr.length() - MAX_ENTRIES) until arr.length()) out.put(arr.get(i))
            }
        } else arr

        prefs.edit().putString(KEY, trimmed.toString()).apply()
    }

    fun getAll(context: Context): List<Map<String, Any?>> {
        val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        val raw = prefs.getString(KEY, "[]") ?: "[]"
        val arr = try {
            JSONArray(raw)
        } catch (e: Exception) {
            JSONArray()
        }
        return (0 until arr.length()).map { i ->
            val o = arr.getJSONObject(i)
            mapOf(
                "number" to o.optString("number", "unknown"),
                "timestamp" to o.optLong("timestamp", 0L)
            )
        }.reversed()   // newest first, ready for the History list
    }

    fun clear(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit().remove(KEY).apply()
    }
}
