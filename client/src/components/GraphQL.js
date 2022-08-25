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

const Mutation = (query, variables) => fetch(`/graphql`,{
    method:"POST",
    credentials:'include',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        variables,
        query
    })
})

export {Query, Mutation}