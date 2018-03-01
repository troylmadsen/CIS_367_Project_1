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

        // Left cherry
        // todo - translate this
        let leftCherry = new Sphere(gl, {
            radius: props.radius * 0.3,
            splitDepth: 5,
            northColor: vec3.fromValues(208/255, 62/255, 25/255),
            equatorColor: vec3.fromValues(208/255, 62/255, 25/255),
            southColor: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(leftCherry.coordFrame, leftCherry.coordFrame,
            vec3.fromValues(0, 0.3 * props.radius, 0.5 * props.radius));
        this.group.push(leftCherry);

        // Smaller right cherry
        // todo - Translate this
        let rightCherry = new Sphere(gl, {
            radius: props.radius * 0.2,
            splitDepth: 5,
            northColor: vec3.fromValues(208/255, 62/255, 25/255),
            equatorColor: vec3.fromValues(208/255, 62/255, 25/255),
            southColor: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(rightCherry.coordFrame, rightCherry.coordFrame,
            vec3.fromValues(0, -0.2 * props.radius, 0.5 * props.radius));
        this.group.push(rightCherry);

        // Left stem
        // todo - translate this, rotate this
        let leftStem = new PolygonalPrism(gl, {
            topRadius: props.radius * 0.02,
            bottomRadius: props.radius * 0.02,
            numSides: 20,
            height: props.radius * 0.3,
            topColor: vec3.fromValues(.2, .4, 0),
            bottomColor: vec3.fromValues(.2, .4, 0)
        });
        mat4.translate(leftStem.coordFrame, leftStem.coordFrame,
            vec3.fromValues(0, 0, 0.3 * props.radius));
        this.group.push(leftStem);

        // Right stem
        // TODO - translate this, rotate this
        let rightStem = new PolygonalPrism(gl, {
            topRadius: props.radius * 0.02,
            bottomRadius: props.radius * 0.02,
            numSides: 20,
            height: props.radius * 0.3,
            topColor: vec3.fromValues(.2, .4, 0),
            bottomColor: vec3.fromValues(.2, .4, 0)
        });
        mat4.translate(rightStem.coordFrame, rightStem.coordFrame,
            vec3.fromValues(0, 0, 0.3 * props.radius));
        this.group.push(rightStem);

        // Left stem top
        // todo - Add a small nub

        // Right stem top
        // todo - Add a small nub

        // Rotating to face camera
        mat4.rotateZ(this.coordFrame, this.coordFrame,
            glMatrix.toRadian(-90));
        // Shifting center up to fit within maze
        mat4.translate(this.coordFrame, this.coordFrame,
            vec3.fromValues(0, 0, 3 * props.radius / 2));
    }
}