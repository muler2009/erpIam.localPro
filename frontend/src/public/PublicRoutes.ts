import { useRoutes } from "react-router-dom";
import TestTS from "./TestTS";


interface Route {
    path: string;
    element: React.ReactElement;
}

interface RouteWithChildren {
    element: React.ReactElement;
    children: Route[];
}

const PublicRoutes = () => {
    const routes: (Route | RouteWithChildren)[] = [
        // {
        //     path: '/', 
        //     element: <Home /> 
        // },
        // {
        //     path: '/', 
        //     element: <Home /> 
        // },
    ];

    return useRoutes(routes)
}

export default PublicRoutes

