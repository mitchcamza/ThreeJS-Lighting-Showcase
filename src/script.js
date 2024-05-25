import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { lights } from 'three/examples/jsm/nodes/Nodes.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

// UI Panel
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights
const createLightHelper = () => (light, helperType, size) => {
    const helper = new helperType(light, size)
    helper.visible = false
    scene.add(helper)
    return helper
}
const lightsFolder = gui.addFolder('Lights')
lightsFolder.close()


// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.visible = false
scene.add(ambientLight)

const ambientLightFolder = lightsFolder.addFolder('Ambient light')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.01).name('ambient light instensity')
ambientLightFolder.addColor(ambientLight, 'color').name('ambient light color')
ambientLightFolder.add(ambientLight, 'visible').name('ambient light visible')
ambientLightFolder.close()

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 6.74)
directionalLight.visible = true
scene.add(directionalLight)
directionalLight.position.set(1, -1.28, 0)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

const directionalLightFolder = lightsFolder.addFolder('Directional light')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(10).step(0.01).name('directional light instensity')
directionalLightFolder.addColor(directionalLight, 'color').name('directional light color')
directionalLightFolder.add(directionalLight, 'visible').name('directional light visible')
directionalLightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.01).name('directional light x')
directionalLightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.01).name('directional light y')
directionalLightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.01).name('directional light z')
directionalLightFolder.add(directionalLightHelper, 'visible').name('directional light helper visible')
directionalLightFolder.close()

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.05)
hemisphereLight.visible = true
scene.add(hemisphereLight)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
hemisphereLightHelper.visible = false
scene.add(hemisphereLightHelper)

const hemisphereLightFolder = lightsFolder.addFolder('Hemisphere light')
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(3).step(0.001).name('hemisphere light instensity')
hemisphereLightFolder.addColor(hemisphereLight, 'color').name('hemisphere light sky color')
hemisphereLightFolder.addColor(hemisphereLight, 'groundColor').name('hemisphere light ground color')
hemisphereLightFolder.add(hemisphereLight, 'visible').name('hemisphere light visible')
hemisphereLightFolder.add(hemisphereLight.position, 'x').min(-5).max(5).step(0.01).name('hemisphere light x')
hemisphereLightFolder.add(hemisphereLight.position, 'y').min(-5).max(5).step(0.01).name('hemisphere light y')
hemisphereLightFolder.add(hemisphereLight.position, 'z').min(-5).max(5).step(0.01).name('hemisphere light z')
hemisphereLightFolder.add(hemisphereLightHelper, 'visible').name('hemisphere light helper visible')
hemisphereLightFolder.close()

// Point light
const pointLight = new THREE.PointLight(0xff4700, 10, 2.61, 4.2)
pointLight.position.set(0.68, 1.86, 1)
pointLight.visible = true
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
pointLightHelper.visible = false
scene.add(pointLightHelper)

const pointLightFolder = lightsFolder.addFolder('Point light')
pointLightFolder.add(pointLight, 'intensity').min(0).max(10).step(0.01).name('point light instensity')
pointLightFolder.addColor(pointLight, 'color').name('point light color')
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.01).name('point light distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(10).step(0.01).name('point light decay')
pointLightFolder.add(pointLight, 'visible').name('point light visible')
pointLightFolder.add(pointLight.position, 'x').min(-5).max(5).step(0.01).name('point light x')
pointLightFolder.add(pointLight.position, 'y').min(-5).max(5).step(0.01).name('point light y')
pointLightFolder.add(pointLight.position, 'z').min(-5).max(5).step(0.01).name('point light z')
pointLightFolder.add(pointLightHelper, 'visible').name('point light helper visible')
pointLightFolder.close()

// Helper function to create and add lights
const createRectAreaLight = (color, intensity, width, height, position, lookAt, folderName) => {
    const rectAreaLight = new THREE.RectAreaLight(color, intensity, width, height)
    rectAreaLight.position.set(position.x, position.y, position.z)
    rectAreaLight.lookAt(lookAt)
    rectAreaLight.visible = true
    scene.add(rectAreaLight)

    const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
    rectAreaLightHelper.visible = false
    scene.add(rectAreaLightHelper)

    const folder = lightsFolder.addFolder(folderName)
    folder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('intensity')
    folder.addColor(rectAreaLight, 'color').name('color')
    folder.add(rectAreaLight, 'width').min(0).max(10).step(0.01).name('width')
    folder.add(rectAreaLight, 'height').min(0).max(10).step(0.01).name('height')
    folder.add(rectAreaLight, 'visible').name('visible')
    folder.add(rectAreaLight.position, 'x').min(-10).max(10).step(0.01).name('x')
    folder.add(rectAreaLight.position, 'y').min(-10).max(10).step(0.01).name('y')
    folder.add(rectAreaLight.position, 'z').min(-10).max(10).step(0.01).name('z')
    folder.add(rectAreaLightHelper, 'visible').name('helper visible')
    folder.close()

    return rectAreaLight
}

// Create RectArea lights using the helper function
createRectAreaLight(0xff2600, 2.28, 10, 1, { x: -9, y: 0, z: 10 }, new THREE.Vector3(), 'RectArea light 1')
createRectAreaLight(0x00f900, 2.41, 10, 1, { x: -10, y: 0, z: -8 }, new THREE.Vector3(), 'RectArea light 2')
createRectAreaLight(0x1300ff, 3.98, 10, 1, { x: 10, y: 0, z: -7 }, new THREE.Vector3(), 'RectArea light 3')

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 5.0, 2.93, 0.35, 0.3, 0.18)
spotLight.position.set(0, 2.38, 0.81)
spotLight.visible = true
scene.add(spotLight)
spotLight.target.position.set(0.11, 0, 0)
scene.add(spotLight.target)
const spotLightFolder = lightsFolder.addFolder('Spot light')
spotLightFolder.addColor(spotLight, 'color').name('spot light color')
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.01).name('spot light instensity')
spotLightFolder.add(spotLight, 'distance').min(0).max(10).step(0.01).name('spot light distance')
spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI).step(0.01).name('spot light angle')
spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.01).name('spot light penumbra')
spotLightFolder.add(spotLight, 'decay').min(0).max(10).step(0.01).name('spot light decay')
spotLightFolder.add(spotLight, 'visible').name('spot light visible')
spotLightFolder.add(spotLight.target.position, 'x').min(-5).max(5).step(0.01).name('spot light target x')
spotLightFolder.add(spotLight.target.position, 'y').min(-5).max(5).step(0.01).name('spot light target y')
spotLightFolder.add(spotLight.target.position, 'z').min(-5).max(5).step(0.01).name('spot light target z')
spotLightFolder.close()


// Material
const planeMaterial = new THREE.MeshStandardMaterial()
planeMaterial.roughness = 0.4

// Objects
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.5, 0.1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.3, metalness: 1.0 })
)
torusKnot.position.set(0, 0.5, 0)
scene.add(torusKnot)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15),
    planeMaterial
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
scene.add(plane)

const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    dimensions.width = window.innerWidth
    dimensions.height = window.innerHeight

    // Update camera
    camera.aspect = dimensions.width / dimensions.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(dimensions.width, dimensions.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 100)
camera.position.x = -0.49
camera.position.y = 2.97
camera.position.z = -0.92
camera.lookAt(torusKnot.position)
scene.add(camera)

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x').min(-10).max(10).step(0.01).name('camera x').listen()
cameraFolder.add(camera.position, 'y').min(-10).max(10).step(0.01).name('camera y').listen()
cameraFolder.add(camera.position, 'z').min(-10).max(10).step(0.01).name('camera z').listen()
cameraFolder.close()

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, antialias: true
})
renderer.setSize(dimensions.width, dimensions.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Stats
const stats = new Stats()
document.body.appendChild(stats.dom)

// Animation
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torusKnot.rotation.y = 0.1 * elapsedTime
    torusKnot.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // Update stats
    stats.update()
}
tick()