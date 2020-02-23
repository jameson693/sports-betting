import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

interface Team {
	location: string;
	name: string;
	id: string;
}

export interface Props {
	id: string;
	home: Team;
	away: Team;
	favorite: string;
	spread: number;
	overUnder: number;
	className?: string;
}

interface OddsItemProps {
	isSpread: boolean;
	value: number;
}

const useStyles = makeStyles({
	line: {
		display: "flex",
		justifyContent: "space-between"
	},
	card: {
		maxWidth: "300px",
		minWidth: "200px"
	}
});

const OddsItem = ({ isSpread, value }: OddsItemProps) => (
	<Typography align="right" display="inline">
		{isSpread ? `-${value}` : value}
	</Typography>
);

const MatchupCard = ({
	home,
	away,
	favorite,
	spread,
	overUnder,
	id,
	className
}: Props) => {
	const classes = useStyles();
	const history = useHistory();
	const homeIsFavorite = favorite === "home";

	return (
		<Card className={classes.card} onClick={() => history.push(`/bet/${id}`)}>
			<CardContent>
				<Grid item className={classes.line}>
					<Typography align="left" display="inline">
						{away.location}
					</Typography>
					<OddsItem
						isSpread={!homeIsFavorite}
						value={!homeIsFavorite ? spread : overUnder}
					/>
				</Grid>
				<Grid item className={classes.line}>
					<Typography align="left" display="inline">
						{home.location}
					</Typography>
					<OddsItem
						isSpread={homeIsFavorite}
						value={homeIsFavorite ? spread : overUnder}
					/>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default MatchupCard;
