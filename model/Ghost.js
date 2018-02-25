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
        let tmpMat = mat4.create();

        let body = new PolygonalPrism(gl, {
            topRadius: props.radius,
            bottomRadius: props.radius,
            numSides: 20,
            height: props.radius,
            topColor: props.color,
            bottomColor: props.color
        });
        mat4.translate(body.coordFrame, body.coordFrame,
            vec3.fromValues(0, 0, -0.5 * props.radius));

        let head = new Sphere(gl, {
            radius: props.radius,
            splitDepth: 5,
            northColor: props.color,
            equatorColor: props.color,
            southColor: props.color
        });
        mat4.translate(head.coordFrame, head.coordFrame,
            vec3.fromValues(0, 0, 0.5 * props.radius));

        if (props.numTails === 4) {
            // Blinky and Inky
            mat4.fromXRotation(tmpMat, glMatrix.toRadian(180));

            // Straight tails
            for (let i = 0; i < 4; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    tipColor: props.color,
                    baseColor: props.color
                });
                mat4.multiply(tail.coordFrame, tmpMat, tail.coordFrame);
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(45 + i * 90));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                this.group.push(tail);
            }

            // Left skewed tails
            let skewMat = mat4.create();
            skewMat[9] = (props.radius / 4) / (props.radius / 3);
            for (let i = 0; i < 4; i++) {
                let tail = new Cone(gl, {
                    radius: props.radius / 4,
                    height: props.radius / 3,
                    radialDiv: 20,
                    tipColor: vec3.fromValues(0, 0, 1.0),
                    baseColor: vec3.fromValues(0, 0, 1.0)
                });
                mat4.multiply(tail.coordFrame, tmpMat, tail.coordFrame);
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(props.radius - props.radius / 4, 0, 0));
                mat4.translate(tail.coordFrame, tail.coordFrame,
                    vec3.fromValues(0, 0, props.radius / 2));
                mat4.rotateZ(tail.coordFrame, tail.coordFrame, glMatrix.toRadian(30 + i * 90));
                mat4.multiply(tail.coordFrame, skewMat, tail.coordFrame);
                this.group.push(tail);
            }

        } else {
            // Pinky and Clyde

        }

        this.group.push(body, head);
    }
}