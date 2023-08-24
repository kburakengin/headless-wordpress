import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT || `http://localhost:8888/graphql`;

export async function getPosts() {
  const graphqlQuery = `query getPosts {
	posts(first: 10) {
	  nodes {
		slug
		title
	  }
	}
  }`;

  const response = await axios.post(API_URL, {
    query: graphqlQuery,
  });

  return response.data.data.posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const graphqlQuery = `query getPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        slug
        title
      }
    }`;

  const response = await axios.post(API_URL, {
    query: graphqlQuery,
    variables: {
      slug,
    },
  });

  console.log(response.data.data.post);

  return response.data.data.post;
}
