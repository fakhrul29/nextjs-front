
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";



const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export default ()=> {
	const READ_TODOS = gql`
	  query todos{
		todos {
		  id
		  text
		  completed
		}
	  }
	`;

	const CREATE_TODO = gql`
	  mutation CreateTodo($text: String!) {
		createTodo(text: $text)
	  }
	`;

	const REMOVE_TODO = gql`
	  mutation RemoveTodo($id: String!) {
		removeTodo(id: $id)
	  }
	`;
	return(
		<ApolloProvider client={client}>
			<READ_TODOS />
			<CREATE_TODO />
			<REMOVE_TODO />
		</ApolloProvider>
	)
}
	

