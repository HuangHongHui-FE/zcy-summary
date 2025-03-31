// 预加载脚本
const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

// 进程间通信
const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'
};

func();

console.log(window.myAPI); // => { desktop: true }

window.electronAPI.loadPreferences()

// 进程间通信 - 渲染器到主进程（单向）
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})


// 进程间通信 - 渲染器到主进程（双向）
const btn = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

// 进程间通信 - 主进程到渲染器
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.electronAPI.counterValue(newValue)
})