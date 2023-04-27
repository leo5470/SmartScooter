import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <main className="container">
                <div id="error-page">
                    <hgroup>
                        <h1>Oops!</h1>
                        <h5>Sorry, an unexpected error has occurred.</h5>
                    </hgroup>
                    <img src="/image/dancing-cat.gif"></img>
                    <Error></Error>
                </div>
            </main>
        </>
    );
}

function Error() {
    const error = useRouteError();
    console.log(error)

    if (isRouteErrorResponse(error)) {
        return <p>{error.status} {error.statusText}</p>
    }

    return <p>Unknown Error</p>
}