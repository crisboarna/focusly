import React, { useCallback, useEffect, useState } from "react";
import Table from "@/ui/components/table/Table.tsx";
import {
  DEFAULT_TOGGLES,
  DomainProps,
  DomainToggles,
  getCurrentDomainsProps,
} from "@/utils/storage.ts";

export type PopupProps = {
  currentDomains: string[];
  configuredDomains: DomainProps[];
  setDomains: (domains: DomainProps[]) => void;
};

function Popup({ currentDomains, configuredDomains, setDomains }: PopupProps) {
  const storedDomains = configuredDomains || [];
  const [trigger, setTrigger] = useState<boolean>(undefined!);
  const [toggles, setToggles] = useState<Record<string, DomainToggles>>({});

  useEffect(() => {
    // create O(1) lookup for domain existence and properties
    const domainLookup = storedDomains.reduce(
      (acc: Record<string, DomainProps>, cur) => {
        acc[cur.domain] = cur;
        return acc;
      },
      {},
    );

    setToggles(
      currentDomains.reduce((acc: Record<string, DomainToggles>, cur) => {
        acc[cur] = domainLookup[cur]?.toggles || DEFAULT_TOGGLES;
        return acc;
      }, {}),
    );
  }, [configuredDomains]);

  useEffect(() => {
    if (trigger === undefined) return;
    const newDomains = configuredDomains.filter(
      (domain) => !currentDomains.includes(domain.domain),
    );
    newDomains.push(
      ...getCurrentDomainsProps(toggles).filter((domain) =>
        Object.values(domain.toggles).some((v) => v),
      ),
    );
    setDomains(newDomains);
  }, [trigger]);

  const toggleTrigger = useCallback(() => {
    setTrigger(trigger !== undefined ? !trigger : false);
  }, [trigger, setTrigger]);

  if (!currentDomains || !currentDomains.length) {
    return <></>;
  }

  return (
    <Table
      items={getCurrentDomainsProps(toggles)}
      toggles={toggles}
      setToggles={setToggles}
      toggleTrigger={toggleTrigger}
    />
  );
}

export default Popup;
