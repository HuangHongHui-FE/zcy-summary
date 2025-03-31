const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron/main");

const path = require("node:path");

// 版本自动更新
// require("update-electron-app")();

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

    // 预加载脚本
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  // win.loadURL('https://github.com')

  const contents = win.webContents;
  // console.log(contents);

  // 进程间通信 - 渲染器到主进程（单向）
  win.on("set-title", handleSetTitle);

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)

  win.loadFile("index.html");

  // Open the DevTools.
  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  // 进程间通信
  ipcMain.handle("ping", () => "pong");

  // 进程间通信 - 渲染器到主进程（双向）
  ipcMain.handle('dialog:openFile', handleFileOpen)

  // 进程间通信 - 主进程到渲染器
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })

  // 创建窗口
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
