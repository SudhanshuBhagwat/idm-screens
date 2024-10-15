import localFont from "next/font/local";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.currentTarget);
    const sessionId = formData.get("sessionId") as string;
    const service = formData.get("service") as string;

    if(!sessionId) {
      return;
    }

    router.push({
      pathname: "/idm-service",
      query: {
        sessionId,
        service
      }
    }, "/idm-service")
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] w-full`}
    >
      <div className="flex items-center justify-center h-full">
        <form className="flex flex-col whitespace-nowrap gap-4" onSubmit={handleSubmit}>
          <label className="flex items-center gap-2">
            Session Id:  
            <input className="h-8 px-2 border border-gray-700 rounded-md" type="text" name="sessionId"/>
          </label>
          <label className="flex items-center gap-2">
            IDM Service: 
            <select className="h-8 px-2 w-full border border-gray-800 rounded-md" name="service">
              <option value={"IDSCAN"}>ID Scan</option>
              <option value={"VIDEOID"}>Video ID</option>
            </select>
          </label>
          <button type="submit" className="w-full bg-green-600 text-white rounded-md py-2 font-bold">
            Navigate to ID Scan
          </button>
        </form>
      </div>
    </div>
  );
}
