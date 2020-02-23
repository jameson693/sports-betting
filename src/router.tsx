import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import PlaceBet from "./components/PlaceBet";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/">
				<App />
			</Route>
			<Route path="/bet/:gameId">
				<PlaceBet />
			</Route>
		</Switch>
	</BrowserRouter>
);

export default Router;
