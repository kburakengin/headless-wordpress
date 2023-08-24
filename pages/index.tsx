import { Hero } from '@/components/Hero';

import { PostBlock } from '@/components/PostBlock';
import { getPosts } from '@/graphql-wordpress/service';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  console.log('getting posts');
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 3600,
  };
};

export default function HomePage({ posts }: { posts: any }) {
  return (
    <>
      <Hero />
      <div className='container mx-auto py-8'>
        <h3 className='text-xl'>All my posts (5)</h3>
        <div className='my-6 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {posts.map((post: any, index: any) => {
            return <PostBlock key={index} post={post} />;
          })}
        </div>
      </div>
    </>
  );
}
