'use client';  // Making it the client component to handle formState changes and validations
import * as actions from "@/actions/index";
import { useFormState } from "react-dom";

export default function SnippetsCreatePage() {
    const [formState, action] = useFormState(actions.createSnippet, { message: '' });
    // Creating the useFormState hook which returns two array elements and takes 2 args more in notes.

    return (
        <form action={action}>
            <h3 className="font-bold m-3">Create a New Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label htmlFor="title" className="w-12">Title</label>
                    <input name="title" id="title" className="border rounded p-2 w-full" ></input>
                </div>
                <div className="flex gap-4">
                    <label htmlFor="code" className="w-12">Code</label>
                    <textarea name="code" id="code" className="border rounded p-2 w-full" ></textarea>
                </div>
                {
                    formState.message ? 
                        <div className="my-2 p-2 border rounded bg-red-200 border-red-400">{formState.message}</div> : null
                }
                <button type="submit" className="rounded bg-blue-200 p-2">Create</button>
            </div>
        </form>
    );
}

// NOTES (SEC 4 + 5):
// Now we will create useFormState hook to modify our create page so that we can also handle errors if there are any.
// For this we will make our server component into client component and move our server action to actions folder.
// Then by uisng the useFormSate hook we can make changes.
// The hook takes two arguments 1st is the server action to be perfromed whihc it will later return inside of the action.
// The 2nd arg is the default state which is added as an object which will be updated and stored in formState obj.
// The hook returns array of two values 1 is formSate obj which holds the updated formState received from the server.
// The 2nd value of array is the updated action which the form will perform after the re render based on the formSate recieved from the server.


// {SEC 3 Code without Validations and wothout useFormState hook}
// import { redirect } from "next/navigation";
// import { db } from "@/db";

// export default function SnippetsCreatePage() {
//     async function createSnippet(formData: FormData){   // Takes formData values as args which are of type FormData
//         'use server';  // Tells nextjs server to treat it as a server action.
//         const title = formData.get('title') as string;
//         const code = formData.get('code') as string;
//         const snippet = await db.snippet.create({
//             data: {
//                 title,
//                 code,
//             }
//         });
//         console.log(snippet);
//         redirect('/');
//     }

//     return (
//       <form action={createSnippet}>
//         <h3 className="font-bold m-3">Create a New Snippet</h3>
//         <div className="flex flex-col gap-4">
//             <div className="flex gap-4">
//                 <label htmlFor="title" className="w-12">Title</label>
//                 <input name="title" id="title" className="border rounded p-2 w-full" ></input>
//             </div>
//             <div className="flex gap-4">
//                 <label htmlFor="code" className="w-12">Code</label>
//                 <textarea name="code" id="code" className="border rounded p-2 w-full" ></textarea>
//             </div>
//             <button type="submit" className="rounded bg-blue-200 p-2">Create</button>
//         </div>
//       </form>
//     );
// }

// NOTES (SEC 2 + 3):
// We will use Next js server actions to add data to our database.
// For this we will create an async function and by using the directive if 'use server' tells next js that it is a server action.
// We can use the formData object to get all the elements and data out of the form we have created.
// By default Typescript treated formdata object as datatype that can contain all the dofferent items we can input to the form including radio btns, checkboxes and even files.
// The 'redirect' function of Nextjs is used for redirecting user to other parts of the application.
// We will use the 'db' object created in the 'index.ts' file to create an entry into the database.
// The actions of 'db' object are asyncronous.
// We can call the final server action function inside of the action property of the form element which performs the specific action on form submission.