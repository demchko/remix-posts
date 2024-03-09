import {Link, useLoaderData} from "@remix-run/react";
import {Button} from "~/components/ui/button";

type Post = {
    id:number;
    title: string;
}
type Data = {
    posts: Post[]
}

export const loader = () => {
    const data: Data = {
        posts: [
            {id:1, title: 'Post 1'},
            {id:2, title: 'Post 2'},
            {id:3, title: 'Post 3'},
        ]
    }

    return data;
}

export default function PostsIndex(){
    const {posts}: {posts: Post[]} = useLoaderData();
    return (
        <div className='p-10' >
            <div className='flex justify-between' >
                <p className='text-3xl' >Posts</p>
                <Button variant='secondary' ><Link to='/posts/new'>New Post</Link></Button>
            </div>
            {
                posts.map((item: Post) => (
                    <div key={item.id} className='transition-all duration-500  border border-white p-5 rounded-md mt-5 hover:border-purple-500 hover:cursor-pointer ' >
                        <p>{item.title}</p>
                    </div>
                ))
            }
        </div>
    )
}