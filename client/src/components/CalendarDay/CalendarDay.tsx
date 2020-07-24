import React, { useState, useRef, useLayoutEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';
import AppointmentType from '../../types/AppointmentType';
import { Typography } from '@material-ui/core';
import invert from 'invert-color';


const REMINDER_HEIGHT = 25;

const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '100%',
		overflow: 'hidden'
	},
	reminder: {
		display: 'flex',
		alignItems: 'center',
		height: REMINDER_HEIGHT,
		borderRadius: '5px',
		paddingLeft: '5px',
	}
});

interface DateObj {
	date: Date
	appointments: AppointmentType[]
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick } = props;
	const [ focused, setFocused ] = useState(false);
	const [ numViewableReminders, setNumViewableReminders ] = useState(0);
	const ref = useRef(null);

	useLayoutEffect(() => {
	  	const numRemindersToShow = Math.trunc(ref.current.clientHeight / REMINDER_HEIGHT);
	  	setNumViewableReminders(numRemindersToShow);
	}, []);

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;

	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
				{
					dateObj.appointments.length - numViewableReminders > 0 && (
						<Avatar
							className={ avatarClass }
							style={{ color: 'red', backgroundColor: 'transparent' }}
						>
							+{ dateObj.appointments.length - numViewableReminders }
						</Avatar>
					)
				}
			</div>
			<div ref={ref} className={ classes.remindersContainer }>
				{
					dateObj.appointments.slice(0, numViewableReminders).map(appt => (
						<div
							key={appt.id}
							className={ classes.reminder }
							style={{ 
								backgroundColor: appt.color,
								color: invert(appt.color, true)
							}}
						>
							<Typography style={{ fontSize: 14 }}>{ appt.title }</Typography>
						</div> 
					))
				}
			</div>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
