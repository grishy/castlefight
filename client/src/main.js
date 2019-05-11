
import w from './wc3Control'

window.addEventListener('DOMContentLoaded', () => {
  new w();
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
    sphere.position.y = 1;
    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
});
