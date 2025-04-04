import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CreateOpenSlotModal({ open, handleClose, selectedDate, createEvent }) {
    const [startTime, setStartTime] = useState(new Date());

    const [openCreateModal, setOpenCreateModal] = useState(false);


    const onStartTimeSet = (startDate: any) => {
        if (startDate !== null)
        {
            setStartTime(startDate.toDate())
        }
    }

    const createOpenSlot = () => {
        const baseURL = "http://localhost:3001/api/v1"

        let startDate = selectedDate;
        startDate.setHours(startTime.getHours())
        startDate.setMinutes(startTime.getMinutes())
        
        const endTime = addHours(selectedDate, 2);

        let userData = localStorage.getItem('user')
        if (userData === null) return;

        const userID = JSON.parse(userData).id

        const data = {
            open_slot: {
                start: startDate,
                end: endTime,
                user_id: userID
            }
        }

        createEvent(data)

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
                    Add Availability
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Add availability for booking. Ends in 2 hours from start time.
                    </DialogContentText>


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticTimePicker
                            ampm={true}
                            onChange={onStartTimeSet}
                            defaultValue={dayjs(new Date())}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createOpenSlot} autoFocus>
                    Set Availability
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
  }