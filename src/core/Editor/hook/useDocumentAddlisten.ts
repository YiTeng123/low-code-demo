import { clearSelected } from '@/store/actions'
import { MutableRefObject, useEffect } from 'react'
// 综上所述，这段代码的作用是在文档上注册一个点击事件的监听器，当点击事件发生时，根据特定的逻辑判断是否需要清除选中状态。
// 这样可以对点击事件做出响应，并执行相应的逻辑。
export default ({
  canvasRef,
  blockerRef,
  outerBoxRef,
}: Record<
  'canvasRef' | 'blockerRef' | 'outerBoxRef',
  MutableRefObject<any>
>) => {
  useEffect(() => {
    const listenDocument = (e: Event) => {
      if (!canvasRef.current?.contains(e.target as HTMLDivElement)) return
      const notContains = Object.entries(blockerRef.current).every(
        ([, v]: any) => {
          return !v.contains(e.target)
        }
      )
      if (
        notContains &&
        !outerBoxRef.current?.contains(e.target as HTMLDivElement)
      ) {
        clearSelected()
      }
    }
    document.addEventListener('click', listenDocument)
    return () => {
      document.removeEventListener('click', listenDocument)
    }
  }, [])
}
