/**
 * Brendon Murthum
 */
class Cherries extends ObjectGroup {

    /**
     * Create a cherry item that Pac-Man would grab.
     *
     * @param gl {Object} gl      the current WebGL context
     * @param props props with the following keys
     *    required : radius (cherries radius)
     */
    constructor(gl, props) {
        super(gl);

        // Right cherry
        let rightCherry = new Sphere(gl, {
            radius: props.radius * 0.4,
            splitDepth: 5,
            northColor: vec3.fromValues(208/255, 62/255, 25/255),
            equatorColor: vec3.fromValues(208/255, 40/255, 15/255),
            southColor: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(rightCherry.coordFrame, rightCherry.coordFrame,
            vec3.fromValues(0, 0.4 * props.radius, 0.08 * props.radius));
        this.group.push(rightCherry);

        // Smaller left cherry
        let leftCherry = new Sphere(gl, {
            radius: props.radius * 0.3,
            splitDepth: 5,
            northColor: vec3.fromValues(208/255, 62/255, 25/255),
            equatorColor: vec3.fromValues(208/255, 40/255, 15/255),
            southColor: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(leftCherry.coordFrame, leftCherry.coordFrame,
            vec3.fromValues(0, -0.15 * props.radius, -0.05 * props.radius));
        this.group.push(leftCherry);

        // Left stem
        let leftStem = new PolygonalPrism(gl, {
            topRadius: props.radius * 0.03,
            bottomRadius: props.radius * 0.03,
            numSides: 20,
            height: props.radius * 0.5,
            topColor: vec3.fromValues(.2, .4, 0),
            bottomColor: vec3.fromValues(.2, .4, 0)
        });
        mat4.translate(leftStem.coordFrame, leftStem.coordFrame,
            vec3.fromValues(0, -0.1 * props.radius, 0.1 * props.radius));
        mat4.rotateX(leftStem.coordFrame, leftStem.coordFrame, glMatrix.toRadian(-20));
        this.group.push(leftStem);

        // Right stem
        let rightStem = new PolygonalPrism(gl, {
            topRadius: props.radius * 0.03,
            bottomRadius: props.radius * 0.03,
            numSides: 20,
            height: props.radius * 0.5,
            topColor: vec3.fromValues(.2, .4, 0),
            bottomColor: vec3.fromValues(.2, .4, 0)
        });
        mat4.translate(rightStem.coordFrame, rightStem.coordFrame,
            vec3.fromValues(0, 0.25 * props.radius, 0.3 * props.radius));
        mat4.rotateX(rightStem.coordFrame, rightStem.coordFrame, glMatrix.toRadian(20));
        this.group.push(rightStem);

        // // Rotating to face camera
        // mat4.rotateZ(this.coordFrame, this.coordFrame,
        //     glMatrix.toRadian(-90));
        // Shifting center up to fit within maze
        mat4.translate(this.coordFrame, this.coordFrame,
            vec3.fromValues(0, 0, 3 * props.radius / 2));
    }
}