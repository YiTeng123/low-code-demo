import { App as AntdApp } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { routes } from './router/routes.tsx'
import { useChangeMode } from './hooks/useKey/useChangeMode.ts'
export default function App() {
  useChangeMode()
  return (
    <AntdApp>
      <RouterProvider router={routes} />
    </AntdApp>
  )
}
