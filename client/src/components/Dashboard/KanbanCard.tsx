// src/components/KanbanCard.tsx
import type { ContentItem } from '../../types';
import { parseAuthors } from '../../types';

interface KanbanCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
}

export default function KanbanCard({ item, onClick }: KanbanCardProps) {
  const deadline = new Date(item.deadline).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div
      onClick={() => onClick(item)}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-orange-500 uppercase">{item.type}</p>
        <p className="text-xs text-gray-600 font-medium">{deadline}</p>
      </div>
      <h3 className="text-sm font-medium text-gray-800 mb-3">{item.title}</h3>
      <div className="flex text-xs ">
        <span className="text-gray-400">Authors: </span>
        <span className="ml-1 text-gray-500 font-medium">
          {parseAuthors(item.authors).join(', ')}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Oprettet af {item.createdBy}</p>
    </div>
  );
}
