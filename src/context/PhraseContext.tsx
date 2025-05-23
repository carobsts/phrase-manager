import { createContext, useReducer, type ReactNode } from "react";

import { v4 as uuidv4 } from "uuid";

import type { PhraseSchema, PhraseCategory } from "../types";

interface PhraseState {
  phrases: PhraseSchema[];
}

type PhraseAction =
  | { type: "ADD_PHRASE"; payload: { text: string; category: string } }
  | { type: "DELETE_PHRASE"; payload: string }
  | {
      type: "EDIT_PHRASE";
      payload: { id: string; text: string; category: string };
    };

export interface PhraseContextType extends PhraseState {
  addPhrase: (text: string, category: PhraseCategory) => void;
  deletePhrase: (id: string) => void;
  editPhrase: (id: string, text: string, category: PhraseCategory) => void;
}

export const PhraseContext = createContext<PhraseContextType | undefined>(
  undefined
);

function phraseReducer(state: PhraseState, action: PhraseAction): PhraseState {
  switch (action.type) {
    case "ADD_PHRASE":
      return {
        ...state,
        phrases: [
          ...state.phrases,
          {
            id: uuidv4(),
            text: action.payload.text,
            category: action.payload.category,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    case "DELETE_PHRASE":
      return {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase.id !== action.payload),
      };
    case "EDIT_PHRASE":
      return {
        ...state,
        phrases: state.phrases.map((phrase) =>
          phrase.id === action.payload.id
            ? {
                ...phrase,
                text: action.payload.text,
                category: action.payload.category,
              }
            : phrase
        ),
      };
    default:
      return state;
  }
}

interface PhraseProviderProps {
  children: ReactNode;
}

export function PhraseProvider({ children }: PhraseProviderProps) {
  const [state, dispatch] = useReducer(phraseReducer, { phrases: [] });

  const addPhrase = (text: string, category: PhraseCategory = "general") => {
    dispatch({ type: "ADD_PHRASE", payload: { text, category } });
  };

  const deletePhrase = (id: string) => {
    dispatch({ type: "DELETE_PHRASE", payload: id });
  };

  const editPhrase = (id: string, text: string, category: PhraseCategory) => {
    dispatch({ type: "EDIT_PHRASE", payload: { id, text, category } });
  };

  return (
    <PhraseContext.Provider
      value={{ ...state, addPhrase, deletePhrase, editPhrase }}
    >
      {children}
    </PhraseContext.Provider>
  );
}
