import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// Создание сцены
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 7);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

// Добавляем свет для лучшей визуализации модели
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Создаем группу для стула
let chairGroup = new THREE.Group();
scene.add(chairGroup);

// Загружаем модель
const loader = new GLTFLoader();
loader.load('/models/scene.gltf', (gltf) => {
    // Добавляем все части модели в группу
    chairGroup.add(gltf.scene);

    // Устанавливаем позицию и масштаб группы
    chairGroup.position.set(0, 0, 0);
    chairGroup.scale.set(1, 1, 1);

    // Инициализируем DragControls
    initDragControls();
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

let dragControls = null;
// Инициализируем DragControls только для вращения
function initDragControls() {
    dragControls = new DragControls([chairGroup], camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function (event) {
        event.object.material.emissive.set(0xaaaaaa); // Устанавливаем эмиссию объекта при начале перетаскивания
        controls.enabled = false; // Отключаем OrbitControls при начале перетаскивания
    });
    dragControls.addEventListener('dragend', function (event) {
        event.object.material.emissive.set(0x000000); // Сбрасываем эмиссию объекта при окончании перетаскивания
        controls.enabled = true; // Включаем OrbitControls после окончания перетаскивания
    });
}
     // Добавляем обработчик события на кнопку
     document.getElementById("rotateButton").addEventListener("click", rotateObject);

     // Функция для поворота объекта на 90 градусов
     function rotateObject() {
         chairGroup.rotation.y += Math.PI / 2; // Поворачиваем на 90 градусов (в радианах)
     }
// Создаем OrbitControls и добавляем обновление камеры
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Устанавливаем цель вращения камеры
controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

renderer.setClearColor('white', 1);
animate();

