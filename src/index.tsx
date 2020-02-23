import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
	uri: "http://penguin.termina.linux.test:4000/graphql"
});

const Application = () => (
	<ApolloProvider client={client}>
		<Router />
	</ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById("root"));
