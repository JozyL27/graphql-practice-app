const endpoint = "http://localhost:9000/graphql";

const graphqlRequest = async (query, variables = {}) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }

  return responseBody.data;
};

export const createJob = async (input) => {
  const mutation = `mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
          id
          title
          company {
            id
            name
          }
        }
    }`;

  const { job } = await graphqlRequest(mutation, { input });
  return job;
};

export const loadCompany = async (id) => {
  const query = `query CompanyQuery($id: ID!){
        company(id: $id) {
          id
          name
          description
          jobs {
              id
              title
          }
        }
    }`;
  const { company } = await graphqlRequest(query, { id });
  return company;
};

export const loadJob = async (id) => {
  const query = `query JobQuery($id: ID!){
        job(id: $id) {
          id
          title
          company {
            id
            name
          }
          description
        }
    }`;
  const { job } = await graphqlRequest(query, { id });
  return job;
};

export const loadJobs = async () => {
  const query = `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }`;

  const { jobs } = await graphqlRequest(query);
  return jobs;
};
