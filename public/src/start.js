const electron = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const database = require('./dal/database');
const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  mainWindow.removeMenu()
})

// Ensure a consistent event response to frontend
// insertCompleted or insertFailed
const callDbAndSendResponseEvent =  (fn, item) => {
  console.log("callInsertAndSendResponseEvent");
  fn(item)
    .then((obj) => {
      console.log("response got");
        mainWindow.webContents.send('dbCompleted',obj);
    })
    .catch(err=>{
      console.log(err);
      mainWindow.webContents.send('dbFailed',err);
    })
}

ipcMain.on('insert-brewery', function (event, item) {
  console.log("insert-brewery");
  callDbAndSendResponseEvent(database.insertBreweryFromUi,item);
})

ipcMain.on('update-brewery', function (event, item) {
  console.log("update-brewery");
  callDbAndSendResponseEvent(database.updateBrewery,item);
})


ipcMain.on('get-breweries',function(event,item){
  console.log('get-breweries');
  callDbAndSendResponseEvent(database.getAllBreweries,null);
})

ipcMain.on('get-brewery',function(event,item){
  console.log('get-brewery');
  callDbAndSendResponseEvent(database.getBrewery,item);
  
});