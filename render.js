/**
 * Created by Troy Madsen
 */
let canvas;
let gl;
let allObjs = [];

let projUnif;
let projMat, viewMat;

let scale = 0.05;

function main() {
    canvas = document.getElementById("my-canvas");

    setupHandlers();

    /* setup window resize listener */
    window.addEventListener('resize', resizeWindow);

    gl = WebGLUtils.create3DContext(canvas, null);
    ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
        .then (prog => {

            /* put all one-time initialization logic here */
            gl.useProgram (prog);
            gl.clearColor (0, 0, 0, 1);
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            gl.cullFace(gl.BACK);

            /* the vertex shader defines TWO attribute vars and ONE uniform var */
            let posAttr = gl.getAttribLocation (prog, "vertexPos");
            let colAttr = gl.getAttribLocation (prog, "vertexCol");
            Object3D.linkShaderAttrib({
                positionAttr: posAttr,
                colorAttr: colAttr
            });
            let modelUnif = gl.getUniformLocation (prog, "modelCF");
            projUnif = gl.getUniformLocation (prog, "projection");
            viewUnif = gl.getUniformLocation (prog, "view");
            Object3D.linkShaderUniform({
                projection: projUnif,
                view: viewUnif,
                model: modelUnif
            });
            gl.enableVertexAttribArray (posAttr);
            gl.enableVertexAttribArray (colAttr);
            projMat = mat4.create();
            gl.uniformMatrix4fv (projUnif, false, projMat);
            viewMat = mat4.lookAt(mat4.create(),
                vec3.fromValues (0, -4, 0),  // eye coord
                vec3.fromValues (0, 0, 0),  // gaze point
                vec3.fromValues (0, 0, 1)   // Z is up
            );
            gl.uniformMatrix4fv (viewUnif, false, viewMat);

            /* recalculate new viewport */
            resizeWindow();

            createObjects();

            /* initiate the render request */
            window.requestAnimFrame(drawScene);
        });
}

function drawScene() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    // Update view matrix
    gl.uniformMatrix4fv (viewUnif, false, viewMat);

    /* drawing all objects to the screen */
    for (let k = 0; k < allObjs.length; k++) {
        allObjs[k].draw(gl);
    }
}

function createObjects() {
    let maze = new Maze(gl, {
        radius: scale
    });

    let pacman = new PacMan(gl, {
        radius: scale
    });

    let blinky = new Ghost(gl, {
        radius: scale,
        numTails: 4,
        color: vec3.fromValues(208/255, 62/255, 25/255)
    });
    mat4.translate(blinky.coordFrame, blinky.coordFrame,
        maze.getMazeVec3(4, 2));

    let pinky = new Ghost(gl, {
        radius: scale,
        numTails: 3,
        color: vec3.fromValues(234/255, 130/255, 229/255)
    });
    mat4.translate(pinky.coordFrame, pinky.coordFrame,
        maze.getMazeVec3(4, 3));

    let inky = new Ghost(gl, {
        radius: scale,
        numTails: 4,
        color: vec3.fromValues(70/255, 191/255, 238/255)
    });
    mat4.translate(inky.coordFrame, inky.coordFrame,
        maze.getMazeVec3(4, 4));

    let clyde = new Ghost(gl, {
        radius: scale,
        numTails: 3,
        color: vec3.fromValues(219/255, 133/255, 28/255)
    });
    mat4.translate(clyde.coordFrame, clyde.coordFrame,
        maze.getMazeVec3(4, 5));

    allObjs.push(maze, blinky, pinky, inky, clyde);


    // allObjs.push(pacman);
}

function resizeWindow() {
    let w = window.innerWidth - 16;
    let h = 0.75 * window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    mat4.perspective (projMat, glMatrix.toRadian(60), w/h, 0.05, 20);
    gl.uniformMatrix4fv (projUnif, false, projMat);
    gl.viewport(0, 0, w, h);
}

function handleClick(event) {
    let key = event.keyCode;

    let trans = mat4.create();
    let speed = 0.1;
    let rot;
    let deg;
    switch (key) {
        case 87: // W
            trans[14] = trans[14] + speed;
            mat4.multiply(viewMat, trans, viewMat);
            break;

        case 65: // A
            deg = -1;
            rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)), 0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0, Math.sin(glMatrix.toRadian(deg)), 0, Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 83: // S
            trans[14] = trans[14] - speed;
            mat4.multiply(viewMat, trans, viewMat);
            break;

        case 68: // D
            deg = 1;
            rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)), 0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0, Math.sin(glMatrix.toRadian(deg)), 0, Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 38: // UP
            deg = -1;
            rot = mat4.fromValues(1, 0, 0, 0, 0, Math.cos(glMatrix.toRadian(deg)), Math.sin(glMatrix.toRadian(deg)), 0, 0, -1 * Math.sin(glMatrix.toRadian(deg)), Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 37: // LEFT
            deg = -1;
            rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)), Math.sin(glMatrix.toRadian(deg)), 0, 0, -1 * Math.sin(glMatrix.toRadian(deg)), Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 40: // DOWN
            deg = 1;
            rot = mat4.fromValues(1, 0, 0, 0, 0, Math.cos(glMatrix.toRadian(deg)), Math.sin(glMatrix.toRadian(deg)), 0, 0, -1 * Math.sin(glMatrix.toRadian(deg)), Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 39: // RIGHT
            deg = 1;
            rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)), Math.sin(glMatrix.toRadian(deg)), 0, 0, -1 * Math.sin(glMatrix.toRadian(deg)), Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            mat4.multiply(viewMat, rot, viewMat);
            break;

        case 32: // SPACE
            // console.log(viewMat);
            break;
    }

    window.requestAnimFrame(drawScene);
}

/**
 * Sets up the handlers for inputs
 */
function setupHandlers() {
    // Add listener for moving triangle with arrow keys
    window.addEventListener('keydown', handleClick);

    /* setup window resize listener */
    window.addEventListener('resize', resizeWindow);
}