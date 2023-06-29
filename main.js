import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

let geometry;
const colors = [0x8491c3, 0xF3F3F3, 0xfddea5]
//Khởi tạo Scene ( Khung cảnh)
const scene = new THREE.Scene();


//Khởi tạo Sphere ( Hình cầu )
// geometry ( Khối hình học )
geometry = new THREE.SphereGeometry(3, 64, 64, 50)
//SphereGeometry( radius , widthSegments, heightSegments)
//Khởi tạo Material ( Chất liệu )
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
})
//Mesh là sự kết hợp của hình thể và chất liệu ( Nhúng vào lưới )
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh) //Thêm vào scene (lưới)

//Khởi tạo Sizes ( Thực hiện responsize web )
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Khởi tạo light ( Độ sáng )
//PointLight( Màu sắc, cường độ, khoảng cách )
const light = new THREE.PointLight(0xffffff, 1, 100)
//Vị trí nguồn sáng (x(trái và phải), y(trên và dưới), z(trong và ngoài))
light.position.set(0, 10, 10)
light.intensity = 1.25
scene.add(light)

//Khởi tạo Camera ( Góc nhìn )
//most common projection mode: PerspectiveCamera compare with othographic
// PerspectiveCamera( fov( Góc nhìn theo phương thăng ) , width / height ( Tỷ lệ của góc nhìn), góc gần, góc xa)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
//Di chuyển camera
camera.position.z = 20
scene.add(camera) //Thêm vào camera
// drawStar()

//Khởi tạo renderer ( Bộ dựng hình ) hiển thị Scene sử dụng WebGL
const canvas = document.querySelector('.webgl') //CSS selector
//render vào canvas
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height) //Tỷ lệ khung hình (aspect ratio)
renderer.setPixelRatio(2) //chỉnh sửa tỷ lệ pixel mượn
renderer.render(scene, camera)

//Khởi tạo controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //Vẫn chuyển động khi rời chuột
controls.enablePan = false //chỉnh sửa chuyển động sphere
controls.enableZoom = false //chỉnh sửa zoom
controls.autoRotate = true //tự dộng xoay
controls.autoRotateSpeed = 5 //tốc độ xoay

//Thay đổi kích thước - Resize
window.addEventListener('resize', () => {
    //Update Sizes (Responsive web theo con trỏ)
    sizes.width = innerWidth;
    sizes.height = innerHeight;
    //Update Camera
    camera.aspect = sizes.width / sizes.height //Tỷ lệ khung hình (aspect ratio)
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//Khởi tạo Loop ( Vòng lặp ở trong canvas )
//Nếu người dùng resize trình duyệt, cập nhật lại camera và size của renderer
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()

//Timeline animation
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 }) //animate object
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

//Adding Starts
// function drawStar() {
//     let particles = new THREE.Group()
//     scene.add(particles)
//     geometry = new THREE.TetrahedronGeometry(3, 0)

//     for (let i = 0; i < 1000; i++) {
//         const material = new THREE.MeshPhongMaterial({
//             color: colors[Math.floor(Math.random() * colors.length)],
//             shading: THREE.FlatShading
//         });
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.position.set((Math.random() - 0.5) * 1000,
//             (Math.random() - 0.5) * 1000,
//             (Math.random() - 0.5) * 1000,
//             (Math.random() - 0.5) * 1000);
//         mesh.updateMatrix();
//         mesh.matrixAutoUpdate = false;
//         particles.add(mesh);
//     }
// }