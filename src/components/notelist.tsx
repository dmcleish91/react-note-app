import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NoteCard from "./ui/notecard";
import { useMemo, useState, Fragment } from "react";
import { Note, Tag } from "@/pages";
import ReactSelect from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import FormGroup from "./ui/formgroup";

type NotesListProps = {
  availableTags: Tag[];
  notes: Note[];
  setTags: (tags: any | Tag[]) => void;
};

type EditTagModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  availableTags: Tag[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

export default function NoteList({ availableTags, notes, setTags }: NotesListProps) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  function updateTag(id: string, label: string) {
    setTags((prevTags: Tag[]) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags: Tag[]) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <div className='flex flex-col space-y-8 justify-center items-center'>
      <div className='flex flex-row justify-between items-center px-2 min-w-[24rem] sm:min-w-full'>
        <div>
          <h1 className='text-4xl'>Notes</h1>
        </div>
        <div className='flex flex-row space-x-2'>
          <Button onClick={() => router.push("/new")}>Create</Button>
          <Button onClick={() => setIsOpen(true)}>Edit Tags</Button>
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
      <EditTagsModal isOpen={isOpen} setIsOpen={setIsOpen} availableTags={availableTags} updateTag={updateTag} deleteTag={deleteTag} />
    </div>
  );
}

function EditTagsModal({ isOpen, setIsOpen, availableTags, updateTag, deleteTag }: EditTagModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className='relative z-50'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </Transition.Child>

        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <Dialog.Panel className='mx-auto max-w-sm rounded bg-white p-4'>
              <Dialog.Title className='text-2xl text-center py-2'>Edit Tags</Dialog.Title>
              <form>
                {availableTags.map((tag) => (
                  <FormGroup className='py-2'>
                    <Input value={tag.label} className='w-64' onChange={(e) => updateTag(tag.id, e.target.value)} />{" "}
                    <Button className='border-red-300 hover:bg-red-300 text-lg' variant={"outline"} onClick={() => deleteTag(tag.id)}>
                      &times;
                    </Button>
                  </FormGroup>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
