import ExpoModulesCore

public class CallBlockerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CallBlocker")

    // Call screening is Android-only; these stubs keep JS callers safe on iOS.

    Function("saveBlocklist") { (_: [String], _: [String]) in }

    Function("getBlocklist") {
      return ["prefixes": [], "exact": []] as [String: [String]]
    }

    Function("getBlockedCalls") {
      return [] as [[String: Any]]
    }

    Function("clearBlockedCalls") {
      return false
    }

    Function("isRoleHeld") {
      return false
    }

    Function("requestRole") {
      return false
    }
  }
}
