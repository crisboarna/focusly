import { useCallback, useEffect, useState } from 'react';

export default function Logger({ hidden, focus, visible }: { hidden: boolean, focus: boolean, visible: boolean }) {
  const [records, setRecords] = useState<{ hidden: boolean, focus: boolean, visible: boolean, date: Date }[]>([]);

  const getString = (record: any) => {
    const date = record.date.toLocaleTimeString();
    return `${date}. Visible: ${record.visible}, Hidden: ${
      record.hidden
    }, Focus: ${record.focus}.`;
  };

  const getRecords = useCallback(() => {
    if (
      records.length > 0 &&
      hidden === records[0].hidden &&
      focus === records[0].focus &&
      visible === records[0].visible
    ) {
      return -1;
    }

    const record = {
      visible,
      hidden,
      focus,
      date: new Date()
    };
    setRecords([record, ...records].slice(0, 7));
  },[focus, hidden, records, visible]);

  useEffect(() => {
    getRecords();
  }, [hidden, focus, visible, getRecords]);

  return (
    <div>
      <p>Last records:</p>
      <ul className="list-none m-0 p-0 text-gray-400 text-sm">
        {records.map((record, index) => (
          <li key={record.date.getTime().toString()} className={`text-gray-400`}>
            {getString(record)}
          </li>
        ))}
      </ul>
    </div>
  );
}
