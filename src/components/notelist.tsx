import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export default function NoteList() {
  return (
    <div className='flex flex-col space-y-8 justify-center'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <h1 className='text-4xl'>Notes</h1>
        </div>
        <div className='flex flex-row space-x-2'>
          <Button>Create</Button>
          <Button>Edit Tags</Button>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-4'>
        <div className='w-[24rem] space-y-2'>
          <p>Title</p>
          <Input></Input>
        </div>
        <div className='w-[24rem] space-y-2'>
          <p>tags</p>
          <Input></Input>
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-4 justify-center'>
        <Card className='w-[384px]'>
          <CardHeader>
            <CardTitle>Note Title</CardTitle>
            <CardDescription>Tags:</CardDescription>
          </CardHeader>
        </Card>
        <Card className='w-[384px]'>
          <CardHeader>
            <CardTitle>Note Title</CardTitle>
            <CardDescription>Tags:</CardDescription>
          </CardHeader>
        </Card>
        <Card className='w-[384px]'>
          <CardHeader>
            <CardTitle>Note Title</CardTitle>
            <CardDescription>Tags:</CardDescription>
          </CardHeader>
        </Card>
        <Card className='w-[384px]'>
          <CardHeader>
            <CardTitle>Note Title</CardTitle>
            <CardDescription>Tags:</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
