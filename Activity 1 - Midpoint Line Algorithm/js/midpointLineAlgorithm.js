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

let color_buffer = new Canvas("canvas");
color_buffer.clear();

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

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {
	MidPointLineAlgorithm(x0, y0, x2, y2, color_0.slice(), color_2.slice())
    MidPointLineAlgorithm(x2, y2, x1, y1, color_2.slice(), color_1.slice())
	MidPointLineAlgorithm(x1, y1, x0, y0, color_1.slice(), color_0.slice())
}

MidPointLineAlgorithm(64, 64, 127, 64, [255, 140, 0, 255], [255, 0, 0, 255])
MidPointLineAlgorithm(64, 64, 127, 95, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 127, 127, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 95, 127, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 64, 127, [255, 140, 0, 255], [255, 0, 0, 255])

MidPointLineAlgorithm(64, 64, 32, 127, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 1, 127, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 0, 95, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 0, 64, [255, 140, 0, 255], [255, 0, 0, 255])

MidPointLineAlgorithm(64, 64, 0, 32, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 0, 0, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 32, 0, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 64, 0, [255, 140, 0, 255], [255, 0, 0, 255])

MidPointLineAlgorithm(64, 64, 96, 0, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 128, 0, [255, 140, 0, 255], [0, 255, 0, 255])
MidPointLineAlgorithm(64, 64, 127, 32, [255, 140, 0, 255], [0, 255, 0, 255])

DrawTriangle(25, 30, 50, 100, 100, 15, [255,0,0,255], [0,0,255,255], [0,255,0,255]);