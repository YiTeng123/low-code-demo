import { useEditorStore } from '@/store/editStore'
import { message } from 'antd'
import { useHotkeys } from 'react-hotkeys-hook'

export const useChangeMode = () => {
  const [changeMode] = useEditorStore((e) => [e.changeMode])
  useHotkeys('i', () => {
    console.log('change mode to insert')
    message.success('插入模式')
    changeMode('insert')
  })
  useHotkeys('c', () => {
    console.log('change mode to common')
    message.success('普通模式')
    changeMode('common')
  })
}
