/**
 * Created by Troy Madsen
 */
class PacMan extends ObjectGroup {

    /**
     * Creates pacman of the specified size
     *
     * @param gl (Object) the current WebGL context
     * @param props props with the following keys
     *      required: radius (body radius of pacman), mouthAngle (0 to 50)
     */
    constructor(gl, props) {
        super(gl);

        const requiredProps = ['radius', 'mouthAngle'];
        if (!this._checkProperties(props, requiredProps))
            throw "PacMan: missing required properties" + requiredProps;

        props.radius *= Math.sqrt(2);

        let body = new PacManSphere(gl, {
            radius: props.radius,
            splitDepth: 6,
            mouthAngle: props.mouthAngle,
            northColor: vec3.fromValues(255/255, 255/255, 0/255),
            equatorColor: vec3.fromValues(164/255, 151/255, 0/255),
            southColor: vec3.fromValues(126/255, 116/255, 0/255)
        });
        this.group.push(body)

        // Shift pacman up
        mat4.translate(this.coordFrame, this.coordFrame,
            vec3.fromValues(0, 0, 5 * props.radius / 4));
    }
}