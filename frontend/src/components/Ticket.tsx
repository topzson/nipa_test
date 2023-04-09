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

import { TicketInterface } from "../models/ITicket";
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import moment from 'moment';


 
function Users() {

 const [users, setUsers] = React.useState<TicketInterface[]>([]);

 

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

 

 useEffect(() => {

   getUsers();

 }, []);

 

 return (

   <div>

     <Container fixed>

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

         <Table  aria-label="simple table">

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

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default Users;