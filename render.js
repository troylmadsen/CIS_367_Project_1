/**
 * Created by Troy Madsen & Brendon Murthum
 */
let canvas;
let gl;
let allObjs = [];

let projUnif;
let projMat, viewMat;

let scale = 0.05;

let OBJ_CONSOLE;
let OBJ_JOYSTICK;
let OBJ_BLINKY;

let CAMERA_VIEW = mat4.fromValues(
    0.9999695420265198, 0.0036164866760373116, -0.00727407680824399, 0,
    -0.007842056453227997, 0.66341632604599, -0.748216450214386 ,  0,
    0.0021192755084484816, 0.7482462525367737, 0.663423478603363, 0,
    -0.09816265106201172, -0.9200894832611084, -7.7578864097595215,  1);

function main() {
    canvas = document.getElementById("my-canvas");

    setupHandlers();

    /* Setup window resize listener. */
    window.addEventListener('resize', resizeWindow);

    gl = WebGLUtils.create3DContext(canvas, null);
    ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
        .then (prog => {

            /* Put all one-time initialization logic here. */
            gl.useProgram (prog);
            gl.clearColor (0, 0, 0, 1);
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            gl.cullFace(gl.BACK);

            /* Vertex shader defines TWO attribute vars and ONE uniform var */
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
                vec3.fromValues (0.2, -.5, 1.2),    // Eye Coordinate
                vec3.fromValues (0, 0, 0.1),        // Gaze Point
                vec3.fromValues (0, 0, 1)           // Z is Up
            );
            mat4.copy(viewMat, CAMERA_VIEW); // Set camera starting position
            gl.uniformMatrix4fv (viewUnif, false, viewMat);

            /* Recalculate New Viewport. */
            resizeWindow();

            /* Create the objects. */
            createObjects();

            /* Initiate the Render Request. */
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

    let console = new GameConsole(gl, {
        scale: scale
    });

    OBJ_CONSOLE = console;
    OBJ_JOYSTICK = console.group[6];
    OBJ_BLINKY = console.group[0].group[2];

    allObjs.push(console);
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
    
    // For a variety of optional objects to be moved. Uses the top menu.
    let ddl = document.getElementById("whichObject");
    let selectedValue = ddl.options[ddl.selectedIndex].value;

    // Print the current camera location
    if (key === 90) {
        console.log("View Matrix: ", viewMat[0], ", ", viewMat[1], ",\n",
            viewMat[2], ", ", viewMat[3], ",\n",
            viewMat[4], ", ", viewMat[5], ",\n",
            viewMat[6], ", ", viewMat[7], ",\n",
            viewMat[8], ", ", viewMat[9], ",\n",
            viewMat[10], ", ", viewMat[11], ",\n",
            viewMat[12], ", ", viewMat[13], ",\n",
            viewMat[14], ", ", viewMat[15], "\n");
    }

    // none is selected for free move
    else if (selectedValue === "none") {
        // With the camera selected, the arrow keys and the "WASD" keys allow
        // the user to move the camera.
        switch (key) {
            case 87: // W
                trans[14] = trans[14] + speed;
                mat4.multiply(viewMat, trans, viewMat);
                break;
            case 65: // A
                deg = -1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0,
                    Math.sin(glMatrix.toRadian(deg)), 0,
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
            case 83: // S
                trans[14] = trans[14] - speed;
                mat4.multiply(viewMat, trans, viewMat);
                break;
            case 68: // D
                deg = 1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0,
                    Math.sin(glMatrix.toRadian(deg)), 0,
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
            case 38: // UP
                deg = -1;
                rot = mat4.fromValues(1, 0, 0, 0, 0,
                    Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
            case 37: // LEFT
                deg = -1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)),
                    0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
            case 40: // DOWN
                deg = 1;
                rot = mat4.fromValues(1, 0, 0, 0, 0,
                    Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
            case 39: // RIGHT
                deg = 1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)),
                    0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                mat4.multiply(viewMat, rot, viewMat);
                break;
        }
    }
    
    // If camera is selected to move. 
    else if (selectedValue === "console") {
        
        // With the camera selected, the arrow keys and the "WASD" keys allow
        // the user to move the camera.
        switch (key) {
            case 87: // W
                trans[13] = trans[13] + speed;
                mat4.multiply(OBJ_CONSOLE.coordFrame, trans, OBJ_CONSOLE.coordFrame);
                break;
            case 65: // A
                deg = -1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)),
                    0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
            case 83: // S
                trans[13] = trans[13] - speed;
                mat4.multiply(OBJ_CONSOLE.coordFrame, trans, OBJ_CONSOLE.coordFrame);
                break;
            case 68: // D
                deg = 1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    Math.sin(glMatrix.toRadian(deg)), 0, 0,
                    -1 * Math.sin(glMatrix.toRadian(deg)),
                    Math.cos(glMatrix.toRadian(deg)),
                    0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
            case 38: // UP
                deg = -1;
                rot = mat4.fromValues(1, 0, 0, 0, 0, 
                    Math.cos(glMatrix.toRadian(deg)), 
                    Math.sin(glMatrix.toRadian(deg)), 0, 0, 
                    -1 * Math.sin(glMatrix.toRadian(deg)), 
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
            case 37: // LEFT
                deg = -1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0,
                    Math.sin(glMatrix.toRadian(deg)), 0,
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
            case 40: // DOWN
                deg = 1;
                rot = mat4.fromValues(1, 0, 0, 0, 0, 
                    Math.cos(glMatrix.toRadian(deg)), 
                    Math.sin(glMatrix.toRadian(deg)), 0, 0, 
                    -1 * Math.sin(glMatrix.toRadian(deg)), 
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                    mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
            case 39: // RIGHT
                deg = 1;
                rot = mat4.fromValues(Math.cos(glMatrix.toRadian(deg)),
                    0, -1 * Math.sin(glMatrix.toRadian(deg)), 0, 0, 1, 0, 0,
                    Math.sin(glMatrix.toRadian(deg)), 0,
                    Math.cos(glMatrix.toRadian(deg)), 0, 0, 0, 0, 1);
                mat4.multiply(OBJ_CONSOLE.coordFrame, rot, OBJ_CONSOLE.coordFrame);
                break;
        }
    
    // If Pacman is selected to move.
    } else if (selectedValue === "pacman") {
        
        // When selected, arrow keys move this character up, down, left, right
        // within the Pacman game screen.
        switch (key) {
            case 38: // UP
                // TODO - move the character up one unit.
                break;
            case 40: // DOWN
                // TODO - move the character down one unit.
                break;
            case 37: // LEFT
                // TODO - move the character left one unit.
                break;
            case 39: // RIGHT
                // TODO - move the character right one unit. 
                break;
        }
    
    // If Blinky is selected to move.
    } else if (selectedValue === "blinky") {
    
        // When selected, arrow keys move this character up, down, left, right
        // within the Pacman game screen.
        switch (key) {
            case 38: // UP
                // TODO - move the character up one unit.
                break;
            case 40: // DOWN
                // TODO - move the character down one unit.
                break;
            case 37: // LEFT
                // TODO - move the character left one unit.
                break;
            case 39: // RIGHT
                // TODO - move the character right one unit. 
                break;
        }
    }

    window.requestAnimFrame(drawScene);
}

function handleSelect(event) {
    console.log("select");

    // For a variety of optional objects to be moved. Uses the top menu.
    let ddl = document.getElementById("whichObject");
    let selectedValue = ddl.options[ddl.selectedIndex].value;

    console.log(selectedValue);

    if (selectedValue === "none") {
        mat4.copy(viewMat, CAMERA_VIEW);
        mat4.copy(OBJ_CONSOLE.coordFrame, mat4.create());
    }
    else if (selectedValue === "camera") {
        mat4.copy(viewMat, CAMERA_VIEW);
    }
    else {

    }

    window.requestAnimFrame(drawScene);
}

/* Sets up the handlers for inputs. */
function setupHandlers() {
    // Add listener for moving triangle with arrow keys.
    window.addEventListener('keydown', handleClick);

    // Setup window resize listener.
    window.addEventListener('resize', resizeWindow);

    // Add listener for select object
    document.getElementById("whichObject").addEventListener("change", handleSelect);
}
