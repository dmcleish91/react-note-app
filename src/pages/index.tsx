import { localContext } from "@/store/localContext";
import dynamic from "next/dynamic";
import { useContext } from "react";

const NoteList = dynamic(() => import("@/components/notelist"), {
  ssr: false,
});

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export default function Home() {
  const localCtx = useContext(localContext);

  return <NoteList availableTags={localCtx.tags} notes={localCtx.notesWithTags} />;
}
