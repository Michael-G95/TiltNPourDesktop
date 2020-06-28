
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const withDeRegisterHandlers= (fn,item) =>{
    deRegisterDbHandlers(fn);
    fn(item);
}

// Registers pass to be called on 'insertCompleted' and fail to be called on 'insertFailed', then both removed from the listeners so one is called once only. 
const registerOnDbCompleteHandlers = (pass,fail) => {
    ipcRenderer.on('dbCompleted', (item) => withDeRegisterHandlers(pass,item))
    ipcRenderer.on('dbFailed', (error) => withDeRegisterHandlers(fail,error));
}



const deRegisterDbHandlers = (fn)=>{
    ipcRenderer.removeListener('dbFailed', fn);
    ipcRenderer.removeListener('dbCompleted', fn);
}

const sendIpcEvent = (eventName, obj) => {
    if (!obj)
        ipcRenderer.send(eventName);
    else
        ipcRenderer.send(eventName, obj);
}

export default {
    registerOnDbCompleteHandlers,
    deRegisterDbHandlers,
    sendIpcEvent
}