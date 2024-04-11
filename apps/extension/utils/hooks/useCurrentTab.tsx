import { useEffect, useState } from "react";
import { browser, Tabs } from "wxt/browser";

export function useCurrentTab() {
  // holds the current value of the currentTab
  const [currentTab, setCurrentTab] = useState<Tabs.Tab>(undefined!);

  // get the current value of the currentTab and set the state, single trigger useEffect
  useEffect(() => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        setCurrentTab(tabs[0]);
      })
      .catch(console.error);
  }, []);

  // return the state and the state setter
  return [currentTab];
}
