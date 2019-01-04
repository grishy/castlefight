if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var container, stats, controls;
var camera, scene, renderer, light;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.9, 2.7);
  controls = new THREE.OrbitControls(camera);
  controls.target.set(0, -0.2, -0.2);
  controls.update();
  var urls = [
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg"
  ];
  var loader = new THREE.CubeTextureLoader().setPath("textures/");
  var background = loader.load(urls);
  scene = new THREE.Scene();
  scene.background = background;
  light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  light.position.set(0, 1, 0);
  scene.add(light);
  // model
  var loader = new THREE.GLTFLoader().setPath(
    "models/DamagedHelmet/"
  );
  loader.load(
    "DamagedHelmet.gltf",
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material.envMap = background;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function(e) {
      console.error(e);
    }
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
  // stats
  stats = new Stats();
  container.appendChild(stats.dom);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}
