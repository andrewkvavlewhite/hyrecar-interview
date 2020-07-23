import React, { useState, useEffect } from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CalendarDayContainer from '../CalendarDay/CalendarDayContainer';
import AppointmentType from '../../types/AppointmentType';
import { format } from 'date-fns';

const styles = (theme: Theme) => createStyles({
	monthContainer: {
		display: 'flex',
		width: '100%',
		flexGrow: 1,
		flexDirection: 'column',
		flexWrap: 'nowrap',
		border: '1px solid lightgray'
	},
	weekContainer: {
		display: 'flex',
		width: '100%',
		height: '16.6%',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'nowrap',
	}
});

interface Props extends WithStyles<typeof styles>{
	calendarCells: {
		date: Date
	}[],
	date: Date,
}

const MonthContainer = ( props: Props ) => {
	const { classes, calendarCells } = props;

	const calendarCellGrid = calendarCells.reduce((acc, cur, idx) => {
		const arr = [...acc];
		const rowIdx = Math.trunc( idx / 7 );
		if (acc.length <= rowIdx) arr.push([]);
		arr[rowIdx].push(cur);
		return arr;
	}, []);

	return (
		<div className={ classes.monthContainer }>
			{
				calendarCellGrid.map((weekRow, i) => (
					<div key={ i } className={ classes.weekContainer }>
						{
							weekRow.map( ( dateObj, i ) =>
								<CalendarDayContainer
									key={ i }
									calendarDate={ props.date }
									dateObj={ dateObj }
								/>
							)
						}
					</div>
				))
			}
		</div>
	);
}
export default withStyles( styles )( MonthContainer );
