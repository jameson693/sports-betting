import { gql } from "apollo-boost";

export const GET_ODDS = gql`
	query GetOdds {
		odds {
			americanFootball {
				games {
					id
					home {
						location
						name
						id
					}
					away {
						location
						name
						id
					}
					favorite
					spread
					overUnder
				}
			}
		}
	}
`;
