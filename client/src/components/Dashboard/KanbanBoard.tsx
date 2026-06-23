// src/components/KanbanBoard.tsx
import { useState } from 'react';
import type { ContentItem, Status } from '../../types';
import KanbanCard from './KanbanCard';
import CreateItemDialog from './CreateItemDialog';
import EditItemDialog from './EditItemDialog';

const STATUSES: Status[] = ['IDEA', 'DRAFT', 'REVIEW', 'PUBLISHED'];

const STATUS_LABELS: Record<Status, string> = {
  IDEA: 'Idé',
  DRAFT: 'Kladde',
  REVIEW: 'Review',
  PUBLISHED: 'Publiceret',
  ARCHIVED: 'Arkiveret',
};

export default function KanbanBoard({ items }: { items: ContentItem[] }) {
  const grouped = STATUSES.reduce(
    (acc, status) => {
      acc[status] = items
        .filter((item) => item.status === status)
        .sort(
          (firstItem, secondItem) =>
            new Date(firstItem.deadline).getTime() -
            new Date(secondItem.deadline).getTime()
        );
      return acc;
    },
    {} as Record<Status, ContentItem[]>
  );

  const [createStatus, setCreateStatus] = useState<Status | null>(null);

  const [editItem, setEditItem] = useState<ContentItem | null>(null);

  return (
    <div className="grid grid-cols-4 gap-4">
      {STATUSES.map((status) => (
        <div key={status} className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase">
              {STATUS_LABELS[status]}
            </h2>
            <span className="text-xs text-gray-400">
              {grouped[status].length}
            </span>
          </div>
          <div className="space-y-3">
            {grouped[status].map((item) => (
              <KanbanCard key={item.id} item={item} onClick={setEditItem} />
            ))}
          </div>
          <button
            onClick={() => {
              setCreateStatus(status);
            }}
            className="w-full mt-3 flex items-center justify-center py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <span className="text-xl leading-none">+</span>
          </button>
        </div>
      ))}

      <CreateItemDialog
        open={createStatus !== null}
        status={createStatus ?? 'IDEA'}
        onOpenChange={(open) => {
          if (!open) setCreateStatus(null);
        }}
      />

      <EditItemDialog
        key={editItem?.id}
        item={editItem}
        onOpenChange={(open) => {
          if (!open) setEditItem(null);
        }}
      />
    </div>
  );
}
