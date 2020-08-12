import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import useMedia from '../../utils/hooks/useMedia';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UsersAPI, auth } from '../../api';
import { useMutation } from '@apollo/client';
import { signup as signupGQL } from '../../api/Users';

const styles = (theme: Theme) => createStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '90%'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		width: '100%'
	},
});

interface Props extends WithStyles<typeof styles>{
    goBack: () => void
    login: (user: any) => void
}

const Signup = ( props: Props ) => {
	const { classes, goBack, login } = props;
    const { isMobile } = useMedia();
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [doSignup, { loading, error }] = useMutation(
        signupGQL,
      {
        onCompleted({ signup: user }) {
            auth(user.token);
            goBack();
            login(user);
        },
        onError(err) {
            alert(err.message)
        }
      }
    );

    const validate = () => {
        try {
            if (!name) {
                throw new Error(`Name is required.`);
            }
            if (!username) {
                throw new Error(`Username is required.`);
            }
            if (username.includes(' ')) {
                throw new Error(`Spaces are not allowed in username.`);
            }
            if (!password) {
                throw new Error(`Please enter a password.`);
            }
            if (!confirmPassword) {
                throw new Error(`Please confirm password.`);
            }
            if (password !== confirmPassword) {
                throw new Error(`Passwords do not match.`);
            }
        } catch(e) {
            alert(e.message);
        }
    }

	return (
		<>
            <header className={ classes.header }>
                <Typography variant={isMobile ? 'h4' : 'h3'}>
                    SIGN UP
                </Typography>
            </header>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FormControl>
                    <FormGroup style={{ margin: 20 }}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            type="password"
                        />
                        <TextField
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            validate();
                            doSignup({ variables: { username, password, name }});
                        }}
                    >
                        Sign up
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => goBack()}
                        style={{ marginTop: 10 }}
                    >
                        Back
                    </Button>
                </FormControl>
            </div>
		</>
	);
}

export default withStyles( styles )( Signup );
