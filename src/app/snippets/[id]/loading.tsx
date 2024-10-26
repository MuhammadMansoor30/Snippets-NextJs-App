export default function SnippetLoadingPage(){
    return (
        <>
        <h1>Loading ...</h1>
        </>
    );
}

// NOTES (SEC 3):
// Creating a custom loading.tsx page which will execute if a specfifc page is in loading state.
// Similarly next.js will look for nearest loading.tsx file page and executes it until data is feteched from server or db.