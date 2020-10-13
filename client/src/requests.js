import { getAccessToken, isLoggedIn } from "./auth";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloLink,
} from "@apollo/client";

const endpoint = "http://localhost:9000/graphql";
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    // request.headers["authorization"] = `Bearer ${getAccessToken()}`;
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpoint })]),
  cache: new InMemoryCache(),
});

export const createJob = async (input) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;

  const {
    data: { job },
  } = await client.mutate({ mutation, variables: { input } });
  return job;
};

export const loadCompany = async (id) => {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const {
    data: { company },
  } = await client.query({ query, variables: { id } });
  return company;
};

export const loadJob = async (id) => {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const {
    data: { job },
  } = await client.query({ query, variables: { id } });
  return job;
};

export const loadJobs = async () => {
  const query = gql`
    {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `;
  const {
    data: { jobs },
  } = await client.query({ query });
  return jobs;
};
