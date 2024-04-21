import React from "react";
import { DomainProps, DomainToggles } from "@/utils/storage.ts";
import TableEntry from "@/ui/components/table/TableEntry.tsx";
import "./Table.css";

export type TableProps = {
  readonly items: DomainProps[];
  readonly toggles: Record<string, DomainToggles>;
  readonly setToggles: (toggles: Record<string, DomainToggles>) => void;
  readonly toggleTrigger: () => void;
};

function Table({ items, toggles, setToggles, toggleTrigger, ...props }: TableProps) {
  return (
    <table className={"table"} {...props}>
      <thead>
        <tr>
          <th>Domain</th>
          <th>Triggers</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <TableEntry
            key={index}
            item={item}
            index={index}
            toggles={toggles}
            setToggles={setToggles}
            toggleTrigger={toggleTrigger}
            data-testid={"table-entry"}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
