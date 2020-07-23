import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
});

interface Props extends WithStyles<typeof styles> {
	fontSize: number
	day: string
}

const DayName = ( props: Props ) => {
	const { fontSize = 18 } = props;
	return (
		<Typography style={{ textAlign: 'center', fontSize }} variant={'h6'}>{ props.day }</Typography>
	);
};

export default withStyles( styles )( DayName );