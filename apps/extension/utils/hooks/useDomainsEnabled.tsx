import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { DomainProps, domainsEnabled } from "@/utils/storage.ts";

export function useDomainsEnabled(): [
  DomainProps[],
  Dispatch<SetStateAction<DomainProps[]>>,
] {
  // holds the current value of the extensionEnabled
  const [domains, setDomains] = useState<DomainProps[]>(undefined!);

  // get the current value of the domainsEnabled and set the state, single trigger useEffect
  useEffect(() => {
    domainsEnabled.getValue().then(setDomains);
    // return () => unwatch();
  }, []);

  // update the domainsEnabled local storage value when the state changes, single trigger useEffect
  useEffect(() => {
    if (domains === undefined) return;
    domainsEnabled.setValue(domains).catch(console.error);
    // return () => unwatch();
  }, [domains]);

  // return the state and the state setter
  return [domains, setDomains];
}
