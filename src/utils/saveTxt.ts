import { Evento } from "../context/Eventcontext"


export const saveTxt = (data: Evento[]) => {

    localStorage.setItem('eventos', JSON.stringify(data))

}


const eventosFake = [
    {
        idUsuraio: 1,
        eventos: [
            {
                name: 'reunion',
                date: '2025-03-23T10:00:00.000Z',
                id: 1
            },
            {
                name: 'llamada',
                date: '2025-03-23T08:00:00.000Z',
                id: 2
            }
        ]
    },
    {
        idUsuraio: 2,
        eventos: [
            {
                name: 'revisar alcance proyecto',
                date: '2025-03-26T10:00:00.000Z',
                id: 1
            },
            {
                name: 'llamada con jefe ',
                date: '2025-03-25T08:00:00.000Z',
                id: 2
            }
            
        ]
    },
]