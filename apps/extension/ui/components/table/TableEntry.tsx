import React from "react";
import { DomainProps, DomainToggles, Toggle } from "@/utils/storage.ts";

export type TableProps = {
  readonly index: number;
  readonly item: DomainProps;
  readonly toggles: Record<string, DomainToggles>;
  readonly setToggles: (toggles: Record<string, DomainToggles>) => void;
  readonly toggleTrigger: () => void;
};

function TableEntry({
  index,
  item,
  toggles,
  setToggles,
  toggleTrigger,
  ...props
}: TableProps) {
  const handleToggleChange = (key: keyof DomainToggles) => {
    const newToggles: DomainToggles =
      key === Toggle.ALL
        ? Object.values(Toggle).reduce((acc, cur) => {
            acc[cur] = !toggles[item.domain][Toggle.ALL];
            return acc;
          }, {} as DomainToggles)
        : {
            ...toggles[item.domain],
            [Toggle.ALL]: false,
            [key]: !toggles[item.domain]?.[key]
          };

    setToggles({
      ...toggles,
      [item.domain]: newToggles,
    });

    toggleTrigger();
  };

  return (
    <tr key={index} {...props}>
      <td>{item.domain}</td>
      <td>
        <table className={"table"}>
          <tbody>
            <tr key={`${index}-0`}>
              <td colSpan={2}>All</td>
              <td colSpan={2}>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.ALL] ?? false}
                  onChange={() => handleToggleChange(Toggle.ALL)}
                />
              </td>
            </tr>
            <tr key={`${index}-1`}>
              <td>Hidden</td>
              <td>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.HIDDEN] ?? false}
                  onChange={() => handleToggleChange(Toggle.HIDDEN)}
                />
              </td>
              <td>Focus</td>
              <td>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.FOCUS] ?? false}
                  onChange={() => handleToggleChange(Toggle.FOCUS)}
                />
              </td>
            </tr>
            <tr key={`${index}-2`}>
              <td>Page Hide</td>
              <td>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.PAGE_HIDE] ?? false}
                  onChange={() => handleToggleChange(Toggle.PAGE_HIDE)}
                />
              </td>
              <td>Blur</td>
              <td>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.BLUR] ?? false}
                  onChange={() => handleToggleChange(Toggle.BLUR)}
                />
              </td>
            </tr>
            <tr key={`${index}-3`}>
              <td>Visibility State</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    toggles[item.domain]?.[Toggle.VISIBILITY_STATE] ?? false
                  }
                  onChange={() => handleToggleChange(Toggle.VISIBILITY_STATE)}
                />
              </td>
              <td>Visibility Change</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    toggles[item.domain]?.[Toggle.VISIBILITY_CHANGE] ?? false
                  }
                  onChange={() => handleToggleChange(Toggle.VISIBILITY_CHANGE)}
                />
              </td>
            </tr>
            <tr key={`${index}-4`}>
              <td>Lost Point Capture</td>
              <td>
                <input
                  type="checkbox"
                  checked={
                    toggles[item.domain]?.[Toggle.LOST_POINTER_CAPTURE] ?? false
                  }
                  onChange={() =>
                    handleToggleChange(Toggle.LOST_POINTER_CAPTURE)
                  }
                />
              </td>
              <td>Mouse Leave</td>
              <td>
                <input
                  type="checkbox"
                  checked={toggles[item.domain]?.[Toggle.MOUSE_LEAVE] ?? false}
                  onChange={() => handleToggleChange(Toggle.MOUSE_LEAVE)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default TableEntry;
