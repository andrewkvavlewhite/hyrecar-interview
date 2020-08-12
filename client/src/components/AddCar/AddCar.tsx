import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography, Container, DialogActions, Button, TextField } from '@material-ui/core';
import CarType from '../../types/CarType';

const styles = (theme: Theme) => createStyles({
	addCarFormContainer: {
		minHeight: '350px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	datetimeContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& > *': {
			marginRight: '20px',
		}
	},
	datetimeInputs: {
	},
	colorContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& > *': {
			marginRight: '20px',
		}
	},
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onSave: (car: CarType) => void,
	defaults?: any
}

const STATE_DEFAULTS = {
	make: undefined,
	model: undefined,
	year: undefined,
	vin: undefined,
};

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose, onSave, defaults = {}} = props;
	const [make, setMake] = useState(defaults.make || STATE_DEFAULTS.make);
	const [model, setModel] = useState(defaults.model || STATE_DEFAULTS.model);
	const [year, setYear] = useState(defaults.year || STATE_DEFAULTS.year);
	const [vin, setVIN] = useState(defaults.vin || STATE_DEFAULTS.vin);

	const isEdit = !!defaults?.id;

	const validate = () => {
		if (!make) {
			throw new Error(`Make is required.`)
		}
		if (!model) {
			throw new Error(`Model is required.`)
		}
		if (!year) {
			throw new Error(`Year is required.`)
		}
		if (!vin) {
			throw new Error(`VIN is required.`)
		}
	}

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='sm'
		>
			<DialogTitle id='form-dialog-title'>
				{ isEdit ? 'Update Car' : 'Add Car' }
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addCarFormContainer }>
				<Container style={{ minHeight: '100%' }}>
					<FormControl>
						<FormGroup>
							<TextField
								label="Make"
								value={make}
								onChange={e => setMake(e.target.value)}
							/>
							<TextField
								label="Model"
								value={model}
								onChange={e => setModel(e.target.value)}
							/>
							<TextField
								label="Year"
								value={year}
								onChange={e => setYear(e.target.value)}
							/>
							<TextField
								label="VIN"
								value={vin}
								onChange={e => setVIN(e.target.value)}
							/>
						</FormGroup>
					</FormControl>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button 
					onClick={() => {
						try {
							validate()
							onSave({
								make,
								model,
								year,
								vin
							});
							setMake(STATE_DEFAULTS.make);
							setModel(STATE_DEFAULTS.model);
							setYear(STATE_DEFAULTS.year);
							setVIN(STATE_DEFAULTS.vin);
							onClose();
						} catch(e) {
							alert(e.message);
						}
					}}
					color="primary"
				>
					{ isEdit ? 'UPDATE' : 'CREATE'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
