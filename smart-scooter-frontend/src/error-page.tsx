import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Error></Error>
        </div>
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