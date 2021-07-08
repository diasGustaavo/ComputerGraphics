class Canvas {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext("2d");
    this.clear_color = 'rgba(0,0,0,255)';
  }

  clear() {
    this.context.fillStyle = this.clear_color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  putPixel(x, y, color) {
    this.context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    this.context.fillRect(x, (this.canvas.height - 1) - y, 1, 1);
  }
}

class Pixel {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

// Cria um color buffer para armazenar a imagem final.
let color_buffer = new Canvas("canvas");
color_buffer.clear();

/******************************************************************************
 * Vértices do modelo (cubo) centralizado no seu espaco do objeto. Os dois
 * vértices extremos do cubo são (-1,-1,-1) e (1,1,1), logo, cada aresta do cubo
 * tem comprimento igual a 2.
 *****************************************************************************/
//                                   X     Y     Z    W (coord. homogênea)
let vertices = [new THREE.Vector4(-1.0, -1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0, -1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0, -1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0, -1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0,  1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0,  1.0, -1.0, 1.0),
                new THREE.Vector4( 1.0,  1.0,  1.0, 1.0),
                new THREE.Vector4(-1.0,  1.0,  1.0, 1.0)];

/******************************************************************************
 * As 12 arestas do cubo, indicadas através dos índices dos seus vértices.
 *****************************************************************************/
let edges = [[0,1],
             [1,2],
             [2,3],
             [3,0],
             [4,5],
             [5,6],
             [6,7],
             [7,4],
             [0,4],
             [1,5],
             [2,6],
             [3,7]];

/******************************************************************************
 * Matriz Model (modelagem): Esp. Objeto --> Esp. Universo. 
 * OBS: A matriz está carregada inicialmente com a identidade.
 *****************************************************************************/
let m_model = new THREE.Matrix4();

// MATRIZ MODEL INICIAL
m_model.set(1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0);

// APLICANDO MATRIZES DE ROTACAO

// ROTACAO EM X
let X_m_rotation = new THREE.Matrix4();
tetaX = 0.0

X_m_rotation.set(1.0, 0.0              , 0.0               , 0.0,
                 0.0, Math.cos(tetaX)  , -(Math.sin(tetaX)), 0.0,
                 0.0, Math.sin(tetaX)  , Math.cos(tetaX)   , 0.0,
                 0.0, 0.0              , 0.0               , 1.0);

m_model.multiply(X_m_rotation)

// ROTACAO EM Y
let Y_m_rotation = new THREE.Matrix4();
tetaY = 0.0

Y_m_rotation.set(Math.cos(tetaY)   , 0.0, Math.sin(tetaY), 0.0,
                 0.0               , 1.0, 0.0            , 0.0,
                 -(Math.sin(tetaY)), 0.0, Math.cos(tetaY), 0.0,
                 0.0               , 0.0, 0.0            , 1.0);

m_model.multiply(Y_m_rotation)

// ROTACAO EM Z
let Z_m_rotation = new THREE.Matrix4();
tetaZ = 0.0

Z_m_rotation.set(Math.cos(tetaZ), -(Math.sin(tetaZ)), 0.0, 0.0,
                 Math.sin(tetaZ), Math.cos(tetaZ)   , 0.0, 0.0,
                 0.0            , 0.0               , 1.0, 0.0,
                 0.0            , 0.0               , 0.0, 1.0);

m_model.multiply(Z_m_rotation)

// MATRIZ DE ESCALA
let m_scale = new THREE.Matrix4();
let Sx = 1.0
let Sy = 1.0
let Sz = 1.0

m_scale.set(Sx, 0.0, 0.0, 0.0,
            0.0, Sy, 0.0, 0.0,
            0.0, 0.0, Sz, 0.0,
            0.0, 0.0, 0.0, 1.0);

m_model.multiply(m_scale)

// MATRIZ DE TRANSLACAO
let m_translation = new THREE.Matrix4();
let Dx = 0.0
let Dy = 0.0
let Dz = 0.0

m_translation.set(1.0, 0.0, 0.0, Dx,
                  0.0, 1.0, 0.0, Dy,
                  0.0, 0.0, 1.0, Dz,
                  0.0, 0.0, 0.0, 1.0);

m_model.multiply(m_translation)

for (let i = 0; i < 8; ++i)
    vertices[i].applyMatrix4(m_model);

/******************************************************************************
 * Parâmetros da camera sintética.
 *****************************************************************************/
let cam_pos = new THREE.Vector3(1.3,1.7,2.0);     // posição da câmera no esp. do Universo.
let cam_look_at = new THREE.Vector3(0.0,0.0,0.0); // ponto para o qual a câmera aponta.
let cam_up = new THREE.Vector3(0.0,1.0,0.0);      // vetor Up da câmera.

/******************************************************************************
 * Matriz View (visualização): Esp. Universo --> Esp. Câmera
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

  // Derivar os vetores da base da câmera a partir dos parâmetros informados acima.
  
  // Zcam corresponde a (cam_look_at - cam_pos) * -1 normalizado
  Zcam = cam_look_at.clone().sub(cam_pos).multiplyScalar(-1).normalize()
   
  // Xcam corresponde ao cross product de cam_up por Zcam
  Xcam = cam_up.clone().cross(Zcam.clone()).normalize()
  
  // Ycam corresponde ao cross product de Zcam por Xcam
  Ycam = Zcam.clone().cross(Xcam.clone()).normalize()

  // Construir 'm_bt', a inversa da matriz de base da câmera.
  let m_bt = new THREE.Matrix4();

  m_bt.set(Xcam.x, Xcam.y, Xcam.z, 0.0,
           Ycam.x, Ycam.y, Ycam.z, 0.0,
           Zcam.x, Zcam.y, Zcam.z, 0.0,
           0.0, 0.0, 0.0, 1.0);

  // Construir a matriz 'm_t' de translação para tratar os casos em que as
  // origens do espaço do universo e da câmera não coincidem.
  let m_t = new THREE.Matrix4();

  m_t.set(1.0, 0.0, 0.0, -cam_pos.x,
          0.0, 1.0, 0.0, -cam_pos.y,
          0.0, 0.0, 1.0, -cam_pos.z,
          0.0, 0.0, 0.0, 1.0);

  // Constrói a matriz de visualização 'm_view' como o produto
  //  de 'm_bt' e 'm_t'.
  let m_view = m_bt.clone().multiply(m_t);
  
  for (let i = 0; i < 8; ++i)
      vertices[i].applyMatrix4(m_view);

/******************************************************************************
 * Matriz de Projecao: Esp. Câmera --> Esp. Recorte
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

  let m_projection = new THREE.Matrix4();

  // d e matriz de projecao dados na descricao do exercicio
  let d = 1.0;
  m_projection.set(1.0, 0.0, 0.0, 0.0,
                   0.0, 1.0, 0.0, 0.0,
                   0.0, 0.0, 1.0, d,
                   0.0, 0.0, -1.0/d, 0.0);
  
  for (let i = 0; i < 8; ++i)
      vertices[i].applyMatrix4(m_projection);

/******************************************************************************
 * Homogeneizacao (divisao por W): Esp. Recorte --> Esp. Canônico
 *****************************************************************************/
  
  for (let i = 0; i < 8; ++i) {
      vertices[i].divideScalar(vertices[i].w);
  }

/******************************************************************************
 * Matriz Viewport: Esp. Canônico --> Esp. Tela
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

  let m_viewport = new THREE.Matrix4();
  let m_T = new THREE.Matrix4();
  let m_S = new THREE.Matrix4();

  // Matriz de escala
  m_S.set(64, 0.0, 0.0, 0.0,
          0.0, 64, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0);

  // Matriz de translacao        
  m_T.set(1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0);

  // Multiplica a matriz de translacao e escala e joga no m_viewport
  m_viewport = m_S.clone().multiply(m_T);
  
  for (let i = 0; i < 8; ++i)
    vertices[i].applyMatrix4(m_viewport);
  
/******************************************************************************
 * Rasterização
 *****************************************************************************/
  function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1) {
	
    dx = x1 - x0;
    dy = y1 - y0;
    M = dy/dx;
	
    dr = (color_1[0] - color_0[0])/dx
    dg = (color_1[1] - color_0[1])/dx
    db = (color_1[2] - color_0[2])/dx
        
    // Se modulo dy > dx, a variacao de cores eh maior
    if(Math.abs(dx) < Math.abs(dy)){
        dr = (color_1[0] - color_0[0])/dy
        dg = (color_1[1] - color_0[1])/dy
        db = (color_1[2] - color_0[2])/dy
    }
    
    // SEGUNDO OU SEXTO OCTANTE
    if (M > 1) {
        // SEGUNDO OCTANTE
        if (y0 < y1) {
            dx = y1 - y0
            dy = x1 - x0
            d = 2 * dy - dx
            inc_L = 2 * dy
            inc_NE = 2 * (dy - dx)
            x = x0
            y = y0
			
			
            color_buffer.putPixel(x, y, color_0); 

            while (y < y1) {
                if (d <= 0) {
                    d += inc_L
                    y++
                }
                else {
                    d += inc_NE
                    x++
                    y++
                }

                color_0[0] = color_0[0] + dr
                color_0[1] = color_0[1] + dg
                color_0[2] = color_0[2] + db
                    
                color_buffer.putPixel(x, y, color_0)
            }
        }
        // SEXTO OCTANTE
        else {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
        }
      }
      // PRIMEIRO OU QUINTO OCTANTE
      else if ((0<=M) && (M<=1)) {
          //	QUINTO OCTANTE
          if (x0 > x1) {
              MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
          }
          //	PRIMEIRO OCTANTE
          else {
              dx = x1 - x0
              dy = y1 - y0
              d = 2 * dy - dx
              inc_L = 2 * dy
              inc_NE = 2 * (dy - dx)
              x = x0
              y = y0

              color_buffer.putPixel(x, y, color_0) 

              while (x < x1) {
                  if (d <= 0) {
            d += inc_L
            x++
                  }
                  else {
            d += inc_NE
            x++
            y++
                  }

                  color_0[0] = color_0[0] + dr;
                  color_0[1] = color_0[1] + dg;
                  color_0[2] = color_0[2] + db;

                  color_buffer.putPixel(x, y, color_0)
              }
          }
      }
    // QUARTO OU OITAVO OCTANTE
      else if((0 > M) && (M >= -1)){
      // QUARTO OCTANTE
          if ((x0 > x1) && (y0 < y1)){
              MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
          }
          // OITAVO OCTANTE
          else{
              dx = x1 - x0
              dy = y1 - y0
              d = 2 * dy + dx
              inc_L = 2 * dy
              inc_NE = 2 * (dy + dx)
              x = x0
              y = y0

              color_buffer.putPixel(x, y, color_0) 

              while (x < x1) {
                  if (d > 0) {
                      d += inc_L
                      x++
                  }
                  else {
                      d += inc_NE
                      x++
                      y--
                  }

                  color_0[0] = color_0[0] + dr;
                  color_0[1] = color_0[1] + dg;
                  color_0[2] = color_0[2] + db;

                  color_buffer.putPixel(x, y, color_0)
              }
          }
      }
    // TERCEIRO OU SETIMO OCTANTE
      else if(-1 > M){
      // TERCEIRO OCTANTE
          if ((x0 > x1) && (y0 < y1)){
              MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
          }
          // SETIMO OCTANTE
          else{
              aux = y0;
              y0 = x0;
              x0 = aux;
              aux = y1;
              y1 = x1;
              x1 = aux;
              dx = x1 - x0;
              dy = y1 - y0;
              D = 2 * dy + dx;
              inc_L = 2 * dy;
              inc_SE = 2 * (dy + dx);
              x = x0;
              y = y0;

              color_buffer.putPixel(y, x, color_0)

              while (x > x1) {
                  if (D < 0){
                      D += inc_L;
                      x--;
                  }
                  else{
                      D += inc_SE;
                      x--;
                      y++;
                  }

                  color_0[0] = color_0[0] - dr;
                  color_0[1] = color_0[1] - dg;
                  color_0[2] = color_0[2] - db;

                  color_buffer.putPixel(y, x, color_0)
              }
          } 
      }
  }
  
  // ARESTAS DE CIMA
  MidPointLineAlgorithm(vertices[7].x, vertices[7].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[6].x, vertices[6].y, vertices[5].x, vertices[5].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[5].x, vertices[5].y, vertices[4].x, vertices[4].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[4].x, vertices[4].y, vertices[7].x, vertices[7].y, [255, 0, 0], [255, 0, 0])
  
  // ARESTAS DE BAIXO
  MidPointLineAlgorithm(vertices[3].x, vertices[3].y, vertices[2].x, vertices[2].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[2].x, vertices[2].y, vertices[1].x, vertices[1].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[1].x, vertices[1].y, vertices[0].x, vertices[0].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[0].x, vertices[0].y, vertices[3].x, vertices[3].y, [255, 0, 0], [255, 0, 0])
  
  // ARESTAS DO MEIO
  MidPointLineAlgorithm(vertices[7].x, vertices[7].y, vertices[3].x, vertices[3].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[6].x, vertices[6].y, vertices[2].x, vertices[2].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[5].x, vertices[5].y, vertices[1].x, vertices[1].y, [255, 0, 0], [255, 0, 0])
  MidPointLineAlgorithm(vertices[4].x, vertices[4].y, vertices[0].x, vertices[0].y, [255, 0, 0], [255, 0, 0])