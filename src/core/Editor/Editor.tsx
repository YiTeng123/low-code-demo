import LeftPanel from '../LeftPanel/LeftPanel.tsx'
import css from './editor.module.less'
import { useEditorStore } from '@/store/editStore.ts'
import React, { useRef } from 'react'
import Blocker from '../Blocker'
import OuterBox from '../OuterBox'
import RightPanel from '../RightPanel'
import { onChangeSelected } from '../../store/actions.ts'
import { getSelectedComponents } from '../../store/helper.ts'
import MarkerLines from '@/core/MarkerLines'
import useDocumentAddlisten from './hook/useDocumentAddlisten.ts'
import { WithInsertChildren } from '@/hoc/withInsertChildren.tsx'
import { deepCloneAll } from '@/shared/deepClone.ts'

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [
    components,
    addComponent,
    updateComponent,
    dragItem,
    setDragItem,
    canvasConfig,
    mode,
    setComponentPropsChildren,
    setInsertChildrenArray,
    getComponentByUid,
  ] = useEditorStore((e) => [
    e.components,
    e.addComponent,
    e.updateComponent,
    e.dragItem,
    e.setDragItem,
    e.canvasConfig,
    e.mode,
    e.setComponentPropsChildren,
    e.setInsertChildrenArray,
    e.getComponentByUid,
  ])
  const selectedComponents = getSelectedComponents(useEditorStore.getState())
  console.log(dragItem, components, 'dragItem111111111')
  const blockerRef = useRef<any>({})
  const outerBoxRef = useRef<HTMLDivElement>(null)
  useDocumentAddlisten({ blockerRef, outerBoxRef, canvasRef })
  const onDrop = (e: React.DragEvent) => {
    if (mode === 'common') {
      e.preventDefault()
      if (!dragItem || !canvasRef.current) return
      const { left, top } = canvasRef.current.getBoundingClientRect()
      const { clientX, clientY } = e
      const componentLeft = clientX - left
      const componentTop = clientY - top
      addComponent({
        ...dragItem,
        wrapperStyle: {
          left: componentLeft,
          top: componentTop,
        },
      })
      console.log(111)
      setDragItem()
      // onChangeSelected(dragItem.uid)
    } else {
      const dragElementId = (e.target as any).parentNode.dataset.id
      // console.log((e.target as any).parentNode.dataset.id, 'Component')
      if (!dragItem || !canvasRef.current) return
      const Component = dragItem.type
      const insertChildrenArray = deepCloneAll(
        getComponentByUid(dragElementId).insertChildrenArray!
      )

      insertChildrenArray.push(<Component />)

      // 插入新的子元素
      const NewInsertChildrenArray = WithInsertChildren(insertChildrenArray)
      setInsertChildrenArray(dragElementId, <NewInsertChildrenArray />)
      setComponentPropsChildren(dragElementId, <NewInsertChildrenArray />)
    }
  }
  return (
    <div className={css.editor}>
      <div className={css.leftPanel}>
        <LeftPanel />
      </div>
      <div className={css.canvasWrapper}>
        <RightPanel Config={selectedComponents[0]?.ConfigView} />
        <div className={css.canvasScrollView}>
          <div
            ref={canvasRef}
            className={css.canvas}
            onDrop={onDrop}
            style={{ ...canvasConfig }}
            onDragOver={(e) => {
              e.preventDefault()
            }}
          >
            <OuterBox ref={outerBoxRef} />
            <MarkerLines />
            {components.map((componentSchema) => {
              const Component = componentSchema.type
              return (
                <Blocker
                  ref={(ref) => {
                    //  参数ref 是内部Blocker转发的divRef
                    if (!ref) return
                    blockerRef.current[componentSchema.uid] = ref

                    if (componentSchema.el) {
                      return
                    }
                    const { width, height } = ref.getBoundingClientRect()
                    updateComponent(componentSchema.uid, {
                      el: ref,
                      wrapperStyle: { width, height },
                    })
                  }}
                  id={componentSchema.uid}
                  key={componentSchema.uid}
                  style={componentSchema.wrapperStyle}
                >
                  <Component
                    {...componentSchema.props}
                    className={css.component}
                  />
                </Blocker>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
