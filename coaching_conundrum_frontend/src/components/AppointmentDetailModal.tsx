import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';



export default function AppointmentDetailModal({ open, handleClose, userRole, extendedProps, start, end, title, markComplete, leaveReview}) {
    const [reviewContent, setReviewContent] = useState('')
    const [score, setScore] = useState(0)

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

    const coachPhoneNumber = () => extendedProps?.coachPhone
    const clientPhoneNumber = () => extendedProps?.clientPhone

    const reviewHTML = () => {
        return (
            <>
                <h2>Leave a Review</h2>

                <Box>
                    <TextareaAutosize
                        aria-label="Rate your experience with your coach"
                        minRows={3}
                        placeholder="Rate your experience with your coach"
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </Box>

                <Box>
                    <Rating
                        name="simple-uncontrolled"
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                        defaultValue={2}
                    >
                    </Rating>
                </Box>

                <Button
                    onClick={() => leaveReview(score, reviewContent)}
                >
                    Submit
                </Button>
            </>
        )
    }

    const alreadyReviewed = () => {
        return <> <h3>Already left a  Review</h3> </>
    }

    const reviewMarkup = () => {
        if (extendedProps?.leftReview)
        {
            if (userRole == "user")
            {
                return <>{alreadyReviewed()}</>
            } else if (userRole == "coach")
            {
                return <>{viewReview()}</>
            }
        } else {
            return <>{reviewHTML()}</>
        }
    }

    const viewReview = () =>
    {
        return (
            <>
                <h3>Review</h3>
                <p>{extendedProps.review.description}</p>
                <Rating
                    defaultValue={extendedProps.review.satisfaction_score}
                    readOnly
                />
            </>
        )
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
                    {title}
                </DialogTitle>
                
                <DialogContent>
                    <h2>{start ? formatAMPM(start) : ''} - {end ? formatAMPM(end) : ''}</h2>

                    <h3>Phone Numbers</h3>
                    { 
                        userRole === 'coach' ?
                        <DialogContentText id="alert-dialog-description">
                            Client's Phone Number: {clientPhoneNumber()}
                        </DialogContentText> : ''
                    }

                    {
                        userRole === 'user' ?
                        <DialogContentText id="alert-dialog-description">
                            Coach's Phone Number: {coachPhoneNumber()}
                        </DialogContentText> : ''
                    }

                    {
                        extendedProps?.status == 'completed' ? reviewMarkup() : ''
                    }
                </DialogContent>
                

                <DialogActions>
                    {
                        userRole === 'user' ?
                        <Button onClick={markComplete}>
                            Mark Complete
                        </Button> : ''
                    }
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
  }