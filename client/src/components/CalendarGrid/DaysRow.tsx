import React from 'react'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DayName from './DayName'
import { daysArr, daysArrAbbr, daysArrInitial } from '../../utils/dateUtils'
import useMedia from '../../utils/hooks/useMedia';

const styles = (theme: Theme) => createStyles({
	daysRow: {
		display: 'flex',
		width: '100%',
		flexBasis: '50px',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	dayNameCell: {
		flex: 1,
		justifyContent: 'center', alignItems: 'center'
	}
})

interface Props extends WithStyles<typeof styles>{}

const DaysRow = ( props: Props ) => {

	const { isTablet, isMobile } = useMedia();

	let weekDaysArr = daysArr;
	let weekDayFontSize = 18;
	if (isMobile) {
		weekDaysArr = daysArrInitial;
		weekDayFontSize = 15;
	} else if (isTablet) {
		weekDaysArr = daysArrAbbr;
	}

	return (
		<div className={ props.classes.daysRow }>
			{ weekDaysArr.map( ( day, i ) =>
				<div key={i} className={ props.classes.dayNameCell }>
					<DayName fontSize={weekDayFontSize} key={ i } day={ day } />
				</div>
			) }
		</div>
	);
}

export default withStyles(styles)(DaysRow)