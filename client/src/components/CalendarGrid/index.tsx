import React from 'react'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles'
import DaysRow from './DaysRow'
import MonthContainer from './MonthContainer'
import { getMonthCells, formatDatekey } from '../../utils/dateUtils'

const styles = (theme: Theme) => createStyles({
	calendarGrid: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	}
});

interface Props extends WithStyles<typeof styles>{
	date: Date,
	appointments: Object
}

const CalendarGrid = (props: Props) => {
	const { classes, date, appointments } = props;
	const calendarCells = getMonthCells( date );

	for (let cell of calendarCells) {
		const formattedDateKey = formatDatekey(cell.date);
		cell.appointments = appointments[formattedDateKey] || [];
	}

	return (
		<div className={ classes.calendarGrid }>
			<DaysRow />
			<MonthContainer
				date={ date }
				calendarCells={ calendarCells }
			/>
		</div>
	)
}

export default withStyles( styles )( CalendarGrid );