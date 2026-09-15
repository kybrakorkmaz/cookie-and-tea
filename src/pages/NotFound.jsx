import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-header text-h-2 text-primary-dark">Page not found</p>
        <p className="font-paragraph text-p text-primary-dark/70 mt-4 max-w-md">
            That URL is not a route in Cookie and Tea. Check the address, or go back home.
        </p>
        <Link
            to="/"
            className="mt-8 px-8 py-3 rounded-full bg-primary-dark text-white font-bold hover:opacity-90"
        >
            Back to home
        </Link>
    </div>
);

export default NotFound;
