import React, { useState, useCallback, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';
import { Typography, Container, DialogActions, Button, TextField } from '@material-ui/core';
import { isAfter, addMinutes } from 'date-fns';
import { nextHalfHourMark, getNewDate } from '../../utils/dateUtils';
import AppointmentType from '../../types/AppointmentType';
import ColorPicker from 'material-ui-color-picker'

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
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
		// justifyContent: 'space-between',
		'& > *': {
			marginRight: '20px',
		}
	},
	datetimeInputs: {
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onSave: (appointment: AppointmentType) => void
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose, onSave } = props;
	const [title, setTitle] = useState('');
	const [color, setColor] = useState('');
	const [startDate, setStartDate] = useState(getNewDate());
	const [endDate, setEndDate] = useState(addMinutes(nextHalfHourMark(getNewDate()), 30));

	// make sure start date is never later than end date, and vice versa
	useEffect(() => { isAfter(startDate, endDate) && setEndDate(startDate) }, [startDate]);
	useEffect(() => { isAfter(startDate, endDate) && setStartDate(endDate) }, [endDate]);

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='sm'
		>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<Container style={{ minHeight: '100%' }}>
					<FormControl>
						<FormGroup>
							<TextField
								label="Title"
								inputProps={{ maxLength: 30 }}
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
							<div className={ classes.datetimeContainer }>
								<Typography>When:</Typography>
								<div>
									<DateTimePicker
										value={startDate}
										onChange={setStartDate}
										className={ classes.datetimeInputs }
									/>
									<DateTimePicker
										value={endDate}
										onChange={setEndDate}
										className={ classes.datetimeInputs }
									/>
								</div>
							</div>
							<ColorPicker
								name='color'
								defaultValue="color"
								value={color}
								onChange={c => {
									console.log(c)
									setColor(c);
								}}
							/>
						</FormGroup>
					</FormControl>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button 
					onClick={() => {
						onSave({
							title,
							startDate,
							endDate,
							color
						});
						setTitle('');
						setColor('');
						setStartDate(getNewDate());
						setEndDate(addMinutes(nextHalfHourMark(getNewDate()), 30));
						onClose();
					}}
					color="primary"
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
