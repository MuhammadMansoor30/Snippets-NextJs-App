import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions/index";

interface snippetsShowPageProrps{
    params: {
        id: string
    }
};   // Creating an interface object to tell which kind of params we will receive instead of any

export default async function SnippetShowPage(props: snippetsShowPageProrps){
    await new Promise((r) => setTimeout(r, 2000)); // Creating artifical timeout for loaifn screen to show up.

    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}   // Getting id from props params obj
    });

    if(!snippet){
        return notFound();
    }

    const deleteSnippet = actions.deleteSnippet.bind(null, snippet.id);

    return (
        <>
        <div className="flex items-center justify-between m-4">
            <div className="text-xl bold">{snippet.title}</div>
            <div className="flex gap-2">
                <Link href={`${snippet.id}/edit`} className="border-2 rounded p-2">Edit</Link>
                <form action={deleteSnippet}>
                    <button type="submit" className="border-2 rounded p-2">Delete</button>
                </form>
            </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-grey-200">
            <code>{snippet.code}</code>   
        </pre>
        </>
    );
};

export async function generateStaticParams(){
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString(),   
            // Converting it to string as params by deafult should be strings and id is number in our case
        }
    });
}

// NOTES(SEC 3):
// If we have dynamic routes with params that change everytime then we can create folder like [id] this.
// Here [] brackets means that it could contain different param values and 'id' represents the key of that value that appears in url or params object.
// By deafult any props we pass to nextjs are treated as strings so we have to give appropriate type to the interface and then parse it down if we expect and integer or double.
// notFound function found in the next/navigation folder gives us a 404 not found page so that we can direct user that the desired page he expects is not available. 
// In nextjs we have some custom page name that nextjs treats as specific pages like the page.tsx files, error.tsx files and loading.tsx files similarly not-found.tsx file.
// As there name suggests these files do the same thing as there name is.
// By creating a not-found.tsx file if page doesnt exists then it calls the nearest not-found.tsx page and displays it.
// If the not-found.text file is not present then it will call the default not-found file. 
// the code tag inside of pre tag is used to write code elements to the pgae so that it looks different from other content on the page. The pre tage formats the code into the code like structure.

// (SEC 4):
// Deleting the snippet using the server action defined in index.ts file. More info in snipper-edit-form.tsx file.

// (SEC 6):
// Craeting an async function for generating static params so that we can alloww caching system of next to work and make our dynamic page as static page.
// For this we will get all the data from db and then map that data based on our param like in our case we have id so we will create an object and map the id of our db objects to the id defined.
// Based on that we ids the next will cached the pages before hand.