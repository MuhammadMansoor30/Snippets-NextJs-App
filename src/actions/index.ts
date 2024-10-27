'use server';
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createSnippet(formState: {message: string}, formData: FormData){
    // Adding in the formState object here to tell the server about the formState and change it and then pass it to the client comp
    try{
        const title = formData.get('title');
        const code = formData.get('code');

        if(typeof title !== 'string' || title.length < 3){
            return {
                message: "Title must be longer"
            }
        }
        if(typeof code !== 'string' || code.length < 10){
            return {
                message: "Code must be longer"
            }
        }
        const snippet = await db.snippet.create({
            data: {
                title,
                code,
            }
        });
        console.log(snippet);
    }
    catch(err: unknown){
        if(err instanceof Error){    // Checking for typeof Error and then displaying it on screen 
            return {
                message: err.message,
            }
        }
        else{
            return {
                message: "Something Went Wrong!!!"
            }
        }
    }
    redirect('/');
}

export async function editSnippet(id: number, code: string){
    await db.snippet.update({
        where: {id},
        data: {code}
    });   // Updating the snippet of specfifc id with given data

    redirect(`/snippets/${id}`);   // Redirecting back to snippets page.

}

export async function deleteSnippet(id: number){
    await db.snippet.delete({
        where: {id}
    });

    redirect(`/`);
}

// NOTES (SEC 4):
// We cannot use server actions inside of client components directly.
// There are two ways of using server actions inside of client components.
// 1. Passing the server action as props from a server component.
// Server components do not allow the event handlers but in this case there is an exception and they can pass an event handler or  server action function as props to a client component.
// 2. Create a separate file with 'use server' directive and export all the server actions function which are required.
// We are using the 2nd option here.
// By default we should always use try catch block and formState to handle error messages onstead of error page so that user can have the option to correct there error.
// Also we should never add redirect fucntion to the try catch block if we do so it will caught and error and display it.