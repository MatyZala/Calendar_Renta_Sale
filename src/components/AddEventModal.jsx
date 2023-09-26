import React, { useState } from "react";
import Modal from 'react-modal'
import DateTime from 'react-datetime'

export default function ({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState('')
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())


    const onSubmit = (event) => {
        event.preventDefault()

        onEventAdded({
            title,
            start,
            end
        })
        setTitle('')
        setStart(new Date())
        setEnd(new Date())
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="custom-modal">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Numero del apartamento" value={title} onChange={e => setTitle(e.target.value)} />

                <div>
                    <label>Inicio</label>
                    <DateTime value={start} onChange={date => setStart(date)} />
                </div>

                <div>
                    <label>Fin</label>
                    <DateTime value={end} onChange={date => setEnd(date)} />
                </div>

                <button className="custom-button">Agregar Evento</button>
            </form>
        </Modal>
    )
}
