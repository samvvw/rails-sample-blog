// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import '@hotwired/turbo-rails'
import 'controllers'
import * as THREE from 'three'
const main = () => {
    const canvas = document.querySelector('#c')
    if (canvas) {
        const renderer = new THREE.WebGLRenderer({ canvas })

        const fov = 75
        const aspect = 2
        const near = 0.1
        const far = 5
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

        camera.position.z = 2

        const scene = new THREE.Scene()

        const boxWidth = 1
        const boxHeight = 1
        const boxDepth = 1
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })

        const cube = new THREE.Mesh(geometry, material)

        scene.add(cube)

        function render(time) {
            time *= 0.001

            cube.rotation.x = time
            cube.rotation.y = time

            renderer.render(scene, camera)

            requestAnimationFrame(render)
        }

        requestAnimationFrame(render)
    }
}
window.addEventListener('turbo:load', (event) => {
    console.log('page is fully loaded')
    main()
})

// if (document.querySelector('#c')) {
//     main()
// }
