import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="container error-page">
      <h1 className="mt-12 mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Oops!
      </h1>
      <p className="mb-6 text-2xl font-normal text-gray-500  sm:px-16 xl:px-48 dark:text-gray-400">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="lg:text-xl sm:px-16 xl:px-48">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
