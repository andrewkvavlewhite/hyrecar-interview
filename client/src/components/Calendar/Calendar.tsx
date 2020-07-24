import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as dateFns from 'date-fns';
import CalendarGrid from '../CalendarGrid';
import AgendaDayContainer from '../AgendaDay/AgendaDayContainer';
import AddReminderContainer from '../AddReminder/AddReminderContainer';
import useMedia from '../../utils/hooks/useMedia';
import { getNewDate, formatDatekey } from '../../utils/dateUtils';
import { compareAsc } from 'date-fns';
import { AppointmentsAPI } from '../../api';
import { Button } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	calendar: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		// padding: '10px',
		// margin: '25px',
		width: '100%',
		height: '90%'
	},
	calendarHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '100px',
		width: '100%'
	},
	fabAdd: {
		position: 'absolute',
		bottom: '60px',
		right: '50px',
		color: '#FFF',
		backgroundColor: green[600],
		'&:hover': {
			backgroundColor: green[800]
		}
	}
});

interface Props extends WithStyles<typeof styles>{
    user: any
    logout: () => void
	onFabAddClick: () => void
}

const Calendar = ( props: Props ) => {
	const { classes, user, onFabAddClick, logout } = props;
	const [date, setDate] = useState(getNewDate());
	const [ appointmentMap, setAppointmentMap ] = useState({});
	const { isMobile } = useMedia();

	const addAppointments = async appointments => {
		const newMap = { ...appointmentMap };

		for (let appt of appointments) {
			appt.startDate = new Date(appt.startDate); // have to convert because sqlite returns as a string
			appt.endDate = new Date(appt.endDate); // have to convert because sqlite returns as a string
		
			const formattedDateKey = formatDatekey(appt.startDate);
	
			if (!(formattedDateKey in newMap)) {
				newMap[formattedDateKey] = [];
			}
	
			newMap[formattedDateKey].push(appt);
			newMap[formattedDateKey] = newMap[formattedDateKey].sort(compareAsc);
		}
		setAppointmentMap(newMap);
    };

	// Get all appointments and place them into a map
	useEffect(() => {
		AppointmentsAPI.all().then(addAppointments);
	}, []);

	const month = date.toLocaleString( 'en-us', { month: isMobile ? 'short' : 'long' } );
	const year = dateFns.getYear( date );

	// arrow functions to skip binding in constructor
	const prevMonth = () => {
		setDate(dateFns.subMonths( date, 1 ));
	}

	const nextMonth = () => {
		setDate(dateFns.addMonths( date, 1 ));
	}

	return (
		<div className={ classes.root }>
			<Paper 
				className={ classes.calendar }
				style={{ margin: isMobile ? '0px' : '25px', padding: isMobile ? '0px' : '10px' }}
			>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography>Hello, {user.name}!</Typography>
                    <Button onClick={logout}>Logout</Button>
                </div>
				<header className={ classes.calendarHeader }>
					<IconButton aria-label='Last Month' onClick={ prevMonth }>
						<KeyboardArrowLeftIcon fontSize='large' />
					</IconButton>
					<Typography variant={isMobile ? 'h4' : 'h3'}>
						{ month } { year }
					</Typography>
					<IconButton aria-label='Next Month' onClick={ nextMonth }>
						<KeyboardArrowRightIcon fontSize='large' />
					</IconButton>
				</header>
				<CalendarGrid
					date={ date }
					appointments={appointmentMap}
				/>
				<Fab
					aria-label='Add'
					className={classes.fabAdd}
					onClick={ onFabAddClick }
				>
					<AddIcon />
				</Fab>
			</Paper>
			<AgendaDayContainer />
			<AddReminderContainer onSave={async newAppointment => {
				try {
					const insertedAppointment = await AppointmentsAPI.create(newAppointment);
					addAppointments([insertedAppointment]);
				} catch(e) {
					alert(e.message);
				}
			}} />
		</div>
	);
}

export default withStyles( styles )( Calendar );
