// 工具函数

import { EditorStore, InternalComponent } from './editStoreTypes.ts'
import { useEditorStore } from './editStore.ts'
import { merge } from 'lodash-es'
import { isFunction } from '../shared/utils.ts'
import { CSSProperties } from 'react'
type SetNewProps = (preProps: InternalComponent) => Partial<InternalComponent>
// 提取 components 数组，并将其转换为一个键值对的对象（以组件的 uid 作为键），方便后续根据组件的键快速查找对应的组件对象。
export const createComponentsMap = (editorStore: EditorStore) => {
  const { components } = editorStore
  return components.reduce<Record<string, InternalComponent>>((acc, com) => {
    acc[com.uid] = com
    return acc
  }, {})
}
// 从 editorStore 中获取已选择的组件的键集合 selectedKeys，并通过调用 createComponentsMap 函数创建一个组件映射对象 componentsMap。
// 然后，它将 selectedKeys 中的每个键映射为对应的组件对象。
export const getSelectedComponents = (editorStore: EditorStore) => {
  const { selectedKeys } = editorStore
  const componentsMap = createComponentsMap(editorStore)
  const keys = [...selectedKeys.keys()]
  return keys.map((key) => componentsMap[key])
}
// 当前选中的组件。
export const getSelectedComponent = (editorStore: EditorStore) => {
  const selectedComponents = getSelectedComponents(editorStore)
  return selectedComponents[0]
}
export const updateSelectedComponentWrapperStyle = (
  updater: (preStyle: CSSProperties) => void
) => {
  useEditorStore.setState((draft) => {
    const selectedComponent = getSelectedComponent(draft)
    updater(selectedComponent.wrapperStyle!)
  })
}

export function updateSelectedComponents(setNewProps: SetNewProps): void
export function updateSelectedComponents(
  newProps: Partial<InternalComponent>
): void
export function updateSelectedComponents(newProps: any) {
  useEditorStore.setState((draft) => {
    const selectedComponents = getSelectedComponents(draft)
    selectedComponents.map((component) => {
      merge(component, isFunction(newProps) ? newProps(component) : newProps)
    })
  })
}
