import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import axios from 'axios'

import CreateOpenSlotModal from './CreateOpenSlotModal'
import EditOpenSlotModal from './EditOpenSlotModal'
import BookingModal from './BookingModal';
import AppointmentDetailModal from './AppointmentDetailModal';

export default function Calendar() {
    const calendarRef = useRef(null);
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState('')
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openBookingModal, setOpenBookingModal] = useState(false)
    const [openAppointmentModal, setOpenAppointmentModal] = useState(false)
    const [selectedEventData, setSelectedEventData] = useState({})
    

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUserId(userData.id)
        setUserRole(userData.role)

        window.addEventListener('storage', () => {
            const userData = JSON.parse(localStorage.getItem('user'))
            
            setUserId(userData.id)
            setUserRole(userData.role)
        })
    }, []);

    useEffect(() => {
        if (userId !== '')
            fetchEvents();
    }, [userId, selectedEventData])

    const fetchEvents = () => {
        const baseURL = "http://localhost:3001/api/v1"

        axios.get(`${baseURL}/open_slots?user_id=${userId}`).then((response) => {
            const events = response.data.map((e) => {
                let eventData = { 
                    title: e.title,
                    start: e.start,
                    end: e.end,
                    extendedProps: {
                        id: e.id,
                        userId: e.user_id,
                        eventType: e.event_type
                    }
                }

                if (typeof(e.background_color) !== 'undefined')
                {
                    eventData['backgroundColor'] = e.background_color
                }

                if (e.event_type === 'appointment')
                {
                    eventData['review'] = e.review
                    eventData['extendedProps']['status'] = e.status
                    eventData['extendedProps']['clientPhone'] = e.client_phone
                    eventData['extendedProps']['coachPhone'] = e.coach_phone
                    eventData['extendedProps']['leftReview'] = e.left_review
                }

                return eventData
            })

            setEvents(events)
        })
    }

    const handleCreateModalOpen = () => {
        setOpenCreateModal(true)
    }

    const handleCreateModalClose = () => {
        setOpenCreateModal(false)
    }

    const handleEditModalClose = () => {
        setOpenEditModal(false)
    }

    const handleBookingModalClose = () => {
        setOpenBookingModal(false)
    }

    const handleAppointmentModalClose = () => {
        setOpenAppointmentModal(false)
    }


    const onSelect = function (info: any) {
        if (info.start >= Date.now() && userRole === 'coach')
        {
            setSelectedDate(info.start)
            handleCreateModalOpen()
        }
    }

    const createEvent = (data) => {
        const baseURL = "http://localhost:3001/api/v1"

        axios.post(`${baseURL}/open_slots`, data).then((res) => {
            const openSlot = res.data.open_slot;

            const newEventData = [
                ...events,
                {
                    title: openSlot.title,
                    start: openSlot.start,
                    end: openSlot.end,
                    extendedProps: {
                        id: openSlot.id,
                        userId: openSlot.user_id,
                        eventType: openSlot.event_type
                    }
                }
            ];

            setEvents(newEventData)
        })
    }

    const editEvent = (data) => {
        const baseURL = "http://localhost:3001/api/v1"

        const openSlotId = (selectedEventData as any).extendedProps.id;
        axios.put(`${baseURL}/open_slots/${openSlotId}`, data).then((res) => {
            const openSlot = res.data.open_slot;

            const modifiedEvents = events.map((e) => {
                if (e.extendedProps.id === openSlotId)
                {
                    return {
                        title: openSlot.title,
                        start: openSlot.start,
                        end: openSlot.end,
                        extendedProps: {
                            id: openSlot.id,
                            userId: openSlot.user_id,
                            eventType: openSlot.event_type
                        }
                    }
                } else {
                    return e;
                }
            })

            setEvents(modifiedEvents)
        })
    }

    const deleteEvent = (data) => {
        const baseURL = "http://localhost:3001/api/v1"

        const openSlotId = (selectedEventData as any).extendedProps.id;
        axios.delete(`${baseURL}/open_slots/${openSlotId}`, data).then((res) => {
            const modifiedEvents = events.filter((e) => {
                return e.extendedProps.id !== openSlotId
            })

            setEvents(modifiedEvents)

            setOpenEditModal(false)
        })
    }

    const bookOpenSlot = (data) => {
        const baseURL = "http://localhost:3001/api/v1"

        axios.post(`${baseURL}/appointments`, data).then((res) => {
            const apptData = res.data

            const modifiedEvents = events.filter(e => e.extendedProps.id !== data.open_slot_id)
            const newEventData = [
                ...modifiedEvents,
                {
                    title: apptData.title,
                    start: apptData.start,
                    end: apptData.end,
                    backgroundColor: apptData.background_color,
                    extendedProps: {
                        id: apptData.id,
                        eventType: 'appointment',
                        status: apptData.status,
                        bookedByID: apptData.booked_by_id,
                        coachId: apptData.coach_id,
                        coachPhone: apptData.coach_phone,
                        clientPhone: apptData.client_phone,
                        leftReview: apptData.left_review
                    }
                }
            ];

            setEvents(newEventData)

            handleBookingModalClose();
        })
    }

    const markAppointmentComplete = () => {
        const baseURL = "http://localhost:3001/api/v1"

        const appointmentId = (selectedEventData as any).extendedProps.id
        const data = {
            appointment: { status: 'completed' }
        }

        axios.put(`${baseURL}/appointments/${appointmentId}`, data).then((res) => {
            const apptData = res.data

            const modifiedEvents = events.map((e) => {
                if (e.extendedProps.id === appointmentId)
                {
                    const appt = e;
                    appt.backgroundColor = apptData.background_color
                    appt.start = new Date(appt.start)
                    appt.end = new Date(appt.end)
                    appt.extendedProps.status = 'completed'

                    setSelectedEventData(appt)

                    return appt;
                } else {
                    return e;
                }
            })

            setEvents(modifiedEvents)
        });
    }

    const leaveReview = (score, description) => {
        if (userRole !== 'user') return;

        const baseURL = "http://localhost:3001/api/v1"

        const data = {
            review: {
                user_id: userId,
                appointment_id: (selectedEventData as any).extendedProps.id,
                satisfaction_score: score,
                description: description
            }
        }

        axios.post(`${baseURL}/reviews`, data).then((res) => {
            const modifiedEvents = events.map((e) => {
                if (e.extendedProps.id === (selectedEventData as any).extendedProps.id)
                {
                    const appt = e;
                    appt.start = new Date(appt.start)
                    appt.end = new Date(appt.end)
                    appt.extendedProps.leftReview = true

                    setSelectedEventData(appt)

                    return appt;
                } else {
                    return e;
                }
            })

            setEvents(modifiedEvents);
        })
    }

    const onEventClick = (eventData) => {
        setSelectedEventData(eventData.event)

        if (IsCoachForEvent(eventData.event.extendedProps.userId))
        {
            setOpenEditModal(true)
        }

        if (userRole === 'user' && eventData.event.extendedProps.eventType === 'open_slot')
        {
            setOpenBookingModal(true)
        }

        if (eventData.event.extendedProps.eventType === 'appointment')
        {
            setOpenAppointmentModal(true)
        }
    }

    const IsCoachForEvent = (eventUserId) => {
        return eventUserId === userId
    }
    
    return (
        <React.Fragment>
            <CreateOpenSlotModal
                open={openCreateModal}
                handleClose={handleCreateModalClose}
                selectedDate={selectedDate}
                createEvent={createEvent}
            />

            <EditOpenSlotModal
                open={openEditModal}
                handleClose={handleEditModalClose}
                eventData={selectedEventData}
                editEvent={editEvent}
                deleteEvent={deleteEvent}
            />

            <BookingModal
                open={openBookingModal}
                handleClose={handleBookingModalClose}
                bookedById={userId}
                extendedProps={(selectedEventData as any).extendedProps}
                start={(selectedEventData as any).start}
                end={(selectedEventData as any).end}
                title={(selectedEventData as any).title}
                bookOpenSlot={bookOpenSlot}
            />

            <AppointmentDetailModal
                open={openAppointmentModal}
                handleClose={handleAppointmentModalClose}
                userRole={userRole}
                start={(selectedEventData as any).start}
                end={(selectedEventData as any).end}
                title={(selectedEventData as any).title}
                extendedProps={(selectedEventData as any).extendedProps}
                markComplete={markAppointmentComplete}
                leaveReview={leaveReview}
            />

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                select={onSelect}
                height={900}
                aspectRatio={6}
                events={events}
                eventClick={onEventClick}
                displayEventEnd={true}
                displayEventTime={true}
            />
        </React.Fragment>
    );
  }