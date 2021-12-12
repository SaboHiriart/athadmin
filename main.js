const { app, BrowserWindow} = require('electron');
const path = require('path');

function createLoginWindow() {
    const win = new BrowserWindow({
        height: 580,
        width: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        title: 'Athadmin',
        icon: path.join(__dirname, 'assets', 'icon.png'),
    });
    win.setResizable(false);
    win.setTitle('Athadmin');
    //win.removeMenu();
    win.loadFile(path.join(__dirname, 'view-login/index.html'));
}

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Athadmin',
    });
    mainWindow.setTitle('Athadmin');
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
        console.log('hola mundos');
        createLoginWindow();
    }
});