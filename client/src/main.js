import Wc3Control from './wc3Control';

if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}


let container;
let stats;
let controls;
let camera;
let scene;
let renderer;
let light;


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
  camera.position.set(-15, 0, 0);

  controls = new Wc3Control(camera);
  controls.update();

  light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  light.position.set(0, 1, 0);
  scene.add(light);

  // model
  const loader = new THREE.GLTFLoader().setPath('models/Skull/');
  loader.load('scene.gltf', (gltf) => {
    gltf.scene.position.y = -30;
    scene.add(gltf.scene);
  }, undefined, (e) => {
    console.error(e);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);
}

//
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
  
  controls.update(); 
}


init();
animate();

// if ( WEBGL.isWebGLAvailable() === false ) {
//   document.body.appendChild( WEBGL.getWebGLErrorMessage() );
// }
// var camera, controls, scene, renderer;
// init();
// //render(); // remove when using next line for animation loop (requestAnimationFrame)
// animate();
// function init() {
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color( 0xcccccc );
//   scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
//   renderer = new THREE.WebGLRenderer( { antialias: true } );
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );
//   camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
//   camera.position.set( 400, 200, 0 );
//   // controls
//   controls = new THREE.MapControls( camera, renderer.domElement );
//   //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
//   controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//   controls.dampingFactor = 0.25;
//   controls.screenSpacePanning = false;
//   controls.minDistance = 100;
//   controls.maxDistance = 500;
//   controls.maxPolarAngle = Math.PI / 2;
//   // world
//   var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
//   geometry.translate( 0, 0.5, 0 );
//   var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
//   for ( var i = 0; i < 500; i ++ ) {
//     var mesh = new THREE.Mesh( geometry, material );
//     mesh.position.x = Math.random() * 1600 - 800;
//     mesh.position.y = 0;
//     mesh.position.z = Math.random() * 1600 - 800;
//     mesh.scale.x = 20;
//     mesh.scale.y = Math.random() * 80 + 10;
//     mesh.scale.z = 20;
//     mesh.updateMatrix();
//     mesh.matrixAutoUpdate = false;
//     scene.add( mesh );
//   }
//   // lights
//   var light = new THREE.DirectionalLight( 0xffffff );
//   light.position.set( 1, 1, 1 );
//   scene.add( light );
//   var light = new THREE.DirectionalLight( 0x002288 );
//   light.position.set( - 1, - 1, - 1 );
//   scene.add( light );
//   var light = new THREE.AmbientLight( 0x222222 );
//   scene.add( light );
//   //
//   window.addEventListener( 'resize', onWindowResize, false );
//   var gui = new dat.GUI();
//   gui.add( controls, 'screenSpacePanning' );
// }
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize( window.innerWidth, window.innerHeight );
// }
// function animate() {
//   requestAnimationFrame( animate );
//   controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
//   render();
// }
// function render() {
//   renderer.render( scene, camera );
// }
