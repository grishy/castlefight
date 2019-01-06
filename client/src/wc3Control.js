// To autocomplete
// import * as THREE from '../node_modules/three/build/three.module';

// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(obj, axis, radians) {
  const rotWorldMatrix = new THREE.Matrix4();
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
  rotWorldMatrix.multiply(obj.matrix); // pre-multiply
  obj.matrix = rotWorldMatrix;
  obj.setRotationFromMatrix(obj.matrix);
}


class Wc3Control {
  constructor(camera) {
    this.camera = camera;

    rotateAroundWorldAxis(this.camera, new THREE.Vector3(1, 0, 0), -55 * THREE.Math.DEG2RAD);
    rotateAroundWorldAxis(this.camera, new THREE.Vector3(0, 1, 0), -90 * THREE.Math.DEG2RAD);
    rotateAroundWorldAxis(this.camera, new THREE.Vector3(0, 0, 1), 0);
  }

  camera() {
    return this.camera;
  }

  update() {
    // this.camera.position.z += 0.01;
    // this.camera.rotation.y += 0.01;
    console.log(this.camera.rotation.y);
  }
}

export default Wc3Control;
