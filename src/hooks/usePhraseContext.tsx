import { useContext } from "react";

import { PhraseContext } from "../context";

export function usePhraseContext() {
  const context = useContext(PhraseContext);

  if (context === undefined) {
    throw new Error("usePhraseContext must be used within a PhraseProvider");
  }

  return context;
}
