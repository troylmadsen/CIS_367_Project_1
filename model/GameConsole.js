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
            scale: 3 * props.scale / 4
        });
        mat4.translate(screen.coordFrame, screen.coordFrame,
            vec3.fromValues(0, props.scale * 53, props.scale * 10));
        mat4.rotateX(screen.coordFrame, screen.coordFrame, glMatrix.toRadian(-55));
        this.group.push(screen);

        let screenBack = new PolygonalPrism(gl, {
            topRadius: props.scale * 100,
            bottomRadius: props.scale * 100,
            numSides: 4,
            height: props.scale,
            topColor: vec3.fromValues(128/255, 128/255, 128/255),
            bottomColor: vec3.fromValues(128/255, 128/255, 128/255)
        });
        mat4.translate(screenBack.coordFrame, screenBack.coordFrame,
            vec3.fromValues(0, props.scale * 15, props.scale * 25));
        mat4.rotateX(screenBack.coordFrame, screenBack.coordFrame, glMatrix.toRadian(35));
        mat4.rotateZ(screenBack.coordFrame, screenBack.coordFrame, glMatrix.toRadian(45));
        this.group.push(screenBack);

        let body = new PolygonalPrism(gl, {
            topRadius: props.scale * 100,
            bottomRadius: props.scale * 100,
            numSides: 4,
            height: props.scale * 200,
            topColor: vec3.fromValues(1.0, 1.0, 0),
            bottomColor: vec3.fromValues(0, 1.0, 1.0)
        });
        mat4.translate(body.coordFrame, body.coordFrame,
            vec3.fromValues(0, 0, props.scale * -200));
        mat4.rotateZ(body.coordFrame, body.coordFrame, glMatrix.toRadian(45));
        this.group.push(body);

        let leftShield = new PolygonalPrism(gl, {
            topRadius: props.scale * 85,
            bottomRadius: props.scale * 85,
            numSides: 4,
            height: props.scale * 3,
            topColor: vec3.fromValues(200/255, 200/255, 0/255),
            bottomColor: vec3.fromValues(200/255, 200/255, 0/255)
        });
        mat4.translate(leftShield.coordFrame, leftShield.coordFrame,
            vec3.fromValues(0, props.scale * 20, props.scale * 45));
        mat4.rotateY(leftShield.coordFrame, leftShield.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(leftShield.coordFrame, leftShield.coordFrame, glMatrix.toRadian(45));
        mat4.translate(leftShield.coordFrame, leftShield.coordFrame,
            vec3.fromValues(0, 0, props.scale * 68));
        this.group.push(leftShield);

        let rightShield = new PolygonalPrism(gl, {
            topRadius: props.scale * 85,
            bottomRadius: props.scale * 85,
            numSides: 4,
            height: props.scale * 3,
            topColor: vec3.fromValues(200/255, 200/255, 0/255),
            bottomColor: vec3.fromValues(200/255, 200/255, 0/255)
        });
        mat4.translate(rightShield.coordFrame, rightShield.coordFrame,
            vec3.fromValues(0, props.scale * 20, props.scale * 45));
        mat4.rotateY(rightShield.coordFrame, rightShield.coordFrame, glMatrix.toRadian(90));
        mat4.rotateZ(rightShield.coordFrame, rightShield.coordFrame, glMatrix.toRadian(45));
        mat4.translate(rightShield.coordFrame, rightShield.coordFrame,
            vec3.fromValues(0, 0, props.scale * 68));
        this.group.push(rightShield);

        let hood = new PolygonalPrism(gl, {
            topRadius: props.scale * 5,
            bottomRadius: props.scale * 200,
            numSides: 4,
            height: props.scale * 100,
            topColor: vec3.fromValues(76/255, 76/255, 0/255),
            bottomColor: vec3.fromValues(153/255, 153/255, 0/255)
        });
        mat4.translate(hood.coordFrame, hood.coordFrame,
            vec3.fromValues(0, props.scale * 20, props.scale * 84));
        mat4.rotateX(hood.coordFrame, hood.coordFrame, glMatrix.toRadian(-20));
        mat4.rotateZ(hood.coordFrame, hood.coordFrame, glMatrix.toRadian(45))
        let shearMat = mat4.create();
        shearMat[8] = Math.tan(glMatrix.toRadian(20));
        shearMat[9] = Math.tan(glMatrix.toRadian(20));
        mat4.multiply(hood.coordFrame, hood.coordFrame, shearMat);
        this.group.push(hood);

        let joystick = new Joystick(gl, {
            scale: props.scale * 10
        });
        mat4.translate(joystick.coordFrame, joystick.coordFrame,
            vec3.fromValues(0, -50 * props.scale, -15 * props.scale));
        mat4.rotateZ(joystick.coordFrame, joystick.coordFrame, glMatrix.toRadian(45));
        this.group.push(joystick);

        let button1 = new Button(gl, {
            scale: scale * 1.5,
            color: vec3.fromValues(1.0, 0, 0)
        });
        mat4.translate(button1.coordFrame, button1.coordFrame,
            vec3.fromValues(props.scale * 10, props.scale * -40, props.scale * 0.5));
        this.group.push(button1);
    }
}