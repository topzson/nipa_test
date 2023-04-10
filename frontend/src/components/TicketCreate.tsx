import React from "react";

import { Link as RouterLink } from "react-router-dom";


import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { TicketInterface } from "../models/ITicket";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function TicketCreate() {

   

    const [user, setUser] = React.useState<Partial<TicketInterface>>({});

    const [success, setSuccess] = React.useState(false);

    const [error, setError] = React.useState(false);

    const currentDate = new Date().toISOString();
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccess(false);

        setError(false);

    };





    const handleInputChange = (

        event: React.ChangeEvent<{ id?: string; value: any }>

    ) => {

        const id = event.target.id as keyof typeof TicketCreate;

        const { value } = event.target;

        setUser({ ...user, [id]: value });

    };


    function submit() {

        let data = {

            Title: user.Title ?? "",

            Description: user.Description ?? "",

            Contact_information: user.Contact_information ?? "",

            Timestamp: currentDate,

        };


        const apiUrl = "http://localhost:8080/tickets";

        const requestOptions = {

            method: "POST",

            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },

            body: JSON.stringify(data),

        };


        fetch(apiUrl, requestOptions)

            .then((response) => response.json())

            .then((res) => {

                if (res.data) {

                    setSuccess(true);

                } else {

                    setError(true);

                }

            });

    }


    return (

        <Container  maxWidth="md">

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="success">

                    บันทึกข้อมูลสำเร็จ

                </Alert>

            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">

                    บันทึกข้อมูลไม่สำเร็จ

                </Alert>

            </Snackbar>

            <Paper>

                <Box display="flex">

                    <Box flexGrow={1}>

                        <Typography

                            component="h2"

                            variant="h6"

                            color="primary"

                            gutterBottom

                        >

                            Create Ticket

                        </Typography>

                    </Box>

                </Box>

                <Divider />

                <Grid container spacing={3} >

                    <Grid item xs={6}>

                        <p>Title</p>

                        <FormControl fullWidth variant="outlined">

                            <TextField

                                id="Title"

                                variant="outlined"

                                type="string"

                                size="medium"

                                value={user.Title || ""}

                                onChange={handleInputChange}

                            />

                        </FormControl>

                    </Grid>

                    <Grid item xs={6}>

                        <FormControl fullWidth variant="outlined">

                            <p>Description</p>

                            <TextField

                                id="Description"

                                variant="outlined"

                                type="string"

                                size="medium"

                                value={user.Description || ""}

                                onChange={handleInputChange}

                            />

                        </FormControl>

                    </Grid>

                    <Grid item xs={12}>

                        <FormControl fullWidth variant="outlined">

                            <p>Contact information</p>

                            <TextField

                                id="Contact_information"

                                variant="outlined"

                                type="string"

                                size="medium"

                                value={user.Contact_information || ""}

                                onChange={handleInputChange}

                            />

                        </FormControl>

                    </Grid>


                    

                    <Grid item xs={12}>

                        <Button component={RouterLink} to="/" variant="contained">

                            Back

                        </Button>

                        <Button

                            style={{ float: "right" }}

                            onClick={submit}

                            variant="contained"

                            color="primary"

                        >

                            Submit

                        </Button>

                    </Grid>

                </Grid>

            </Paper>

        </Container>

    );

}


export default TicketCreate;