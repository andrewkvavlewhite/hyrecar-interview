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
import { useQuery, useMutation } from '@apollo/client';
import { getMyCars as getMyCarsGQL, createCarGQL } from '../../api/Cars';
import CarListItem from '../CarListItem/CarListItem';
import AddCarContainer from '../AddCar/AddCarContainer';

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

const CarList = ( props: Props ) => {
	const { classes, user, onFabAddClick, logout } = props;
    const { isMobile } = useMedia();
    const [cars, setCars] = useState([]);
    
    const { called, loading } = useQuery(
        getMyCarsGQL,
        {
			onCompleted({ getMyCars }) {
				setCars(getMyCars);
          	},
			onError(error) {
				alert(error.message);
			}
        }
    );

    const [createCar] = useMutation(
        createCarGQL,
        {
            onCompleted({ createCar }) {
                const _cars = [...cars, createCar];
                setCars(_cars);
            },
            onError(err) {
                alert(err.message)
            }
        }
    );
    
    const onDeleteComplete = id => {
        const _cars = [...cars];
        const idx = _cars.findIndex(car => car.id === id);
        _cars.splice(idx, 1);
        setCars(_cars);
    }
    
    const onUpdateComplete = newCar => {
        const _cars = [...cars];
        const idx = _cars.findIndex(car => car.id === newCar.id);
        _cars.splice(idx, 1, newCar);
        setCars(_cars);
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

                {
                    !loading && cars.map(car => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CarListItem
                                key={car.id}
                                {...car}
                                onDeleteComplete={() => onDeleteComplete(car.id)}
                                onUpdateComplete={onUpdateComplete}
                            />
                        </div>
                    ))
                }

				<Fab
					aria-label='Add'
					className={classes.fabAdd}
					onClick={ onFabAddClick }
				>
					<AddIcon />
				</Fab>
			</Paper>
			<AddCarContainer onSave={async newCar => {
                createCar({ variables: newCar });
			}} />
		</div>
	);
}

export default withStyles( styles )( CarList );
