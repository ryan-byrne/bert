const Query = (query, variables) => fetch(`/graphql`,{
    method:"POST",
    credentials:'include',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        query,
        variables
    })
})

const SyncQuery = async (query, variables) => {
    const resp = await fetch(`/graphql`,{
        method:"POST",
        credentials:'include',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            query,
            variables
        })
    })
    const data = await resp.json()
    return data
}

export {Query, SyncQuery}