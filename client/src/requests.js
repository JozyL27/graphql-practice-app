const endpoint = 'http://localhost:9000/graphql'

export const loadJob = async (id) => {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `query JobQuery($id: ID!){
                job(id: $id) {
                  id
                  title
                  company {
                    id
                    name
                  }
                  description
                }
              }`,
            variables: { id }
        })
    })

    const body = await res.json()
    return body.data.job
}

export const loadJobs = async () => {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `{
                jobs {
                  id
                  title
                  company {
                    id
                    name
                  }
                }
              }`
        })
    })

    const body = await res.json()
    return body.data.jobs
}