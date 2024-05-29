// Сцена
const scene = new THREE.Scene();

// Объект
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 'red'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Камера
const sizes = {
	width: 800,
	height: 800,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);

// Позиция камеры
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);