import { UserInterface } from "./IUser";

export interface TicketInterface {

    ID: string,
   
    Title: string,
   
    Description: string,
   
    Contact_information: string,

    Timestamp: string,

    UserID : number,
    User: UserInterface
   
   }