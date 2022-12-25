import { DotNestedKeys } from "utils"
import configContent from "./content"

type ConfigObj = {
   [key: string]: string | ConfigObj
}

type GetImpl = (
   object: ConfigObj,
   property: string | string[]
) => string | GetImpl

const getImpl: GetImpl = function (object, property) {
   let elems = Array.isArray(property) ? property : property.split(".")
   let name = elems[0]
   let value = object[name]

   if (typeof value === "string") {
      return value
   }

   return getImpl(value, elems.slice(1))
}

export default class Config {
   static content = configContent
   static get = (path: DotNestedKeys<typeof configContent>) =>
      String(getImpl(configContent, path))
}
