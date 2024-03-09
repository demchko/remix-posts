import {Button} from "~/components/ui/button";
import {Link} from "@remix-run/react";

export default function Header(){
    return (
        <header className='p-10 flex justify-between items-center border-b border-white' >
            <p className='text-5xl' >
                <Link to='/' >REMIX</Link>
            </p>
            <Button variant='ghost' size='lg' >
                <Link to='/posts'>Posts</Link>
            </Button>
        </header>
    )
}