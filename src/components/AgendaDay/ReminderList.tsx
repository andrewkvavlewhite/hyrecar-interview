import React from 'react';
import Typography from '@material-ui/core/Typography'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import { format } from 'date-fns';
import AppointmentType from '../../types/AppointmentType';
import invert from 'invert-color';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		overflow: 'scroll'
    },
    reminder: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	}
});

interface Props extends WithStyles<typeof styles>{
	appointments: AppointmentType[],
}

const ReminderList = (props: Props) => {
    const { classes, appointments } = props;

    if (!appointments.length) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ fontStyle: 'italic' }}>
                    No appointments to show
                </Typography>
            </div>
        )
    }
    
    return (
        <div className={ classes.remindersContainer }>
            {
                appointments.map(appt => {
                    return (
                        <div className={ classes.reminder } style={{ backgroundColor: appt.color }}>
                            <Typography style={{ color: invert(appt.color, true) }}>
                                { appt.title }
                            </Typography>
                            <Typography style={{ color: invert(appt.color, true) }}>
                                { format(new Date(appt.startDate), 'h:m a') }
                            </Typography>
                        </div>
                    );
                })
            }
        </div>
    )
};

export default withStyles( styles )( ReminderList );