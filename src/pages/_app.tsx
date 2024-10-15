import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="min-h-screen flex flex-col">
    <nav className="h-16 bg-slate-800 w-full px-6 py-2 flex items-center">
      <h1 className="text-2xl font-bold text-white select-none">Sandbox</h1>
    </nav>
    <main className="flex flex-grow">
      <Component {...pageProps} />
    </main>
  </div>;
}
