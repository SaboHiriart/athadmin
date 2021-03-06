const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let loginWindow;
let mainWindow;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        height: 580,
        width: 450,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        title: 'Athadmin',
        icon: path.join(__dirname, 'assets', 'icon.png'),
    });
    loginWindow.setResizable(false);
    loginWindow.setTitle('Athadmin');
    loginWindow.removeMenu();
    loginWindow.loadFile(path.join(__dirname, 'view-login/index.html'));
}

function createMainWindow(){
    mainWindow = new BrowserWindow({
        height: 800,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webviewTag: true
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Athadmin',
    });
    mainWindow.setTitle('Athadmin');
    mainWindow.maximize();
    //mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, 'view-main/index.html'));
}

app.whenReady().then(createLoginWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createLoginWindow();
    }
});

//Funcion de escucha para incio de sesión
ipcMain.handle('succesfullLogin', (event, obj) =>{
    createMainWindow();
    mainWindow.show();
    mainWindow.webContents.on('did-finish-load', ()=>{
        mainWindow.webContents.send('userDataSender', obj);
    })
    loginWindow.close();
});

ipcMain.handle('logOut', (event, obj) =>{
    createLoginWindow();
    loginWindow.show();
    mainWindow.close();
});

ipcMain.handle('openMessage', (event, obj) =>{
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBoxSync(window, obj);
});