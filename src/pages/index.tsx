import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
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

type IdmSession = {
  sessionId: string;
};

export const getServerSideProps = (async () => {
  const response = await fetch(
    "https://portal-api-uat.idmission.com/portal.sessions.v1.SessionsService/CreateSession",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key_id: process.env.NEXT_API_KEY,
        api_key_secret: process.env.NEXT_API_KEY_SECRET,
      }),
    }
  );

  const jsonValue = await response.json();

  return {
    props: {
      session: {
        sessionId: jsonValue.session.id,
      },
    },
  };
}) satisfies GetServerSideProps<{ session: IdmSession }>;

export default function Home({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const sessionId = session.sessionId;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // @ts-ignore
    const formData = new FormData(event.currentTarget);
    const service = formData.get("service") as string;

    router.push(
      {
        pathname: "/idm-service",
        query: {
          sessionId,
          service,
        },
      },
      "/idm-service"
    );
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] w-full`}
    >
      <div className="flex items-center justify-center h-full">
        <form
          className="flex flex-col whitespace-nowrap gap-4"
          onSubmit={handleSubmit}
        >
          <label className="flex items-center gap-2">
            IDM Service:
            <select
              className="h-8 px-2 w-full border border-gray-800 rounded-md"
              name="service"
            >
              <option value={"IDSCAN"}>ID Scan</option>
              <option value={"VIDEOID"}>Video ID</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-md py-2 font-bold"
          >
            Navigate to ID Scan
          </button>
        </form>
      </div>
    </div>
  );
}
