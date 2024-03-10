import {db} from "~/utils/db.server";
import {Form, Link, redirect, useLoaderData} from "@remix-run/react";
import {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {Button} from "~/components/ui/button";

type Post = {
    id: string;
    title: string;
    body?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const loader = async({params}: LoaderFunctionArgs) => {
    const post = await db.post.findUnique({
        where: {id: params.postId}
    })

    if(!post) throw new Error('Post not found');
    const data = {post};
    return data;
}

export const action = async({request, params}) => {
    const form = await request.formData();
    if(form.get('_method') === 'delete'){
        const post = await db.post.findUnique({
            where: {id: params.postId}
        })
        if(!post) throw new Error('Post not found');
        await db.post.delete({where: {id: params.postId}})
    }

    return redirect('/posts');
}

export default function Post(){
    const {post}: {post: Post} = useLoaderData();

    return (
        <div className='p-10' >
            <div className='flex justify-between' >
                <p className='text-3xl' >{post.title}</p>
                <Link to='/posts'>Back</Link>
            </div>
            <div className='mt-5' >
                <p>{post.body}</p>
            </div>
            <div className='flex justify-end' >
                <Form method='post' >
                    <input type='hidden' name='_method' value='delete' />
                    <Button variant='destructive' >Delete</Button>
                </Form>
            </div>
        </div>
    )
}