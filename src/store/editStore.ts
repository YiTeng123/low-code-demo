import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { EditorStore } from '@/store/editStoreTypes.ts'
import { titleSchema } from '@/components/Title/schema.tsx'
import { imageSchema } from '@/components/Image/schema.tsx'
import { buttonSchema } from '@/components/Button/schema.tsx'
import { createComponentsMap } from '@/store/helper.ts'
import { merge } from 'lodash-es'
import { tableSchema } from '@/components/Table/schema'
import { rowSchema } from '@/components/Row/schema'
import { colSchema } from '@/components/Col/schema'

export const useEditorStore = create(
  immer<EditorStore>((setState, getState) => {
    return {
      mode: 'common',
      zoom: 1,
      components: [],
      linesCoordinate: {},
      canvasConfig: {
        width: '21cm',
        // height: 600,
      },
      // todo: why need to nest object ?
      selectedKeys: new Set(),
      list: [
        {
          group: '文本',
          elements: [titleSchema],
        },
        {
          group: '图片',
          elements: [imageSchema],
        },
        {
          group: '按钮',
          elements: [buttonSchema],
        },
        {
          group: '表格',
          elements: [tableSchema, rowSchema, colSchema],
        },
      ],
      getComponentByUid: (uid) => {
        const componentsMap = createComponentsMap(getState())
        const component = componentsMap[uid]
        return component
      },
      changeMode: (mode) => {
        setState((state) => {
          state.mode = mode
        })
      },
      addComponent: (component) => {
        setState((state) => {
          state.components.push(component)
        })
      },
      // updateLinesCoordinate 函数用于更新 linesCoordinate 属性，通过传入一个新的坐标对象，将其与现有的坐标对象进行合并，并更新状态
      updateLinesCoordinate: (coordinate) => {
        setState((state) => {
          state.linesCoordinate = {
            ...state.linesCoordinate,
            ...coordinate,
          }
        })
      },
      // updateComponent 函数用于更新指定 uid 的组件的属性。
      // 首先通过调用 createComponentsMap 函数创建一个组件映射对象，然后根据 uid 获取对应的组件，
      // 并使用 merge 函数将 nextProps 中的属性合并到组件对象中。
      updateComponent: (uid, nextProps) => {
        setState((state) => {
          const componentsMap = createComponentsMap(state)
          const component = componentsMap[uid]
          console.log(component, componentsMap, 'updat2eComponent')
          if (component) {
            merge(component, nextProps)
          }
        })
      },
      setInsertChildrenArray: (id, children) => {
        setState((state) => {
          const componentsMap = createComponentsMap(state)
          const component = componentsMap[id]
          component.insertChildrenArray?.push(children)
        })
      },
      setComponentPropsChildren: (uid, children) => {
        setState((state) => {
          const componentsMap = createComponentsMap(state)
          const component = componentsMap[uid]
          if (component) {
            component.props.children = children
          }
        })
      },
      // setDragItem 函数用于设置拖拽的元素。
      setDragItem: (dragItem) => {
        setState((state) => {
          console.log(dragItem, 'dragItem')
          state.dragItem = dragItem
        })
      },
    }
  })
)
