import { useCallback } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { motion } from "framer-motion";

import { toast, usePhraseContext } from "../../../../hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { Input } from "../../../../components/ui/input";

import type { PhraseCategory } from "../../../../types";

import { Button } from "../../../../styles/components";

const formSchema = z.object({
  text: z.string().min(1, "Phrase cannot be empty"),
  category: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function PhraseForm() {
  const { addPhrase } = usePhraseContext();

  const formContext = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      category: "general",
    },
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      try {
        addPhrase(values.text.trim(), values.category as PhraseCategory);

        formContext.reset({
          text: "",
          category: "general",
        });

        toast({
          title: "Success",
          description: "Phrase added successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to add phrase: ${error}`,
          variant: "destructive",
        });
      }
    },
    [addPhrase, formContext]
  );

  const formVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  const { handleSubmit, control, formState } = formContext;

  return (
    <Form {...formContext}>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        data-testid="phrase-form"
        aria-label="Add new phrase"
        variants={formVariants}
        initial="initial"
        animate="animate"
      >
        <FormField
          control={control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter a new phrase..."
                  {...field}
                  data-testid="phrase-input"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="quote">Quote</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />

        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800"
            disabled={formState.isSubmitting}
          >
            Add Phrase
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}
