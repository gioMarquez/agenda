import { Evento, UsuraioEventos } from "../context/Eventcontext";

export const saveTxt = (data: UsuraioEventos) => {
    const existingData = localStorage.getItem('eventos');
    const parsedData = Array.isArray(existingData ? JSON.parse(existingData || '') : []) 
        ? JSON.parse(existingData || '') 
        : [];
    
    const updatedData = parsedData.filter((item: { idUsuraio: number }) => item.idUsuraio !== data.idUsuraio);
    updatedData.push(data);

    localStorage.setItem('eventos', JSON.stringify(updatedData));
};

export const getData = (idUser: number): Evento[] => {
    const userData = localStorage.getItem('eventos');
    const parsedData = Array.isArray(userData ? JSON.parse(userData || '') : []) 
        ? JSON.parse(userData || '') 
        : [];
    const userEvents = parsedData.find((item: { idUsuraio: number }) => item.idUsuraio === idUser);
    
    return userEvents ? userEvents.eventos : [];
};


