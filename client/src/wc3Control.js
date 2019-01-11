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

// The four arrow keys
const KEYS = {
  LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40,
};

const OFFSET = 0.03; // %
const SPEED_KEY = 1;
const SPEED_MOUSE = 0.5;

class Wc3Control {
  constructor(camera) {
    this.camera = camera;

    // TODO: Изменить на более простое изменение угла в моровом пространстве.
    rotateAroundWorldAxis(this.camera, new THREE.Vector3(1, 0, 0), -55 * THREE.Math.DEG2RAD);
    rotateAroundWorldAxis(this.camera, new THREE.Vector3(0, 1, 0), -90 * THREE.Math.DEG2RAD);
    rotateAroundWorldAxis(this.camera, new THREE.Vector3(0, 0, 1), 0);

    this.mouseX = null;
    this.mouseY = null;

    window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  camera() {
    return this.camera;
  }

  update() {
    const widthOffset = window.innerWidth * OFFSET;
    const heightOffset = window.innerHeight * OFFSET;

    if (this.mouseX <= widthOffset) {
      this.camera.position.z -= SPEED_MOUSE;
    } else if (this.mouseX >= window.innerWidth - widthOffset) {
      this.camera.position.z += SPEED_MOUSE;
    }

    if (this.mouseY <= heightOffset) {
      this.camera.position.x += SPEED_MOUSE;
    } else if (this.mouseY >= window.innerHeight - heightOffset) {
      this.camera.position.x -= SPEED_MOUSE;
    }
  }

  onKeyDown(event) {
    // console.log('handleKeyDown', event);

    switch (event.keyCode) {
      case KEYS.UP:
        this.camera.position.x += SPEED_KEY;
        break;

      case KEYS.BOTTOM:
        this.camera.position.x -= SPEED_KEY;
        break;

      case KEYS.LEFT:
        this.camera.position.z -= SPEED_KEY;
        break;

      case KEYS.RIGHT:
        this.camera.position.z += SPEED_KEY;
        break;
    }
  }

  onMouseMove(event) {
    // console.log('handleMouseMove', event);

    this.mouseX = event.x;
    this.mouseY = event.y;
  }
}

export default Wc3Control;
