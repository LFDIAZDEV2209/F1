import * as THREE from '../libs/three.module.js';
import { GLTFLoader } from '../libs/GLTFLoader.js';

// Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(4, 2, 6);

// Renderizado
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('carCanvas'), 
  antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Iluminación
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Variables de control
let car;
const controls = {
  color: '#ffffff',
  wheelSize: 1
};

// Cargar modelo GLB
const loader = new GLTFLoader();
loader.load('../models/models.glb', (gltf) => {
  car = gltf.scene;
  scene.add(car);
  
  // Mostrar nombres de partes del modelo para debug
  console.log('Modelo cargado correctamente');
  car.traverse((child) => {
    if (child.isMesh) {
      console.log('Parte encontrada:', child.name);
    }
  });
  
  // Aplicar configuraciones iniciales
  updateCarMaterial();
  updateWheelScale();
});

// Eventos de interfaz
document.getElementById('colorPicker').addEventListener('input', (e) => {
  controls.color = e.target.value;
  updateCarMaterial();
});

document.getElementById('wheelSize').addEventListener('input', (e) => {
  controls.wheelSize = parseFloat(e.target.value);
  updateWheelScale();
});

// Función para cambiar el color del auto
function updateCarMaterial() {
  if (!car) return;
  car.traverse((child) => {
    if (child.isMesh && child.name.toLowerCase().includes('body')) {
      child.material.color.set(controls.color);
    }
  });
}

// Función para cambiar el tamaño de las llantas
function updateWheelScale() {
  if (!car) return;
  car.traverse((child) => {
    if (child.isMesh && child.name.toLowerCase().includes('wheel')) {
      child.scale.set(controls.wheelSize, controls.wheelSize, controls.wheelSize);
    }
  });
}

// Animación
function animate() {
  requestAnimationFrame(animate);
  if (car) {
    car.rotation.y += 0.005; // Para hacer que el auto gire lentamente
  }
  renderer.render(scene, camera);
}
animate();

// Responsividad
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});