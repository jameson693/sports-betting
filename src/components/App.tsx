import React from "react";
import { useQuery } from "@apollo/react-hooks";
import MatchupCard, { Props as MatchupCardProps } from "./MatchupCard";
import { Grid } from "@material-ui/core";
import { GET_ODDS } from "../queries";

function App() {
	const { loading, error, data } = useQuery(GET_ODDS);

	if (loading || error) return null;

	const games = data?.odds?.americanFootball?.games;

	const handleClick = (gameId: string) => {
		const game = games.find(({ id }: MatchupCardProps) => id === gameId);
	};

	return (
		<div className="App">
			<header className="App-header"></header>
			<Grid container justify="space-evenly">
				{games.map((game: MatchupCardProps) => (
					<MatchupCard {...game} key={`${game.home.id}-${game.away.id}`} />
				))}
			</Grid>
		</div>
	);
}

export default App;
