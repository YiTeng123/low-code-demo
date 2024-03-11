import ReactDOM from 'react-dom/client'
import { enableMapSet } from 'immer'
import App from './app.tsx'
import 'antd/dist/reset.css'
import './index.less'
enableMapSet()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
