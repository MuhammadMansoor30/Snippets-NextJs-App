'use client'
import { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react"; 
import { useState } from "react";

interface showSnippetProps{
    snippet: Snippet
}

export default function SnippetEditForm({snippet}: showSnippetProps){
    const [code, setCode] = useState(snippet.code);

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
        </>
    );
}


// NOTES (SEC 3):
// Using the Snippet object from prisma client to get access to entire snippet obj to use ad edit the snippets.
// Creating this client component so that we can use monaco code editor to edit the code.
// It is a react component and it requires hooks to functions that is why we are using client components. 
// We will install the editor using the npm install command and import it here to use it.