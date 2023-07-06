import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  subheading: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.heading}>
        Oopssss...
      </Typography>
      <Typography variant="h4" className={classes.subheading}>
        Page not found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          // Handle navigation to another page or go back to the previous page
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
