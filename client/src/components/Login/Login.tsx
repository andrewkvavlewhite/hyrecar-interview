import React, { useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import useMedia from '../../utils/hooks/useMedia';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignupContainer from '../Signup/SignupContainer';
import { UsersAPI, auth } from '../../api';
import { login as loginGQL } from '../../api/Users';
import { useLazyQuery } from '@apollo/client';

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
    login: (user: any) => void
}

const Login = ( props: Props ) => {
	const { classes, login } = props;
    const { isMobile } = useMedia();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isSignup, setSignup ] = useState(false);

    const [doLogin, { called, loading }] = useLazyQuery(
        loginGQL,
        {
          onCompleted({ login: user }) {
            auth(user.token);
            login(user);
          },
          onError(error) {
            alert(error.message);
          }
        }
    );
    
//     useEffect(() => {
//         console.log('loginResponse', loginResponse)
// ;        if (loginResponse?.data?.login) {
//             const user = loginResponse.data.data.login;
//             auth(user.token);
//             login(user);
//         }
//         if (loginResponse?.errors) {
//             alert(loginResponse.errors[0].message);
//         }
//     }, [loginResponse?.data]);

    const validate = () => {
        try {
            if (!username) {
                throw new Error(`Username is required.`);
            }
            if (username.includes(' ')) {
                throw new Error(`Spaces are not allowed in username.`);
            }
            if (!password) {
                throw new Error(`Please enter a password.`)
            }
        } catch(e) {
            alert(e.message);
        }
    }

	return (
		<div className={ classes.root }>
			<Paper 
				className={ classes.container }
				style={{ margin: isMobile ? '0px' : '25px', padding: isMobile ? '0px' : '10px' }}
			>
                {
                    isSignup ? (
                        <SignupContainer goBack={() => { setSignup(false) }} />
                    ) : (
                        <>
                            <header className={ classes.header }>
                                <Typography variant={isMobile ? 'h4' : 'h3'}>
                                    LOGIN
                                </Typography>
                            </header>
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FormControl>
                                    <FormGroup style={{ margin: 20 }}>
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
                                        />
                                    </FormGroup>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={async () => {
                                            validate();
                                            doLogin({ variables: { username, password }});
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Typography style={{ margin: 10, textAlign: 'center' }}>or</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setSignup(true)}
                                    >
                                        Sign up
                                    </Button>
                                </FormControl>
                            </div>
                        </>
                    )
                }
			</Paper>
		</div>
	);
}

export default withStyles( styles )( Login );
