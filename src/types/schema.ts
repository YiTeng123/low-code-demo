import { CSSProperties, FC } from 'react'

export interface Schema<T = any> {
  name: string
  key: string
  type: FC<any>
  ConfigView?: FC<any>
  wrapperStyle?: CSSProperties
  insertChildrenArray?: JSX.Element[]
  hasChildren?: boolean
  props?: {
    config?: Record<string, any>
  } & T
  setProps?: (e: JSX.Element) => void
}
