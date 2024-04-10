module.exports = {
  metas: {
    title: 'Corgi',
    description: 'Add 3D components utils',
    category: '3D'
  },
  dependencies: ["@types/three"],
  devDependencies: ["vite-plugin-glsl", "gsap", "three", "postprocess"],
  files: ['modules/corgi/src', 'configs', 'public/draco']
}
