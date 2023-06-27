import NewNotePage from "@/components/newnote";
import { useContext } from "react";
import { NoteData, Tag } from "..";
import { localContext } from "@/store/localContext";

export default function NewPage() {
  const localCtx = useContext(localContext);

  function onCreateNote({ tags, ...data }: NoteData) {
    localCtx.setNotes((prevNotes: any) => {
      return [...prevNotes, { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function addTag(tag: Tag) {
    localCtx.setTags((prev: any) => [...prev, tag]);
  }

  return (
    <>
      <NewNotePage onSubmit={onCreateNote} onAddTag={addTag} availableTags={localCtx.tags} />
    </>
  );
}
