import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { TicketInterface } from "../models/ITicket";
import moment from 'moment';



function Ticket() {
  const currentDate = new Date().toISOString();
  const [users, setUsers] = React.useState<TicketInterface[]>([]);
  const [usersbyid, setUsersid] = React.useState<Partial<TicketInterface>>({});
  const [ticket, setTicket] = React.useState<Partial<TicketInterface>>({});
  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>

) => {

    const id = event.target.id as keyof typeof Ticket;

    const { value } = event.target;

    setUsersid({ ...usersbyid, [id]: value });

};
  function getUsersById(id: string) {
    const apiUrl = `http://localhost:8080/user/${id}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },

    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Data:");
        console.log(res.data);

        if (res.data) {
          handleOpen()
          setUsersid(res.data);
        } else {
          console.log("else");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const getUsers = async () => {

    const apiUrl = "http://localhost:8080/user";

    const requestOptions = {

      method: "GET",

      headers: { "Content-Type": "application/json" },

    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Data:");
        console.log(res.data);

        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const [DeleteValue, setDeleteValue] = React.useState(false);
  function Delete(DeleteTicketID: string) {

    const apiUrl = `http://localhost:8080/users/${DeleteTicketID}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("DeleteUser", res)
      });
    setDeleteValue(!DeleteValue);
  }
  // const [Ticket, setTicket] = React.useState<Partial<TicketInterface>>({});
  async function updateTicket() {
    let data = {
      Title: usersbyid.Title ?? "",
      Description: usersbyid.Description ?? "",
      Contact_information: usersbyid.Contact_information ?? "",
      Timestamp: currentDate,
    };
  
    const apiUrl = `http://localhost:8080/users/${usersbyid.ID}`;
    console.log(data);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      console.log("Update Ticket:", responseData);
      // fetch the updated data after the update operation is successful
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  }
  const [modalopen, setmodalOpen] = React.useState(false);
  const handleOpen = () => setmodalOpen(true);
  const handleClose = () => setmodalOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {

    getUsers();

  }, [DeleteValue]);



  return (

    <div>

      <Container fixed>

        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={modalopen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={3} >

              <Grid item xs={6}>

                <p>Title</p>

                <FormControl fullWidth variant="outlined">

                  <TextField

                    id="Title"

                    variant="outlined"

                    type="string"

                    size="medium"

                    value={usersbyid.Title || ""}

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

                    value={usersbyid.Description || ""}

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

                    value={usersbyid.Contact_information || ""}

                    onChange={handleInputChange}

                  />

                </FormControl>

              </Grid>




              <Grid item xs={12}>

                <Button component={RouterLink} to="/" variant="contained" onClick={handleClose}>

                  Back

                </Button>

                <Button

                  style={{ float: "right" }}

                  onClick={updateTicket}

                  variant="contained"

                  color="primary"

                >

                  Submit

                </Button>

              </Grid>




            </Grid>
          </Box>
        </Modal>

        <Box display="flex">

          <Box flexGrow={1}>

            <Typography

              component="h2"

              variant="h6"

              color="primary"

              gutterBottom

            >

              Tickets

            </Typography>

          </Box>

          <Box>

            <Button

              component={RouterLink}

              to="/create"

              variant="contained"

              color="primary"

            >

              Create Ticket

            </Button>

          </Box>

        </Box>

        <TableContainer component={Paper} >

          <Table aria-label="simple table">

            <TableHead>

              <TableRow>

                <TableCell align="center" width="5%">

                  ID

                </TableCell>

                <TableCell align="center" width="25%">

                  Title

                </TableCell>

                <TableCell align="center" width="25%">

                  Description

                </TableCell>

                <TableCell align="center" width="5%">

                  Contact_information

                </TableCell>

                <TableCell align="center" width="20%">

                  Timestamp

                </TableCell>
                <TableCell align="center" width="20%">

                  Action

                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {users.map((user: TicketInterface) => (

                <TableRow key={user.ID}>

                  <TableCell align="right">{user.ID}</TableCell>

                  <TableCell align="left" size="medium">

                    {user.Title}

                  </TableCell>

                  <TableCell align="left">{user.Description}</TableCell>

                  <TableCell align="left">{user.Contact_information}</TableCell>

                  <TableCell align="center">{moment(user.Timestamp).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="center">
                    <EditNoteIcon
                      onClick={() => getUsersById(user.ID)}

                    />&nbsp;<DeleteIcon
                      onClick={() => Delete(user.ID)} />
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Container>

    </div>

  );

}



export default Ticket;