// src/components/CreateItemDialog.tsx
import { useState } from 'react';
import { Dialog } from '@base-ui/react';
import type { ItemType, Status } from '../../types';
import { useCreateItem } from '../../hooks/use-create-item';

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: Status;
}

export default function CreateItemDialog({
  open,
  onOpenChange,
  status,
}: CreateItemDialogProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ItemType>('ARTICLE');
  const today = new Date().toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(today);
  const [authors, setAuthors] = useState('');

  const { mutate: createItem } = useCreateItem();

  const handleSubmit = async () => {
    createItem({
      title,
      type,
      authors,
      deadline,
      status,
    });
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle('');
    setType('ARTICLE');
    setDeadline('');
    setAuthors('');
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) resetForm();
        onOpenChange(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
            Nyt indhold
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ItemType)}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                placeholder="andreas, louise"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 cursor-pointer">
              Annuller
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              Opret
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
