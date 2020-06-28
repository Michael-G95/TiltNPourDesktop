
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const withDeRegisterHandlers= (fn,other,item) =>{
    deRegisterDbHandlers(fn);
    deRegisterDbHandlers(other);
    fn(item);
}

// Registers pass to be called on 'insertCompleted' and fail to be called on 'insertFailed', then both removed from the listeners so one is called once only. 
const registerOnDbCompleteHandlers = (pass,fail) => {
    ipcRenderer.once('dbCompleted', (e,item) => withDeRegisterHandlers(pass,fail,item))
    ipcRenderer.once('dbFailed', (e,error) => withDeRegisterHandlers(fail,pass,error));
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