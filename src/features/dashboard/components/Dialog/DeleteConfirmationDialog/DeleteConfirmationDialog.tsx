import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  phraseText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  phraseText,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  const truncatedText =
    phraseText.length > 40 ? `${phraseText.substring(0, 40)}...` : phraseText;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-labelledby="delete-dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="delete-dialog-title" className="text-red-600">
            Delete Phrase
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="text-sm text-muted-foreground mb-2">
            Are you sure you want to delete this phrase?
          </div>
          <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
            {`"${truncatedText}"`}
          </div>
          <div className="mt-2 text-sm text-red-600 font-medium">
            This action cannot be undone.
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            data-testid="confirm-delete-button"
            aria-label="Confirm delete"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
