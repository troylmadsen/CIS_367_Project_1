/**
 * Brendon Murthum
 */
class Joystick extends ObjectGroup {

    /**
     * Create a joystick item that the arcade machine uses.
     *
     * @param gl {Object} gl      the current WebGL context
     * @param props props with the following keys
     *    required : scale (for scaling)
     */
    constructor(gl, props) {
        super(gl);

        // Right arrow
        let rightArrow = new PolygonalPrism(gl, {
            topRadius: props.scale * 0.2,
            bottomRadius: props.scale * 0.2,
            numSides: 3,
            height: props.scale * 0.1,
            topColor: vec3.fromValues(208/255, 40/255, 15/255),
            bottomColor: vec3.fromValues(220/255, 60/255, 35/255)
        });
        mat4.rotateZ(rightArrow.coordFrame, rightArrow.coordFrame, 
                glMatrix.toRadian(-135));
        mat4.translate(rightArrow.coordFrame, rightArrow.coordFrame,
                vec3.fromValues(0.4 * props.scale, 0.0 * props.scale, 
                0.0 * props.scale));
        this.group.push(rightArrow);

        // Up Arrow
        let upArrow = new PolygonalPrism(gl, {
            topRadius: props.scale * 0.2,
            bottomRadius: props.scale * 0.2,
            numSides: 3,
            height: props.scale * 0.1,
            topColor: vec3.fromValues(208/255, 40/255, 15/255),
            bottomColor: vec3.fromValues(220/255, 60/255, 35/255)
        });
        mat4.rotateZ(upArrow.coordFrame, upArrow.coordFrame, 
                glMatrix.toRadian(-45));
        mat4.translate(upArrow.coordFrame, upArrow.coordFrame,
                vec3.fromValues(0.4 * props.scale, 0.0 * props.scale, 
                0.0 * props.scale));
        this.group.push(upArrow);

        // Left Arrow
        let leftArrow = new PolygonalPrism(gl, {
            topRadius: props.scale * 0.2,
            bottomRadius: props.scale * 0.2,
            numSides: 3,
            height: props.scale * 0.1,
            topColor: vec3.fromValues(208/255, 40/255, 15/255),
            bottomColor: vec3.fromValues(220/255, 60/255, 35/255)
        });
        mat4.rotateZ(leftArrow.coordFrame, leftArrow.coordFrame, 
                glMatrix.toRadian(45));
        mat4.translate(leftArrow.coordFrame, leftArrow.coordFrame,
                vec3.fromValues(0.4 * props.scale, 0.0 * props.scale, 
                0.0 * props.scale));
        this.group.push(leftArrow);

        // Down Arrow
        let downArrow = new PolygonalPrism(gl, {
            topRadius: props.scale * 0.2,
            bottomRadius: props.scale * 0.2,
            numSides: 3,
            height: props.scale * 0.1,
            topColor: vec3.fromValues(208/255, 40/255, 15/255),
            bottomColor: vec3.fromValues(220/255, 60/255, 35/255)
        });
        mat4.rotateZ(downArrow.coordFrame, downArrow.coordFrame, 
                glMatrix.toRadian(135));
        mat4.translate(downArrow.coordFrame, downArrow.coordFrame,
                vec3.fromValues(0.4 * props.scale, 0.0 * props.scale, 
                0.0 * props.scale));
        this.group.push(downArrow);

        // Backplate
        let backPlate = new PolygonalPrism(gl, {
            topRadius: props.scale * 1.0,
            bottomRadius: props.scale * 1.0,
            numSides: 4,
            height: props.scale * 0.05,
            topColor: vec3.fromValues(.2, .2, .2),
            bottomColor: vec3.fromValues(.05, .05, .05)
        });
        this.group.push(backPlate);

        // Joystick Rod
        let joystickRod = new PolygonalPrism(gl, {
            topRadius: props.scale * 0.07,
            bottomRadius: props.scale * 0.07,
            numSides: 20,
            height: props.scale * 1.5,
            topColor: vec3.fromValues(.3, .3, .3),
            bottomColor: vec3.fromValues(.25, .25, .25)
        });
        mat4.translate(joystickRod.coordFrame, joystickRod.coordFrame,
                vec3.fromValues(0, 0 * props.scale, 0.0 * props.scale));
        mat4.rotateZ(joystickRod.coordFrame, joystickRod.coordFrame, 
                glMatrix.toRadian(-90));
        this.group.push(joystickRod);

        // Knob
        let joystickKnob = new Sphere(gl, {
            radius: props.scale * 0.3,
            splitDepth: 5,
            northColor: vec3.fromValues(208/255, 62/255, 25/255),
            equatorColor: vec3.fromValues(208/255, 40/255, 15/255),
            southColor: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(joystickKnob.coordFrame, joystickKnob.coordFrame,
            vec3.fromValues(0, 0 * props.scale, 1.5 * props.scale));
        this.group.push(joystickKnob);

        // mat4.rotateZ(this.coordFrame, this.coordFrame,
        //     glMatrix.toRadian(-90));
        mat4.translate(this.coordFrame, this.coordFrame,
            vec3.fromValues(0, 0, 3 * props.scale / 2));
    }
}
