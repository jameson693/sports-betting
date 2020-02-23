import React from "react";
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Paper,
	Select,
	Stepper,
	Step,
	StepLabel,
	TextField,
	Typography
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_ODDS } from "../queries";
import { Props as GameData } from "./MatchupCard";

enum OverUnder {
	OVER,
	UNDER
}

interface OverUnderInfo {
	checked: boolean;
	overOrUnder: OverUnder | undefined;
	amount: number;
}

const steps = ["Choose your bets", "Confirm bets", "Bets placed"];

const PlaceBet = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [spreadChecked, setSpreadChecked] = React.useState<boolean>(false);
	const [spreadBet, setSpreadBet] = React.useState<string | undefined>(
		undefined
	);
	const [overUnderInfo, setOverUnderInfo] = React.useState<OverUnderInfo>({
		checked: false,
		overOrUnder: undefined,
		amount: 0
	});
	const { gameId } = useParams();
	const { loading, error, data } = useQuery(GET_ODDS);

	if (loading || error) return null;

	const games = data?.odds?.americanFootball?.games;

	const { favorite, spread, overUnder, ...rest } = games.find(
		({ id }: GameData) => id === gameId
	);

	const updateOverUnderInfo = (field: string, value: any) => {
		setOverUnderInfo(prevState => ({ ...prevState, [field]: value }));
	};

	return (
		<>
			<Stepper activeStep={activeStep}>
				{steps.map((label: string) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Paper>
				<Typography gutterBottom variant="h4">
					Which bets would you like to place?
				</Typography>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								checked={spreadChecked}
								onChange={() => setSpreadChecked(!spreadChecked)}
							></Checkbox>
						}
						label={`${rest[favorite].location} -${spread}`}
					/>
					{spreadChecked ? (
						<TextField
							value={spreadBet}
							placeholder="Amount"
							type="tel"
							onChange={({ target: { value } }) => setSpreadBet(value)}
						/>
					) : null}
				</FormGroup>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								checked={overUnderInfo.checked}
								onChange={() => setOverUnderChecked(!overUnderInfo.checked)}
							></Checkbox>
						}
						label={`${overUnder} Points`}
					/>
					{overUnderInfo.checked ? (
						<>
							<Select></Select>
							<TextField
								value={spreadBet}
								placeholder="Amount"
								type="tel"
								onChange={({ target: { value } }) => setSpreadBet(value)}
							/>
						</>
					) : null}
				</FormGroup>
			</Paper>
		</>
	);
};

export default PlaceBet;
