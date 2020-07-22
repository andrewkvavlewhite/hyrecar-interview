import React, { useState, useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose } = props;
	const [name, setName] = useState('');

	const handleChange = useCallback((event) => {
		setName(event.target.value);
	}, []);
  
	const handleSubmit = useCallback((event) => {
	  alert('A name was submitted: ' + name);
	  event.preventDefault();
	}, [name]);

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<FormControl>
					<InputLabel htmlFor="my-input">Email address</InputLabel>
					<Input id="my-input" aria-describedby="my-helper-text" />
					<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
				</FormControl>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
