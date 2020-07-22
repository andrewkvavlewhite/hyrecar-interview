import React, { useState } from 'react';
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
import './App.css';
import useMedia from '../../utils/hooks/useMedia';

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
	onFabAddClick: () => void
}

const App = ( props: Props ) => {
	const { classes, onFabAddClick } = props;
	const [date, setDate] = useState(new Date());
	const { isMobile } = useMedia();

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
			<AddReminderContainer />
		</div>
	);
}

export default withStyles( styles )( App );
