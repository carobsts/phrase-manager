import { useEffect, useCallback } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import type { PhraseCategory, PhraseSchema } from "../../../../../types";
import { toast, usePhraseContext } from "../../../../../hooks";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/form";

import { Input } from "../../../../../components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

import { Button } from "../../../../../components/ui/button";

const formSchema = z.object({
  text: z.string().min(1, "Phrase cannot be empty"),
  category: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPhraseDialogProps {
  phrase: PhraseSchema | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditPhraseDialog = ({
  phrase,
  isOpen,
  onClose,
}: EditPhraseDialogProps) => {
  const { editPhrase } = usePhraseContext();

  const formContext = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: phrase?.text || "",
      category: phrase?.category || "general",
    },
  });

  const { reset, handleSubmit, control, formState } = formContext;

  useEffect(() => {
    if (phrase && isOpen) {
      reset({
        text: phrase.text,
        category: phrase.category,
      });
    }
  }, [phrase, reset, isOpen]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (!phrase) {
        return;
      }

      try {
        editPhrase(
          phrase.id,
          values.text.trim(),
          values.category as PhraseCategory
        );
        toast({
          title: "Success",
          description: "Phrase updated successfully",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to update phrase: ${error}`,
          variant: "destructive",
        });
      }
    },
    [phrase, editPhrase, onClose]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-labelledby="edit-dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="edit-dialog-title">Edit Phrase</DialogTitle>
        </DialogHeader>

        <Form {...formContext}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            aria-label="Edit phrase form"
          >
            <FormField
              control={control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter phrase text"
                      {...field}
                      data-testid="edit-phrase-input"
                      aria-label="Phrase text"
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general" className="text-purple-800">
                        General
                      </SelectItem>
                      <SelectItem value="quote" className="text-orange-800">
                        Quote
                      </SelectItem>
                      <SelectItem value="reminder" className="text-blue-800">
                        Reminder
                      </SelectItem>
                      <SelectItem value="note" className="text-green-800">
                        Note
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800"
                disabled={formState.isSubmitting}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
