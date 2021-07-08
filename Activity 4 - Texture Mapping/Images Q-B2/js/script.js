let image = new Image();
// image.src = src_gate;
// image.src = src_checkerboard;
// image.src = logicCover;
// image.src = alvvaysCover;

// ----------- IMAGEM Q ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM R ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapNearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM S ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM T ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM U ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM V ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapNearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM W ------------------
/*
image.src = logicCover;

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

// ----------- IMAGEM X ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapNearestFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM Y ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM Z ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM A2 ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapLinearFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM B2 ------------------
/*
image.src = logicCover;

texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapNearestFilter;
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
object_mesh2.position.set(0, 0, -1);
object_mesh3.position.set(0, 0, -2);
object_mesh4.position.set(0, 0, -3);
object_mesh5.position.set(0, 0, -4);
scene.add(object_mesh);
scene.add(object_mesh2);
scene.add(object_mesh3);
scene.add(object_mesh4);
scene.add(object_mesh5);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
