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
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { deleteCarGQL, updateCarGQL } from '../../api/Cars';
import AddCar from '../AddCar/AddCar';
import CarType from '../../types/CarType';

const styles = (theme: Theme) => createStyles({
});

interface Props extends WithStyles<typeof styles>{
    id: number
    make: string
    model: string
    year: string
    vin: string
    onDeleteComplete: () => void
    onUpdateComplete: (newCar: CarType) => any
}

const CarListItem = ( props: Props ) => {
    const { id, make, model, year, vin, onDeleteComplete, onUpdateComplete } = props;
    const [openEdit, setOpenEdit] = useState(false);
    
    const [deleteCar] = useMutation(
        deleteCarGQL,
        {
			onCompleted() {
				onDeleteComplete()
          	},
			onError(error) {
				alert(error.message);
			}
        });

    
    const [updateCar] = useMutation(
        updateCarGQL,
        {
            onCompleted({ updateCar }) {
                onUpdateComplete(updateCar);
            },
            onError(error) {
                alert(error.message);
            }
        });

	return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>{ make }</Typography>
            <Typography>{ model }</Typography>
            <Typography>{ year }</Typography>
            <Typography>{ vin }</Typography>
            <div>
                <Button onClick={() => {
                    setOpenEdit(true);
                }}>Edit</Button>
                <Button onClick={() => {
                    deleteCar({ variables: { id }})
                }}>x</Button>
            </div>
            <AddCar
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onSave={newFields => updateCar({ variables: { id, ...newFields }})} 
                defaults={{
                    id,
                    make,
                    model,
                    year,
                    vin
                }}
            />
        </div>
	);
}

export default withStyles( styles )( CarListItem );
