import { Schema } from '@/types/schema.ts'

export interface ListItem {
  group: string
  elements: Schema[]
}

export interface InternalComponent extends Schema {
  uid: string
  el?: any
}

export interface EditorStoreState {
  mode: 'common' | 'insert'
  dragItem?: InternalComponent
  components: InternalComponent[]
  zoom: number
  canvasConfig: Record<string, any>
  list: ListItem[]
  selectedKeys: Set<string>
  linesCoordinate: {
    left?: number
    top?: number
  }
}

export interface EditorStoreAction {
  changeMode: (mode: EditorStoreState['mode']) => void
  addComponent: (component: InternalComponent) => void
  setDragItem: (dragItem?: EditorStoreState['dragItem']) => void
  getComponentByUid: (uid: string) => InternalComponent
  updateComponent: (uid: string, newProps: Partial<InternalComponent>) => void
  setComponentPropsChildren: (uid: string, children: React.ReactNode) => void
  updateLinesCoordinate: (
    coordinate: EditorStoreState['linesCoordinate']
  ) => void
  setInsertChildrenArray: (uid: string, children: JSX.Element) => void
}

export type EditorStore = EditorStoreState & EditorStoreAction
