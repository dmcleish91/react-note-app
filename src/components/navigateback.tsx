import { useRouter } from "next/router";
import { Button } from "./ui/button";

type NavigateBackProps = {
  url: string;
};

export default function NavigateBack({ url }: NavigateBackProps) {
  const router = useRouter();
  return (
    <>
      <div>
        <p>The resource you are trying to access does not exist.</p>
        <Button onClick={() => router.replace(url)}>Go Back</Button>
      </div>
    </>
  );
}
