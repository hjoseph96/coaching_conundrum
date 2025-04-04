import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function EditOpenSlotModal({ open, handleClose, eventData, editEvent, deleteEvent }) {
    const [startTime, setStartTime] = useState(new Date());

    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        setStartTime(eventData.start)
    }, [eventData]);


    const onStartTimeSet = (startDate: any) => {
        if (startDate !== null)
        {
            setStartTime(startDate.toDate())
        }
    }

    const editOpenSlot = () => {
        const endTime = addHours(startTime, 2);

        let userData = localStorage.getItem('user')
        if (userData === null) return;

        const userID = JSON.parse(userData).id

        const data = {
            open_slot: {
                start: startTime,
                end: endTime,
                user_id: userID
            }
        }

        editEvent(data)

        handleClose()
    }

    const addHours = (date: Date, hours: number): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    };
    
    
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Availability
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Edit availability for booking. Ends in 2 hours from start time.
                    </DialogContentText>


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticTimePicker
                            ampm={true}
                            onChange={onStartTimeSet}
                            defaultValue={dayjs(startTime)}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                

                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteEvent}>Delete</Button>
                <Button onClick={editOpenSlot} autoFocus>
                    Update Availability
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
  }