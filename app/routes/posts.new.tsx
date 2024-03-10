import {Form, redirect} from "@remix-run/react";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";
import {ActionFunctionArgs} from "@remix-run/node";
import {db} from "~/utils/db.server";

export const action = async({request}: ActionFunctionArgs) => {
    const form = await request.formData();
    const title = form.get('title');
    const body = form.get('body');

    const fields = {title, body};
    const post = await db.post.create({data: fields});
    return redirect(`/posts/${post.id}`);
}

export default function NewPost(){
    return (
        <div className='p-10' >
            <p className='text-3xl' >New Post</p>
            <Form method='post' >
                <Label>Title</Label>
                <Input name='title' className='mb-5' type='text' placeholder='Title' />
                <Label >Post Body</Label>
                <Textarea name='body' placeholder='Post body' />
                <Button variant='ghost' className='w-full mt-10' type='submit' >Add Post</Button>
            </Form>
        </div>
    )
}