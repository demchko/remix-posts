import {Link, useLoaderData} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {db} from "~/utils/db.server";

type Post = {
    id: string;
    title: string;
    body?: string;
    createdAt?: string;
    updatedAt?: string;
}

type PostDB = {
    id: string;
    title: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: string;
}
type Data = {
    posts: PostDB[]
}

export const loader = async() => {
    const data: Data = {
        posts: await db.post.findMany({
            take: 20,
            select: {id: true, title: true, createdAt: true},
            orderBy: {createdAt: 'desc'}
        })
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
                    <Link key={item.id}  to={`/posts/${item.id}`}>
                        <div className='transition-all duration-500  border border-white p-5 rounded-md mt-5 hover:border-purple-500 hover:cursor-pointer ' >
                            <p>{item.title}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}