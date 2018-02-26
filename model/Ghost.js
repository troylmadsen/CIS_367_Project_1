/**
 * Troy Madsen
 */
class Ghost extends ObjectGroup {

    /**
     * Create a ghost of specified color with body as the center
     *
     * @param gl {Object} gl      the current WebGL context
     * @param props props with the following keys
     *    required : radius (body radius), numTails (tails hanging below ghost)
     *    optional: color
     */
    constructor(gl, props) {
        super(gl);

        let head = new Sphere(gl, {
            radius: props.radius,
            splitDepth: 5,
            northColor: vec3.fromValues(props.color[0] * 1.0, props.color[1] * 1.0, props.color[2] * 1.0),
            equatorColor: vec3.fromValues(props.color[0] * 0.95, props.color[1] * 0.95, props.color[2] * 0.95),
            southColor: vec3.fromValues(props.color[0] * 0.9, props.color[1] * 0.9, props.color[2] * 0.9)
        });
        mat4.translate(head.coordFrame, head.coordFrame,
            vec3.fromValues(0, 0, 0.5 * props.radius));
        this.group.push(head);

        let leftEyeWhite = new Sphere (gl, {
            radius: props.radius / 4,
            splitDepth: 5,
            northColor: vec3.fromValues(1.0, 1.0, 1.0),
            equatorColor: vec3.fromValues(1.0, 1.0, 1.0),
            southColor: vec3.fromValues(1.0, 1.0, 1.0)
        });
        mat4.translate(leftEyeWhite.coordFrame, leftEyeWhite.coordFrame,
            vec3.fromValues(0, 0, 0.5 * props.radius));
        mat4.rotateZ(leftEyeWhite.coordFrame, leftEyeWhite.coordFrame,
            glMatrix.toRadian(20));
        mat4.translate(leftEyeWhite.coordFrame, leftEyeWhite.coordFrame,
            vec3.fromValues(props.radius - props.radius / 8, 0, 0));
        this.group.push(leftEyeWhite);

        let leftEyePupil = new Sphere(gl, {
            radius: props.radius / 8,
            splitDepth: 5,
            northColor: vec3.fromValues(40.8/255, 46.3/255, 100.6/255),
            equatorColor: vec3.fromValues(40.8/255, 46.3/255, 150.6/255),
            southColor: vec3.fromValues(40.8/255, 46.3/255, 100.6/255)
        });
        mat4.copy(leftEyePupil.coordFrame, leftEyeWhite.coordFrame);
        mat4.translate(leftEyePupil.coordFrame, leftEyePupil.coordFrame,
            vec3.fromValues(props.radius / 8 + props.radius / 32, 0, 0));
        this.group.push(leftEyePupil);

        let rightEyeWhite = new Sphere (gl, {
            radius: props.radius / 4,
            splitDepth: 5,
            northColor: vec3.fromValues(1.0, 1.0, 1.0),
            equatorColor: vec3.fromValues(1.0, 1.0, 1.0),
            southColor: vec3.fromValues(1.0, 1.0, 1.0)
        });
        mat4.translate(rightEyeWhite.coordFrame, rightEyeWhite.coordFrame,
            vec3.fromValues(0, 0, 0.5 * props.radius));
        mat4.rotateZ(rightEyeWhite.coordFrame, rightEyeWhite.coordFrame,
            glMatrix.toRadian(-20));
        mat4.translate(rightEyeWhite.coordFrame, rightEyeWhite.coordFrame,
            vec3.fromValues(props.radius - props.radius / 8, 0, 0));
        this.group.push(rightEyeWhite);

        let rightEyePupil = new Sphere(gl, {
            radius: props.radius / 8,
            splitDepth: 5,
            northColor: vec3.fromValues(40.8/255, 46.3/255, 100.6/255),
            equatorColor: vec3.fromValues(40.8/255, 46.3/255, 150.6/255),
            southColor: vec3.fromValues(40.8/255, 46.3/255, 100.6/255)
        });
        mat4.copy(rightEyePupil.coordFrame, rightEyeWhite.coordFrame);
        mat4.translate(rightEyePupil.coordFrame, rightEyePupil.coordFrame,
            vec3.fromValues(props.radius / 8 + props.radius / 32, 0, 0));
        this.group.push(rightEyePupil);

        let body = new PolygonalPrism(gl, {
            topRadius: props.radius,
            bottomRadius: props.radius,
            numSides: 20,
            height: props.radius,
            topColor: vec3.fromValues(props.color[0] * 0.95, props.color[1] * 0.95, props.color[2] * 0.95),
            bottomColor: vec3.fromValues(props.color[0] * 0.8, props.color[1] * 0.8, props.color[2] * 0.8)
        });
        mat4.translate(body.coordFrame, body.coordFrame,
            vec3.fromValues(0, 0, -0.5 * props.radius));
        this.group.push(body);

        //  Adding tails
        if (props.numTails % 2 === 0) {
            // Blinky and Inky

            // Straight tails
            for (let i = 0; i < 4; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    baseColor: vec3.fromValues(props.color[0] * 0.8, props.color[1] * 0.8, props.color[2] * 0.8),
                    tipColor: vec3.fromValues(props.color[0] * 0.7, props.color[1] * 0.7, props.color[2] * 0.7)
                });
                mat4.rotateX(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(180));
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(45 + i * 90));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                this.group.push(tail);
            }

            // Left sheared tails
            let shearMat = mat4.create();
            shearMat[9] = Math.tan(glMatrix.toRadian(45));
            for (let i = 0; i < 4; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    baseColor: vec3.fromValues(props.color[0] * 0.8, props.color[1] * 0.8, props.color[2] * 0.8),
                    tipColor: vec3.fromValues(props.color[0] * 0.7, props.color[1] * 0.7, props.color[2] * 0.7)
                });
                mat4.rotateX(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(180));
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(60 + i * 90));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                mat4.multiply(tail.coordFrame, tail.coordFrame, shearMat);
                this.group.push(tail);
            }

            // Right sheared tails
            shearMat[9] = Math.tan(glMatrix.toRadian(-45));
            for (let i = 0; i < 4; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    baseColor: vec3.fromValues(props.color[0] * 0.8, props.color[1] * 0.8, props.color[2] * 0.8),
                    tipColor: vec3.fromValues(props.color[0] * 0.7, props.color[1] * 0.7, props.color[2] * 0.7)
                });
                mat4.rotateX(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(180));
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(30 + i * 90));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                mat4.multiply(tail.coordFrame, tail.coordFrame, shearMat);
                this.group.push(tail);
            }

        } else {
            // Pinky and Clyde

            // Straight tails
            for (let i = 0; i < 8; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    baseColor: vec3.fromValues(props.color[0] * 0.8, props.color[1] * 0.8, props.color[2] * 0.8),
                    tipColor: vec3.fromValues(props.color[0] * 0.7, props.color[1] * 0.7, props.color[2] * 0.7)
                });
                mat4.rotateX(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(180));
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(i * 45));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                this.group.push(tail);
            }

        }

        // Rotating to face camera
        mat4.rotateZ(this.coordFrame, this.coordFrame,
            glMatrix.toRadian(-90));
    }
}