import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='m-auto my-8 max-w-[49rem]'>
      <Component {...pageProps} />
    </div>
  );
}
