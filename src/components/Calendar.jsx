import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from '@fullcalendar/multimonth'
import AddEventModal from "./AddEventModal";
import esLocale from '@fullcalendar/core/locales/es';
import moment from "moment";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const start = moment().startOf('year');
            const end = start.clone().add(2, 'year');

            try {
                const response = await axios.get('https://calendar-renta-sale-api.vercel.app/api/calendar/get-events', {
                    params: {
                        start: start.toISOString(),
                        end: end.toISOString()
                    }
                });

                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchData();

        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    }

    async function handleEventAdd(data) {
        await axios.post('https://calendar-renta-sale-api.vercel.app/api/calendar/create-event', data.event);
    }

    return (
        <section>
            <div className="boton-agregar-evento-container">
                {isLoggedIn && (
                    <button className="boton-agregar-evento" onClick={() => setModalOpen(true)}>Agregar Evento</button>
                )}
            </div>

            <div className="contenedor-calendario" style={{ position: 'relative', zIndex: 0 }}>
                {loading ? (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        marginTop: '10%'
                    }}>
                        <CircularProgress color="success" />
                    </div>
                ) : (
                    <FullCalendar
                        ref={calendarRef}
                        events={events}
                        plugins={[multiMonthPlugin]}
                        initialView='multiMonthYear'
                        locale={esLocale}
                        eventAdd={event => handleEventAdd(event)}
                    />
                )}
            </div>
            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}
