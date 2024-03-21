import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RESOURCES_TYPES } from '../utils/types'

export const useResources = (() => {

  const modelLoader = new GLTFLoader()

  /**
   * resources
   * @type {Array<import("./resource").UseResource>}
   */
  let resources = []

  /**
   * Add
   * @param {import("./resource").UseResource | Array<import("./resource").UseResource>} value
   */
  const add = (value) => {
    if (!Array.isArray(value)) {
      value = [value]
    }
    resources = [...value]
  }

  /**
   * Get asset and available load promise.
   * @param {String} name - Name of the resource to be found
   * @param {Function} done - Not mandatory method to retrieve the resource with the file inside
   * @returns {Promise} - Promise to be resolved with the file inside
   */
  const get = (name, done = null) => {
    const item = resources.find(item => item?.name === name)

    // Get promise with avalaible loader
    let promise = undefined
    if (item.type === RESOURCES_TYPES.gltf) {
      promise = modelLoader.loadAsync(item.path)
    }

    if (done) {
      // If resource is already loaded (file exist) returns it directly
      if (item.asset) {
        done(item)
      } else {
        promise.then((result) => {
          item.asset = result
          done?.(item)
        })
      }
    }

    // TODO Add progress ref if needed for loading ui
    return promise
  }

  // TODO method get resources, that load the resource with appropriate loader
  // TODO method get all and done callback

  const instance = {
    add,
    get,
    resources
  }

  return () => instance
})()
