// src/components/EditItemDialog.tsx
import { useState } from 'react';
import { Dialog } from '@base-ui/react';
import type { ContentItem, ItemType, Status } from '../../types';
import { useAuth } from '../../context/auth-context';
import { useUpdateItem } from '../../hooks/use-update-item';
import { useArchiveItem } from '../../hooks/use-archive-item';
import { usePublishItem } from '../../hooks/use-publish-item';

const STATUS_LABELS: Record<Status, string> = {
  IDEA: 'Idé',
  DRAFT: 'Kladde',
  REVIEW: 'Review',
  PUBLISHED: 'Publiceret',
  ARCHIVED: 'Arkiveret',
};

interface EditItemDialogProps {
  item: ContentItem | null;
  onOpenChange: (open: boolean) => void;
}

export default function EditItemDialog({
  item,
  onOpenChange,
}: EditItemDialogProps) {
  const { username, role } = useAuth();
  const { mutate: updateItem } = useUpdateItem();
  const { mutate: archiveItem } = useArchiveItem();
  const { mutate: publishItem } = usePublishItem();

  const [title, setTitle] = useState(item?.title ?? '');
  const [type, setType] = useState<ItemType>(item?.type ?? 'ARTICLE');
  const [deadline, setDeadline] = useState(item?.deadline.split('T')[0] ?? '');
  const [authors, setAuthors] = useState(item?.authors ?? '');
  const [status, setStatus] = useState<Status>(item?.status ?? 'IDEA');

  const canEdit = role === 'EDITOR' || item?.createdBy === username;
  const EDITABLE_STATUSES = (Object.keys(STATUS_LABELS) as Status[]).filter(
    (s) => s !== 'PUBLISHED' && s !== 'ARCHIVED'
  );
  const itemIsPublished = item?.status === 'PUBLISHED';

  const handleSubmit = () => {
    if (!item) return;
    updateItem({ id: item.id, title, type, authors, deadline, status });
    onOpenChange(false);
  };

  const handleArchive = () => {
    if (!item) return;
    archiveItem(item.id);
    onOpenChange(false);
  };

  const handlePublish = () => {
    if (!item) return;
    publishItem(item.id);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={!!item} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
            Rediger indhold
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!canEdit}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ItemType)}
                disabled={!canEdit}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="ARTICLE">Artikel</option>
                <option value="VIDEO">Video</option>
                <option value="PODCAST">Podcast</option>
                <option value="OTHER">Andet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Forfattere
              </label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                disabled={!canEdit}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={!canEdit}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {!itemIsPublished && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  disabled={!canEdit}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                >
                  {EDITABLE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {itemIsPublished && (
              <div className="flex gap-2">
                <div className="block text-sm text-gray-600 mb-1">Status:</div>
                <div className="text-sm font-semibold text-green-600">
                  Publiceret
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            {canEdit && (
              <div className="flex gap-3">
                <button
                  onClick={handleArchive}
                  className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Arkivér
                </button>

                {!itemIsPublished && (
                  <button
                    onClick={handlePublish}
                    className="text-sm text-green-600 hover:text-green-800 cursor-pointer"
                  >
                    Publicér
                  </button>
                )}
              </div>
            )}
            <div className="flex gap-3 ml-auto">
              <Dialog.Close className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 cursor-pointer">
                Annuller
              </Dialog.Close>
              {canEdit && (
                <button
                  onClick={handleSubmit}
                  className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
                >
                  Gem
                </button>
              )}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
