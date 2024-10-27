'use client';

interface errorProps{
    error: Error,
    reset: () => void
}

export default function ErrorPage({error}: errorProps){
    console.log(error);
}

// NOTES (SEC 4):
// The error.tsx file is used to display an error page whenever an error is thrown in the application.
// It is always a client component and takes 2 props.
// One is the error props that tells about the error that has occured.
// The 2nd is the reset function which is applied to a button so that we can reset the user or redirect it ot previous page.
// For this reason we want to make it as a client component so that we can add evenet handlers to it.