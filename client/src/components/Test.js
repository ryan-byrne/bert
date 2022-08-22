import {useEffect, useState} from "react";

const Test = () => {

    const [user, setUser] = useState(null);
    const [loginLink, setLoginLink] = useState(null);

    useEffect(()=>
        fetch( "http://localhost:5000/test/auth/link" )
            .then( resp => resp.text().then( link => setLoginLink(link) ) )
    ,[setLoginLink])

    return (
        <div>
            <a href={loginLink}>Login</a>
        </div>
    )
}

export default Test;