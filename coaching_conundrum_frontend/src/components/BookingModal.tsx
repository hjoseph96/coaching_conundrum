import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { dE } from '@fullcalendar/core/internal-common';
import { EditNotificationsRounded } from '@mui/icons-material';


export default function BookingModal({ open, handleClose, bookedById, extendedProps, start, end, title, bookOpenSlot }) {

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = `${date.toDateString()} ${hours}:${minutes}${ampm}`;
        
        return strTime;
    }

    const appointmentData = () => {
        return {
            open_slot_id: extendedProps.id,
            appointment: {
                start: start,
                end: end,
                booked_by_id: bookedById,
                coach_id: extendedProps.userId
            }
        }
    }
      
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create Appointment at {title}
                </DialogTitle>
                
                <DialogContent>
                    <h3>{start ? formatAMPM(start) : ''} - {end ? formatAMPM(end) : ''}</h3>
                    <DialogContentText id="alert-dialog-description">
                        Book this time slot.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                

                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => bookOpenSlot(appointmentData())} autoFocus>
                    Book
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
  }