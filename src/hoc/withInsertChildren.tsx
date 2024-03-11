import React, { FunctionComponent } from 'react'

// export const WithInsertChildren = <T extends JSX.IntrinsicAttributes>(
//   Component: FunctionComponent<T>,
//   insertChildrenArray: JSX.Element[]
// ) => {
//   return function (props: T) {
//     return <Component {...props} />
//   }
// }
export const WithInsertChildren = <T extends JSX.IntrinsicAttributes>(
  insertChildrenArray: JSX.Element[]
) => {
  return function (props: T) {
    return <>{insertChildrenArray.map((jsxElement) => jsxElement)}</>
  }
}
