const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  // 建立瀏覽器視窗，設定固定大小
  mainWindow = new BrowserWindow({
    width: 480,                  // 寬度
    height: 240,                 // 高度 (比鍵盤多30px給標題列和邊框)
    resizable: false,            // 禁止調整大小
    maximizable: false,          // 禁止最大化
    fullscreenable: false,       // 禁止全螢幕
    autoHideMenuBar: true,       // 自動隱藏選單列
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // 載入 index.html
  mainWindow.loadFile('index.html')

  // 視窗居中顯示
  mainWindow.center()
}

app.whenReady().then(() => {
  createWindow()

  // macOS 相關設定
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})