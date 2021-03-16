import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Link from 'next/link'
import Head from 'next/head'
import Layout from "../../components/layout";


export default function AllPosts( {posts} ) {
	const id = 10
	
    return (
        <Layout title="This is a Post Page, data are fetched from graphql">
                    
            {posts && posts.map( (p,k) =>(<div key={k}>
				<h6>Author: {p.author} (id: {p.id})</h6>
				<h5>Body: {p.body}</h5>
				<Link href={`/posts/${p.id}`}>Edit</Link>
				<hr/>
				<Link href={{
              pathname: '/posts/[id]/[author]/[body]',
              query: { id: p.id, author: p.author, body:p.body },
            }}
				>
				Edit with params</Link>
				</div>) 
				)}
            <h3>
                <Link href="/">Home</Link>
            </h3>
        </Layout>
        );
  }
  

export async function getStaticProps() {
	try{
		const client = new ApolloClient({
		  uri: 'http://localhost:4000/graphql',
		  cache: new InMemoryCache()
		});
		
		const { data } = await client.query({
			query: gql`
			  query {
				posts {
				  id
				  author
				  body
				}
			  }`
		});
		console.log( 'getStatProps', data )
		return {
		  props: {
			posts: data.posts
		  }
		}
		
	} catch(e) {
			console.error(e)
			return {
			  props: {
				posts: []
			  }
			}
	} finally {
		
	}	
	
}//end getStaticProps  
