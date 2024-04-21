import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DomainProps,
  DomainToggles,
  getCurrentDomainsProps,
} from "@/utils/storage.ts";
import Table from "@/ui/components/table/Table.tsx";

export type OptionsProps = {
  domains: DomainProps[];
  setDomains: (domains: DomainProps[]) => void;
};

function Options({ domains, setDomains }: OptionsProps) {
  const storedDomains = domains || [];
  const initialDomains = useRef<DomainProps[]>([]);
  const [trigger, setTrigger] = useState<boolean>(undefined!);
  const [toggles, setToggles] = useState<Record<string, DomainToggles>>({});

  useEffect(() => {
    if (!initialDomains.current || initialDomains.current.length === 0) {
      initialDomains.current = domains;
    }

    setToggles(
      storedDomains.reduce((acc: Record<string, DomainToggles>, cur) => {
        acc[cur.domain] = cur.toggles;
        return acc;
      }, {}),
    );
  }, [domains]);

  useEffect(() => {
    if (trigger === undefined) return;
    const newDomains = getCurrentDomainsProps(toggles).filter((domain) =>
      Object.values(domain.toggles).some((v) => v),
    );
    setDomains(newDomains);
  }, [trigger]);

  const toggleTrigger = useCallback(() => {
    setTrigger(trigger !== undefined ? !trigger : false);
  }, [trigger, setTrigger]);

  return (
    <Table
      items={initialDomains.current || []}
      toggles={toggles}
      setToggles={setToggles}
      toggleTrigger={toggleTrigger}
      data-testid={"table"}
    />
  );
}

export default Options;
