import { memo, useState } from "react";

import { Trash2, Edit2 } from "lucide-react";

import type { PhraseSchema } from "../../../../types";

import { usePhraseContext } from "../../../../hooks";

import {
  Badge,
  BadgeContainer,
  ButtonContainer,
  Card,
  CardContent,
  CardFooter,
  DateText,
  IconButton,
  Text,
  VisuallyHidden,
} from "./PhaseCard.styles";

import { DeleteConfirmationDialog, EditPhraseDialog } from "../Dialog";

export interface PhraseCardProps {
  phrase: PhraseSchema;
}

export const PhraseCard = memo(function PhraseCard({
  phrase,
}: PhraseCardProps) {
  const { deletePhrase } = usePhraseContext();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDelete = (): void => {
    deletePhrase(phrase.id);
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <>
      <Card
        key={`${phrase.id}-${phrase.text}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        whileHover={{ y: -5 }}
      >
        <CardContent>
          <Text>{phrase.text}</Text>
        </CardContent>
        <CardFooter>
          <BadgeContainer>
            <Badge category={phrase.category}>{phrase.category}</Badge>
            <DateText>{formatDate(phrase.createdAt)}</DateText>
          </BadgeContainer>
          <ButtonContainer>
            <IconButton
              variant="edit"
              onClick={() => setIsEditDialogOpen(true)}
              data-testid={`edit-phrase-${phrase.id}`}
              aria-label={`Edit phrase: ${phrase.text}`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Edit2 size={16} />
              <VisuallyHidden>Edit</VisuallyHidden>
            </IconButton>
            <IconButton
              variant="delete"
              onClick={() => setIsDeleteDialogOpen(true)}
              data-testid={`delete-phrase-${phrase.id}`}
              aria-label={`Delete phrase: ${phrase.text}`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Trash2 size={16} />
              <VisuallyHidden>Delete</VisuallyHidden>
            </IconButton>
          </ButtonContainer>
        </CardFooter>
      </Card>

      <EditPhraseDialog
        phrase={phrase}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        phraseText={phrase.text}
      />
    </>
  );
});
