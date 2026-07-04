package expo.modules.avoloblockers

import android.app.role.RoleManager
import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CallBlockerModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CallBlocker")

        Function("saveBlocklist") { prefixes: List<String>, exact: List<String> ->
            val ctx = appContext.reactContext ?: return@Function
            ctx.getSharedPreferences("blocklist", Context.MODE_PRIVATE)
                .edit()
                .putStringSet("prefixes", prefixes.toSet())
                .putStringSet("exact", exact.toSet())
                .apply()
        }

        Function("getBlocklist") {
            val ctx = appContext.reactContext
            val prefs = ctx?.getSharedPreferences("blocklist", Context.MODE_PRIVATE)
            mapOf(
                "prefixes" to (prefs?.getStringSet("prefixes", emptySet())?.toList() ?: emptyList()),
                "exact" to (prefs?.getStringSet("exact", emptySet())?.toList() ?: emptyList())
            )
        }

        Function("isRoleHeld") {
            val ctx = appContext.reactContext ?: return@Function false
            val rm = ctx.getSystemService(Context.ROLE_SERVICE) as RoleManager
            rm.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING) &&
                    rm.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
        }

        Function("requestRole") {
            val activity = appContext.currentActivity ?: return@Function false
            val rm = activity.getSystemService(Context.ROLE_SERVICE) as RoleManager
            if (rm.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING) &&
                !rm.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
            ) {
                val intent = rm.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                activity.startActivityForResult(intent, 1001)
                return@Function true
            }
            return@Function false
        }
    }
}
