import {useParams} from "react-router";

export default function Post(){
    const {postId} = useParams();
    return (
        <div>
            <p>Post {postId}</p>
        </div>
    )
}