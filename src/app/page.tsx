import {db} from "@/db";
import Link from "next/link";

export default async function HomePage() {
  const snippets = await db.snippet.findMany();   // Finds all the snippets from Db.

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link key={snippet.id} href={`snippets/${snippet.id}`} className="flex p-2 justify-between items-center border-2 rounded">
          <div>{snippet.title}</div>
          <div>View</div>
      </Link>
    )
  });

  return (
    <>
    <div className="flex m-2 justify-between items-center">
      <div className="text-xl bold">Snippets</div>
      <Link href={'/snippets/new'} className="p-2 border-2 rounded" >New</Link>
    </div>
    <h1 className="flex flex-col gap-2" >{renderedSnippets}</h1>
    </>
  );
}


// NOTES (SEC 3):
// In nextjs we have two types of components: client components and server components.
// By default all components in nextjs app are server components and are rendered on the next js server.
// We can also use async await with these server components and they help improve app performance.
// For creating a client component we have to type 'use client' syntax on top of component then it will consider it as a client com
// Client components are rendered on the browser itself.
// The use of React hooks like useState and useEffect is only possible inside of the Client components.
// Also we cannot use event handlers like onCHnage onClick on server components.