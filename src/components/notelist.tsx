import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NoteCard from "./ui/notecard";
import { useMemo, useState } from "react";
import { Note, Tag } from "@/pages";
import ReactSelect from "react-select";

type NotesListProps = {
  availableTags: Tag[];
  notes: Note[];
};

export default function NoteList({ availableTags, notes }: NotesListProps) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className='flex flex-col space-y-8 justify-center items-center'>
      <div className='flex flex-row justify-between items-center px-2 min-w-[24rem] sm:min-w-full'>
        <div>
          <h1 className='text-4xl'>Notes</h1>
        </div>
        <div className='flex flex-row space-x-2'>
          <Button onClick={() => router.push("/new")}>Create</Button>
          <Button>Edit Tags</Button>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-4 px-2'>
        <div className='w-[24rem] space-y-2'>
          <p>Title</p>
          <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></Input>
        </div>
        <div className='w-[24rem] space-y-2'>
          <p>tags</p>
          <ReactSelect
            instanceId={"react-select"}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { id: tag.value, label: tag.label };
                })
              );
            }}
            className='w-96'
            isMulti
          />
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-4 justify-center px-2'>
        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} noteId={note.id} noteTitle={note.title} noteTags={note.tags.flatMap((tag) => tag.label)} />;
        })}
      </div>
    </div>
  );
}
