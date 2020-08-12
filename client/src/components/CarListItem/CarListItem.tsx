import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { deleteCarGQL, updateCarGQL } from '../../api/Cars';
import AddCar from '../AddCar/AddCar';
import CarType from '../../types/CarType';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
        <>
            <TableRow key={id}>
                <TableCell>{make}</TableCell>
                <TableCell>{model}</TableCell>
                <TableCell>{year}</TableCell>
                <TableCell>{vin}</TableCell>
                <TableCell align="right">
                    <Button onClick={() => {
                        setOpenEdit(true);
                    }}>Edit</Button>
                    <Button onClick={() => {
                        deleteCar({ variables: { id }})
                    }}>x</Button>
                </TableCell>
            </TableRow>
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
        </>
	);
}

export default withStyles( styles )( CarListItem );
