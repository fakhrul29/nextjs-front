import { useRouter } from 'next/router'
import {useState, useEffect } from 'react'
import useSWR from 'swr';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Link from 'next/link'
import Head from 'next/head'
import Layout from "../../components/layout";


const client = new ApolloClient({
		  uri: 'http://192.168.1.121:4000/graphql',
		  cache: new InMemoryCache()
		});

const SUBMIT_POST = gql`
  mutation SubmitPost($input: PostInput!) {
    submitPost(input: $input) {
      id
    }
  }`;

const Post = ({post, body}) => (<>
	<h4>{body || post.body}</h4>
            <hr/>
            <h6>Author: {post.author} - Id: {post.id}</h6>
	</>)

const Edit = ({post, setBody}) => (<>
	<input name="body" type="text" defaultValue={post.body} onChange={(e)=>setBody(e.target.value)} />
            <hr/>
            <h6>Author: {post.author} - Id: {post.id}</h6>
	</>)
	
const action = async function(edit, setEdit, stBody, e) {
		e.preventDefault()
		
		if(edit && stBody.length && this.body !== stBody) {
//		  alert(`St body=${stBody}, id: ${this.id}  ${this.body} ${this.author}`)
		  
		  const {id, author, body } = this	
		  const input = { id, author, body:stBody };

		  await client.mutate({
			variables: { input },
			mutation: SUBMIT_POST,
			//refetchQueries: () => [{ query: GET_POSTS }],
		  });		
		}
		setEdit( Boolean(edit^true) )
	}//end fnc action
	

export default function SinglePost( props ) {
	const router = useRouter()
	const { id, author, body } = router.query
	const post = { id, author, body }
	console.log('router query ...all', router.query)
	const [edit, setEdit] = useState(false)
//	const {post} =props
	const [stBody, setBody] = useState('')	
	
	var error = false
	if(error) {
		console.error(error)
		return(<font color="red">Error</font>)
		}
	else if(post) {
		
		return (
        <Layout title="This is Post Details">
            {edit? <Edit post={post} setBody={setBody} /> : <Post post={post} body={stBody} />}
            
            <a href="#" onClick={action.bind(post, edit, setEdit, stBody)}>{edit? 'Save': 'Edit'}</a>
            <h3>
                <Link href="/posts">Posts</Link>
            </h3>
        </Layout>
        )
	} else {
		return(<></>);
	}	
       
  }
  
