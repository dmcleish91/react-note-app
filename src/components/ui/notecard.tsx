import { useRouter } from "next/router";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";

type NoteCardProps = {
  className?: string;
  noteTitle: string;
  noteTags: string[];
  noteId: string;
};

export default function NoteCard({ className, noteTitle, noteTags, noteId }: NoteCardProps) {
  const router = useRouter();

  return (
    <Card className={`w-[384px] hover:shadow-lg hover:scale-101 transition duration-300 ${className}`} onClick={() => router.push(`/${noteId}`)}>
      <CardHeader>
        <CardTitle>{noteTitle}</CardTitle>
        <div className='space-x-1'>
          {noteTags.map((tag) => (
            <Badge key={tag} className='truncate' variant='destructive'>
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
