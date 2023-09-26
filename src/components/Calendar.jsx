import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from '@fullcalendar/multimonth'
import AddEventModal from "./AddEventModal";
import esLocale from '@fullcalendar/core/locales/es';
import moment from "moment";
import axios from 'axios'
import LoginModal from "./LoginModal";

export default function () {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalLoginOpen, setModalLoginOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        })
    }


    useEffect(() => {
        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    async function handleEventAdd(data) {

        await axios.post('/api/calendar/create-event', data.event)
    }


    async function handleDatesSet(data) {

        const response = await axios.get('/api/calendar/get-events?start=' + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString())
        setEvents(response.data)
    }



    return (
        <section>
            <div className="boton-agregar-evento-container">
                {isLoggedIn && (
                    <button className="boton-agregar-evento" onClick={() => setModalOpen(true)}>Agregar Evento</button>
                )}
                <button className="boton-agregar-evento" onClick={() => setModalLoginOpen(true)}>Iniciar Sesión</button>

            </div>

            <div className="contenedor-calendario" style={{ position: 'relative', zIndex: 0 }}>

                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[multiMonthPlugin]}
                    initialView='multiMonthYear'
                    locale={esLocale}
                    eventAdd={event => handleEventAdd(event)}
                    datesSet={(date) => handleDatesSet(date)}
                />

            </div>
            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
            <LoginModal isOpen={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />
        </section>
    )
}