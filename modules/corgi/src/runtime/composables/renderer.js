import { WebGLRenderer } from "three"

/**
 * @typedef {Object} UseRenderer
 * @property {function(scene:import('three').Scene,camere:import('three').Camera):void} render - Call the render method for the THREE.WebGLRenderer
 * @property {function(width:Number,height:Number):void} resize - Resize the renderer
 */

/**
 *
 * @param {import('three').WebGLRendererParameters} options
 * @returns {UseRenderer}
 */
export const useRenderer = (options) => {

  /**
   * @type {import('three').WebGLRendererParameters}
   */
  const defaultOptions = {
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: true,
  }

  /**
   * @type {import('three').WebGLRenderer}
   */
  const renderer = new WebGLRenderer(
    { ...defaultOptions, ...options }
  )

  // renderer.toneMapping = AgXToneMapping

  /**
   * Call the render method for the THREE.WebGLRenderer
   * @param {import('three').Scene} scene
   * @param {import('three').Camera} camera
   */
  const render = (scene, camera) => {
    renderer.render(scene, camera)
  }


  /**
   * Resize the renderer
   * @param {Number} width
   * @param {Number} height
   */
  const resize = (width, height) => {
    renderer.setSize(width, height)
  }

  /**
   * Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.
   */
  const dispose = () => {
    renderer?.dispose()
  }

  return { renderer, render, resize, dispose }
}
