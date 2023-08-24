import { getPostBySlug, getPosts } from '@/graphql-wordpress/service';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function PostDetails({ post }: { post: any }) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl'>{post.slug}</h1>
      <div className='my-6'>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post: any) => `/posts/${post.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params', params);
  const post = await getPostBySlug(params?.slug as string);

  return {
    props: { post },
  };
};
