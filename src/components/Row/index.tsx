import { ComponentProps } from 'react'
import css from './row.module.less'
const Row = (props: ComponentProps<'tr'>) => {
  return <tr {...props} className={css.row}></tr>
}
export default Row
