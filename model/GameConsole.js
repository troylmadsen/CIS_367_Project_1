/**
 * Created by Troy Madsen
 */
class GameConsole extends ObjectGroup {

    /**
     * Creates a Pacman game console with the game displayed.
     *
     * @param gl (Object) the current WebGL context
     * @param props props with the following keys
     *      required: scale
     */
    constructor(gl, props) {
        super(gl);

        let screen = new Screen(gl, {
            scale: props.scale / 2
        });
        mat4.rotateX(screen.coordFrame, screen.coordFrame, glMatrix.toRadian(-30));
        this.group.push(screen);

        let body = new PolygonalPrism(gl, {
            topRadius: props.scale * 100,
            bottomRadius: props.scale * 100,
            numSides: 4,
            height: props.scale * 200,
            topColor: vec3.fromValues(1.0, 0, 0),
            bottomColor: vec3.fromValues(1.0, 0, 0)
        });
        mat4.translate(body.coordFrame, body.coordFrame,
            vec3.fromValues(0, 0, props.scale * -200));
        mat4.rotateZ(body.coordFrame, body.coordFrame, glMatrix.toRadian(45));

        this.group.push(body);
    }
}