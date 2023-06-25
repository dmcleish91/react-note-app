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
};

export default function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({ title: titleRef.current!.value, markdown: markdownRef.current!.value, tags: selectedTags });
    router.back();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Input className='w-96' type='text' placeholder='Title' required ref={titleRef} />
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
      <FormGroup>
        <Textarea className='w-[49rem] h-48' placeholder='Note Body' required ref={markdownRef} />
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
