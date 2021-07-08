let image = new Image();
// image.src = src_gate;
// image.src = src_checkerboard;
// image.src = logicCover;
// image.src = alvvaysCover;

texture = new THREE.Texture(image);

// ----------- IMAGEM C ------------------
/*
image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM D ------------------
/*
image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM E + G ------------------
/*
image.src = logicCover;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM F + H ------------------
/*
image.src = logicCover;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM M ------------------
/*
image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM N ------------------
/*
image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipmapNearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM O ------------------
/*
image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};
*/

// ----------- IMAGEM P ------------------

image.src = src_checkerboard;

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestMipmapNearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};


let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 100);
camera.position.z = 1.3;
camera.position.y = 0.59;

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
scene.add(object_mesh);

function render() {
  requestAnimationFrame(render);
  // camera.lookAt(0.0, 1.0, 0.0);
  renderer.render(scene, camera);
}

render();
