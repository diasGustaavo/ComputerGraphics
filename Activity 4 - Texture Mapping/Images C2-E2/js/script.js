let image = new Image();
// image.src = src_gate;
// image.src = src_checkerboard;
// image.src = logicCover;
// image.src = alvvaysCover;

// ----------- IMAGEM C2 ------------------
/*
image.src = alvvaysCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM D2 ------------------
/*
image.src = alvvaysCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM E2 ------------------
/*
image.src = alvvaysCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 100);
camera.position.z = 1.11;
camera.position.y = 0.73;

scene.add(camera);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas")});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

let geometry = new THREE.BoxGeometry(1, 1, 1);

//----------------------------------------------------------------------------
// Criação das fontes de luz pontuais (uma, mais clara, à frente e outra, 
// mais escura, atrás do cubo).
//----------------------------------------------------------------------------
var point_light = new THREE.PointLight(0xffffff);
point_light.position.set(-10, 15, 20);
scene.add(point_light);

var point_light = new THREE.PointLight(0x666666);
point_light.position.set(10, -10, -10);
scene.add(point_light);

//----------------------------------------------------------------------------
// Criação do material difuso. A textura define a reflectância difusa (k_d) 
// do material.
//----------------------------------------------------------------------------
let material = new THREE.MeshLambertMaterial({
    map: texture
});

var object_mesh = new THREE.Mesh(geometry, material);
var object_mesh2 = new THREE.Mesh(geometry, material);
var object_mesh3 = new THREE.Mesh(geometry, material);
var object_mesh4 = new THREE.Mesh(geometry, material);
var object_mesh5 = new THREE.Mesh(geometry, material);
var object_mesh6 = new THREE.Mesh(geometry, material);
var object_mesh7 = new THREE.Mesh(geometry, material);
var object_mesh8 = new THREE.Mesh(geometry, material);
var object_mesh9 = new THREE.Mesh(geometry, material);
var object_mesh10 = new THREE.Mesh(geometry, material);
var object_mesh11 = new THREE.Mesh(geometry, material);
var object_mesh12 = new THREE.Mesh(geometry, material);
var object_mesh13 = new THREE.Mesh(geometry, material);
var object_mesh14 = new THREE.Mesh(geometry, material);
var object_mesh15 = new THREE.Mesh(geometry, material);
object_mesh2.position.set(0, 0, -1);
object_mesh3.position.set(0, 0, -2);
object_mesh4.position.set(0, 0, -3);
object_mesh5.position.set(0, 0, -4);
object_mesh6.position.set(1, 0, 0);
object_mesh7.position.set(1, 0, -1);
object_mesh8.position.set(1, 0, -2);
object_mesh9.position.set(1, 0, -3);
object_mesh10.position.set(1, 0, -4);
object_mesh11.position.set(-1, 0, -4);
object_mesh12.position.set(-1, 0, -3);
object_mesh13.position.set(-1, 0, -2);
object_mesh14.position.set(-1, 0, -1);
object_mesh15.position.set(-1, 0, 0);
scene.add(object_mesh);
scene.add(object_mesh2);
scene.add(object_mesh3);
scene.add(object_mesh4);
scene.add(object_mesh5);
scene.add(object_mesh6);
scene.add(object_mesh7);
scene.add(object_mesh8);
scene.add(object_mesh9);
scene.add(object_mesh10);
scene.add(object_mesh11);
scene.add(object_mesh12);
scene.add(object_mesh13);
scene.add(object_mesh14);
scene.add(object_mesh15);

function render() {
  requestAnimationFrame(render);
  camera.lookAt(0.0, 1.0, 0.0);
  renderer.render(scene, camera);
}

render();
