import { useEffect, useRef } from 'react'

export default function GlobeAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    let script = document.querySelector('script[src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"]')
    let cleanupFunc = null;
    
    const initThree = () => {
      const container = containerRef.current
      if (!container || !window.THREE) return
      
      container.innerHTML = ''

      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight

      const scene = new window.THREE.Scene()
      const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio || 1)
      container.appendChild(renderer.domElement)

      const geometry = new window.THREE.SphereGeometry(5, 64, 64)
      const material = new window.THREE.MeshPhongMaterial({
        color: 0x2563EB,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      })
      const globe = new window.THREE.Mesh(geometry, material)
      scene.add(globe)

      const atmosphereGeom = new window.THREE.SphereGeometry(5.2, 64, 64)
      const atmosphereMat = new window.THREE.MeshPhongMaterial({
        color: 0x2563EB,
        transparent: true,
        opacity: 0.05,
        side: window.THREE.BackSide
      })
      const atmosphere = new window.THREE.Mesh(atmosphereGeom, atmosphereMat)
      scene.add(atmosphere)

      const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      const pointLight = new window.THREE.PointLight(0x2563EB, 1)
      pointLight.position.set(10, 10, 10)
      scene.add(pointLight)

      camera.position.z = 12

      let reqId
      const animate = () => {
        reqId = requestAnimationFrame(animate)
        globe.rotation.y += 0.002
        globe.rotation.x += 0.001
        renderer.render(scene, camera)
      }

      const handleResize = () => {
        if (!container) return
        const w = container.clientWidth || window.innerWidth
        const h = container.clientHeight || window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      window.addEventListener('resize', handleResize)
      animate()

      cleanupFunc = () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(reqId)
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
      return cleanupFunc;
    }

    if (!script) {
      script = document.createElement('script')
      script.src = "https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"
      script.onload = initThree
      document.head.appendChild(script)
    } else if (window.THREE) {
      cleanupFunc = initThree()
    } else {
      script.addEventListener('load', initThree)
    }

    return () => {
      if (cleanupFunc) {
        cleanupFunc()
      } else {
        script.removeEventListener('load', initThree)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-40 z-[-1]">
      <div className="w-full h-full max-w-4xl max-h-[800px]" ref={containerRef}></div>
    </div>
  )
}
