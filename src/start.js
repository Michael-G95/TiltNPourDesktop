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
const callInsertAndSendResponseEvent = (fn, item) => {
  console.log("callInsertAndSendResponseEvent");
  fn(item)
    .then((obj) => {
        mainWindow.webContents.send('insertCompleted');
    })
    .catch(err=>{
      console.log(err);
      mainWindow.webContents.send('insertFailed');
    })
}

ipcMain.on('insert-brewery', function (event, item) {
  console.log("insert-brewery");
  callInsertAndSendResponseEvent(database.insertBreweryFromUi,item);
})