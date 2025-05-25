import React from 'react';

interface ListItemProps {
  items?: string[];
  emptyMessage?: string;
}

export default function ListItem({ items, emptyMessage = 'None' }: ListItemProps) {
  if (!items || items.length === 0) {
    return <span className="text-sm text-gray-500 italic">{emptyMessage}</span>;
  }

  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}