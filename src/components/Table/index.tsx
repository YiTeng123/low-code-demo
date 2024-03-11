import { ComponentProps } from 'react'
import css from './table.module.less'
const Table = (props: ComponentProps<'tbody'>) => {
  return (
    <table className={css.table}>
      <tbody {...props}></tbody>
    </table>
  )
}
export default Table
