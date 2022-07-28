import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  let [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    textChange: 'Sign Up'
  });

  const { email, password, textChange } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      setIsDisabled(true);
      setFormData({ ...formData, textChange: 'Submitting' });

      const payload = {
        Email: `${email}`,
        Password: `${password}`,
        User_type: "USER"
      }

      setIsDisabled(false);
      try {
        const response = await axios.post('http://localhost:8080/users/signup', payload);
        console.log(response);

        setFormData({ ...formData, email: '', password: '', textChange: 'Sign Up' });
        toast.success(`${response.data.message}`);

        // if (response.data.success) {
        //   setFormData({ ...formData, email: '', password: '', textChange: 'Sign Up' });
        //   toast.success(`${response.data.message}`);
        // } 
        // else {
          // setFormData({ ...formData, textChange: 'Sign Up'});
          // toast.error(`${response.message}`);
        // }
      } catch (error) {
          // Handle Error Here
          console.error(error);
          // setFormData({ ...formData, textChange: 'Sign Up'});
          // toast.error(`${response.data.message}`);
      }

      // const response = await fetch(`localhost:8080/users/signup`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email, password })
      // });
  
      // const data = await response.json();
      // console.log('data ==> ', data);
      // setIsDisabled(false);

      // if (data.success) {
      //   setFormData({ ...formData, email: '', password: '', textChange: 'Sign Up' });
      //   toast.success(`${data.message}`);
      // } else {
      //   setFormData({ ...formData, textChange: 'Sign Up'});
      //   toast.error(`${data.message}`);
      // }
    } else {
      setFormData({ ...formData, textChange: 'Sign Up' });
      toast.error('Please fill all fields.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            { textChange }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}