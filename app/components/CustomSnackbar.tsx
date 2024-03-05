import { Alert, Snackbar } from '@mui/material'
import React from 'react'

type Props = {
    isOpen:boolean,
    message:string,
    handleSnackbarClose: ()=>void
}

const CustomSnackbar = ({isOpen,message,handleSnackbarClose}: Props) => {
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        handleSnackbarClose();
      };
    
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message === "success" ? "success":"error"} sx={{ width: '100%' }}>
          {message === "success" ? 'Data Inserted Successfully' : 'Oops! Something Went Wrong'}
        </Alert>
      </Snackbar>
  )
}

export default CustomSnackbar