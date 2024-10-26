export default function SnippetsErrorPage(){
    return(
        <>
        <h1 className="text-xl bold">Sorry we coulnt find the snippet for specific id</h1>
        </>
    );
}

// NOTES (SEC 3):
// Creating a custom not-found.tsx page which will execute if a specfifc page will be not found.
// If it is not created then nextjs deafult not-found page will be called.