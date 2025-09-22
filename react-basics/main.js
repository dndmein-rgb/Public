// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Load stars.json
async function visualizeStars() {
  try {
    const response = await fetch("stars.json");
    const stars = await response.json();

    const positions = [];
    const colors = [];
    const sizes = [];

    const color = new THREE.Color();

    for (const star of stars) {
      positions.push(star.x, star.y, star.z);

      // Brighter stars → lighter color
      const lightness = Math.max(0.2, 1 - star.magnitude / 6);
      color.setHSL(0.15, 0.8, lightness);
      colors.push(color.r, color.g, color.b);

      // Brighter stars → slightly bigger
      sizes.push(Math.max(0.01, 0.08 - star.magnitude * 0.01));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);
  } catch (err) {
    console.error("Error loading stars.json", err);
  }
}

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

visualizeStars();
animate();
