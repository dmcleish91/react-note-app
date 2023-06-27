import useLocalStorage from "@/lib/useLocalStorage";
import type { Note, RawNote, Tag } from "@/pages";
import { createContext, ReactNode, useMemo } from "react";

export const localContext = createContext({} as localContext);

export function LocalContextProvider(props: { children: ReactNode }) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  const context: localContext = {
    notes: notes,
    tags: tags,
    notesWithTags: notesWithTags,
    setNotes: setNotes,
    setTags: setTags,
  };

  return <localContext.Provider value={context}>{props.children}</localContext.Provider>;
}

export default LocalContextProvider;

type localContext = {
  notes: RawNote[];
  tags: Tag[];
  notesWithTags: Note[];
  setNotes: (notes: any) => void;
  setTags: (tags: any) => void;
};
