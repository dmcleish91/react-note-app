import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import CreateableReactSelect from "react-select/creatable";
import FormGroup from "./ui/formgroup";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "@/pages";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({ title: titleRef.current!.value, markdown: markdownRef.current!.value, tags: selectedTags });
    router.back();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className='mb-4'>
        <Input className='w-96' type='text' placeholder='Title' required ref={titleRef} defaultValue={title} />
        <CreateableReactSelect
          instanceId={"react-select"}
          onCreateOption={(label) => {
            const newTag = { id: crypto.randomUUID(), label };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
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
      </FormGroup>
      <FormGroup className='mb-4'>
        <Textarea className='w-[49rem] h-48' placeholder='Note Body' required ref={markdownRef} defaultValue={markdown} />
      </FormGroup>
      <FormGroup className='justify-end'>
        <Button type='submit'>Submit</Button>
        <Button variant='outline' type='button' onClick={() => router.back()}>
          Cancel
        </Button>
      </FormGroup>
    </form>
  );
}
