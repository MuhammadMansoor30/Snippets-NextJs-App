'use client'
import { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react"; 
import { useState } from "react";
// import { editSnippet } from "@/actions/index";  // We can import it using this way
import * as actions from "@/actions/index";   // Or using this way

interface showSnippetProps{
    snippet: Snippet
}

export default function SnippetEditForm({snippet}: showSnippetProps){
    const [code, setCode] = useState(snippet.code);

    const editSnippetCode = actions.editSnippet.bind(null, snippet.id, code);  
    // Using the bind func to bind id and code to editSnippetCode func

    const handleCodeChange = (value: string="") => {  // Provideing default value to string or empty as it can also be null.
        console.log(value);
        setCode(value);
    }
    
    return (
        <>
        <Editor
            height='40vh'
            theme="vs-dark"
            language="javascript"
            defaultValue={snippet.code}
            onChange={handleCodeChange}
        />
        <form action={editSnippetCode}>
            <button className="p-2 border rounded" type="submit">Save</button>
        </form>
        </>
    );
}


// NOTES (SEC 3):
// Using the Snippet object from prisma client to get access to entire snippet obj to use ad edit the snippets.
// Creating this client component so that we can use monaco code editor to edit the code.
// It is a react component and it requires hooks to functions that is why we are using client components. 
// We will install the editor using the npm install command and import it here to use it.

// (SEC 4):
// There are two options for calling server actions from client components.
// 1st is to use the bind method of vanilla js and create a new function with our desired argument. Bind method binds the arguments of one function to other as shown above.
// This method requires a form element and the server action function can have a formData argument.
// Also this method can execute on browsers or websites with no Javascript support.
// 2nd is to use more traditional react way of adding an event handler to execute the server action.
// This method requires a 'startTransition' function from react which stops the navigation to next page on event handler so that the server action can execute completely.
// In this case we will use the 1st method but we can also use 2nd method if we want more simplicity. 