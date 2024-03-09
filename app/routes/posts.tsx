import {MetaFunction} from "@remix-run/node";
import {Outlet} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Posts" },
    ];
};
export default function Posts(){
    return (
        <div>
            <Outlet />
        </div>
    )
}