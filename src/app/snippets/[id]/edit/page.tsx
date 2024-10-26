import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface snippetEditPageProps{
    params: {
        id: string,
    }
}

export default async function SnippetEditPage(props: snippetEditPageProps){
    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}
    });
    
    if(!snippet){
        return notFound();
    }

    return (
        <>
        <SnippetEditForm snippet={snippet} />
        </>
    );
}

// NOTES (SEC 3):
// Creating the edit page with a client component and passing down props to it so that we can create an editor to edit the code of out snippet.