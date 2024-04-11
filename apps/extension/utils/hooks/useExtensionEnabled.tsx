import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { extensionEnabled } from "@/utils/storage.ts";

export function useExtensionEnabled(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  // holds the current value of the extensionEnabled
  const [enabled, setEnabled] = useState<boolean>(undefined!);

  // watch for changes in the extensionEnabled local storage value and update the state
  const unwatch = extensionEnabled.watch((enabled) => setEnabled(enabled));

  // get the current value of the extensionEnabled and set the state, single trigger useEffect
  useEffect(() => {
    extensionEnabled.getValue().then(setEnabled);
    return () => unwatch();
  }, []);

  // update the extensionEnabled local storage value when the state changes, single trigger useEffect
  useEffect(() => {
    if (enabled === undefined) return;
    extensionEnabled.setValue(enabled).catch(console.error);
  }, [enabled]);

  // return the state and the state setter
  return [enabled, setEnabled];
}
