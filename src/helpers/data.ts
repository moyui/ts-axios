import { isPlainObject } from './utils'

export function transfromRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
