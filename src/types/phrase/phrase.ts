interface PhraseSchema {
  id: string;
  text: string;
  category: string;
  createdAt: string;
}

type PhraseCategory = "general" | "quote" | "reminder" | "note";

export type { PhraseSchema, PhraseCategory };
