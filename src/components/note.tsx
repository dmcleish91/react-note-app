import type { Note } from "@/pages";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  note: Note;
  onDeleteNote: (id: string) => void;
};

export default function NotePage({ note, onDeleteNote }: NoteProps) {
  const router = useRouter();

  function deleteNote() {
    onDeleteNote(note.id);
    router.back();
  }

  return (
    <div>
      <div className='flex flex-row mb-4'>
        <div className='w-1/2 space-y-2'>
          <h1 className='text-4xl font-bold'>{note.title}</h1>
          <div className='space-x-1'>
            {note.tags.map((tag) => (
              <Badge key={tag.id} className='truncate' variant='destructive'>
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className='flex flex-row items-center justify-center w-1/2 gap-2'>
          <Button variant={"default"} className='bg-blue-500 hover:bg-blue-300' onClick={() => router.push(`edit/${note.id}`)}>
            Edit
          </Button>
          <Button variant={"outline"} className='border-red-300 text-red-400 hover:bg-red-300' onClick={deleteNote}>
            Delete
          </Button>
          <Button variant={"outline"} onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
      <ReactMarkdown className='prose'>{note.markdown}</ReactMarkdown>
    </div>
  );
}
