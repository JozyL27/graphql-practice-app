const endpoint = 'http://localhost:9000/graphql'

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