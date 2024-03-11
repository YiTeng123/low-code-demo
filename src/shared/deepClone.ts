export const simpleDeepClone = <T extends object>(value: T): T => {
  return JSON.parse(JSON.stringify(value))
}
export function deepCloneAll(source: any): any {
  // 1.函数类型
  if (typeof source === 'function') {
    // 将函数直接返回即可
    return source
  }

  // 2.Map类型
  if (source instanceof Map) {
    return new Map([...source])
  }

  // 3.Set类型
  if (source instanceof Set) {
    return new Set([...source])
  }

  // 4.Symbol类型
  if (typeof source === 'symbol') {
    // 返回一个新的Symbol，并且将其描述传递过去
    return Symbol(source.description)
  }

  // 5.undefined
  if (typeof source === 'undefined') {
    return undefined
  }

  // 6.不是object类型
  if (typeof source !== 'object' || source === null) {
    return source
  }

  // 7.定义一个变量，如果传入的是数组就定义为一个数组
  const newValue: any = Array.isArray(source) ? [] : {}

  // 8.循环遍历，如果是对象，就取出key和值存放到空对象中，如果是数组，就去除下标和元素放到空数组中
  // 注意：for...in遍历对象会将其继承的属性也遍历出来，所以需要加hasOwnProperty进行判断是否是自身的属性
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // 递归调用deepCloneAll，如果对象属性值中还包含对象，就会再次进行拷贝处理
      newValue[key] = deepCloneAll(source[key])
    }
  }

  // 9.对key为Symbol类型的情况进行处理，拿到所有为Symbol类型的key
  const symbolKeys = Object.getOwnPropertySymbols(source)
  // for...of遍历取出所有的key，存放到新对象中
  for (const sKey of symbolKeys) {
    newValue[sKey] = deepCloneAll(source[sKey])
  }

  return newValue
}
