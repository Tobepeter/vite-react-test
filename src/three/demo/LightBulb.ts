import {
  PerspectiveCamera,
  Group,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  TorusGeometry,
  Vector3,
  Color,
  PlaneGeometry,
  PCFSoftShadowMap,
  PointLight,
  DirectionalLight,
} from 'three'
import { IThreeTest } from '../util/IThreeTest'
import { Random } from 'mockjs'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Pane } from 'tweakpane'

/**
 * 灯泡测试
 * @ref https://codepen.io/Vector_victor/pen/veVKpM?editors=0010
 */
class LightBulb implements IThreeTest {
  intensity = 0.5
  bulbColor = '#ffffee'
  enableLight = true

  velocity = 0
  angle = (Math.PI * 95) / 100
  bulbLightIntensity = 20

  pane: Pane

  bulbGroup: Group
  bulbMtl: MeshStandardMaterial
  bulbLight: PointLight

  init() {
    this.initScene()
    this.createGround()
    this.makeBulbGroup()
    this.updateBulb()
    this.makeBox()
    this.initPane()
  }

  initScene() {
    threeEntry.scene.background = new Color(0xcce0ff)

    const camera = threeEntry.camera
    camera.position.set(0, 4.25, 15)
    camera.lookAt(new Vector3(0, 2, 0))

    const renderer = threeEntry.renderer
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.setClearColor(0xcce0ff, 0.5)

    const dirLight = new DirectionalLight(0xffffff, 0.15)
    dirLight.position.set(1, 1, 1).normalize()
    threeEntry.testRoot.add(dirLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  }

  createGround() {
    const geo = new PlaneGeometry(100, 100)
    const mtl = new MeshStandardMaterial({
      color: 0xe81b05,
      metalness: 0.65,
    })

    const ground = new Mesh(geo, mtl)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = 0
    ground.receiveShadow = true
    threeEntry.testRoot.add(ground)
  }

  makeBulbGroup() {
    const group = new Group()
    this.bulbGroup = group

    // 主灯泡
    const bulbGeo = new SphereGeometry(1, 32, 32)

    const light = new PointLight(this.bulbColor, this.intensity, 100, 2)
    this.bulbLight = light
    const bulbMat = new MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: this.intensity,
      color: 0xffffee,
      roughness: 1,
    })
    this.bulbMtl = bulbMat
    light.position.set(0, 2, 0)
    light.castShadow = true

    const body = new Mesh(bulbGeo, bulbMat)
    body.position.copy(light.position)

    const d = 200
    const shadowCamera = light.shadow.camera as any // TODO: 类型错误
    shadowCamera.left = -d
    shadowCamera.right = d
    shadowCamera.top = d
    shadowCamera.bottom = -d
    shadowCamera.far = 100

    // 灯杆
    const bulbStem = new CylinderGeometry(0.5, 0.65, 0.55, 32)
    const stemMat = new MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffee,
      emissiveIntensity: this.intensity,
      metalness: 0.8,
      roughness: 0,
    })

    const bStem = new Mesh(bulbStem, stemMat)
    bStem.position.set(0, 2.9, 0)
    bStem.castShadow = true
    bStem.receiveShadow = true

    // 插头主体
    const bulbPlug = new CylinderGeometry(0.52, 0.52, 1.2, 32)
    const plugMat = new MeshStandardMaterial({
      color: 0x807d7a,
    })
    const plug = new Mesh(bulbPlug, plugMat)
    plug.position.set(0, 3.2, 0)
    plug.receiveShadow = true
    plug.castShadow = true

    // 插头顶部
    const topGeo = new CylinderGeometry(0.25, 0.3, 0.2, 32)
    const topMat = new MeshStandardMaterial({
      color: 0xe8d905,
    })
    const plugTop = new Mesh(topGeo, topMat)
    plugTop.position.set(0, 3.75, 0)
    plugTop.receiveShadow = true
    plugTop.castShadow = true

    // 插头环
    const ringGeo = new TorusGeometry(0.52, 0.04, 4, 100)
    const ringMat = new MeshStandardMaterial({
      color: 0xff7d7a,
    })

    let ringY = 3.33
    for (let i = 0; i < 3; i++) {
      const ring = new Mesh(ringGeo, ringMat)
      ring.rotation.x = -Math.PI / 2
      ring.position.set(0, ringY, 0)
      this.bulbGroup.add(ring)
      ringY += 0.15
    }

    // 顶环
    const topRingGeo = new TorusGeometry(0.49, 0.05, 16, 100)
    const topRing = new Mesh(topRingGeo, ringMat)
    topRing.position.set(0, 3.75, 0)
    topRing.rotation.x = -Math.PI / 2

    // 底环
    const botRingGeo = new TorusGeometry(0.5, 0.05, 16, 100)
    const botRing = new Mesh(botRingGeo, ringMat)
    botRing.position.set(0, 3.15, 0)
    botRing.rotation.x = -Math.PI / 2

    // 添加到组
    group.add(light)
    group.add(body)
    group.add(bStem)
    group.add(plug)
    group.add(plugTop)
    group.add(botRing)
    group.add(topRing)

    threeEntry.testRoot.add(this.bulbGroup)
    this.bulbGroup.position.set(0, 0, 0)
  }

  makeBox() {
    for (let i = 0; i < 3; i++) {
      const size = Random.float(1, 2)
      const boxX = Random.float(2, 4) * (Random.boolean() ? 1 : -1)
      const boxZ = Random.float(2, 3) * (Random.boolean() ? 1 : -1)
      const boxGeo = new BoxGeometry(size, size, size)
      const boxMat = new MeshStandardMaterial({
        color: 0x212121,
      })

      const box = new Mesh(boxGeo, boxMat)
      box.castShadow = true
      box.receiveShadow = true
      threeEntry.testRoot.add(box)
      box.position.set(boxX, size / 2, boxZ)
    }
  }

  updateBulb() {
    this.bulbMtl.emissiveIntensity = this.intensity
    this.bulbMtl.emissive = new Color(this.bulbColor)
    this.bulbLight.intensity = this.intensity * this.bulbLightIntensity
    this.bulbLight.color = new Color(this.bulbColor)
    this.bulbLight.visible = this.enableLight
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane
    pane
      .addBinding(this, 'intensity', {
        min: 0,
        max: 1,
        step: 0.01,
        label: '灯泡亮度',
      })
      .on('change', value => {
        this.updateBulb()
      })

    pane
      .addBinding(this, 'bulbColor', {
        label: '灯泡颜色',
        format: 'color',
      })
      .on('change', value => {
        this.updateBulb()
      })

    pane
      .addBinding(this, 'enableLight', {
        label: '开启灯泡',
      })
      .on('change', value => {
        this.updateBulb()
      })
  }

  clear() {
    this.pane.dispose()
  }

  update() {
    const accel = 10 * Math.sin(this.angle)
    const step = 5 / 1000
    this.velocity += accel * step
    this.angle += this.velocity * step

    this.bulbGroup.position.x = -2.98 + this.angle
  }
}

export const lightBulb = new LightBulb()
