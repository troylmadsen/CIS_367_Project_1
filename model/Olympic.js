/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class Olympic extends ObjectGroup {
    constructor(gl) {
        super(gl);
        let tmpMat = mat4.create();

        mat4.fromYRotation(tmpMat, glMatrix.toRadian(10));
        let bluTorus = new Torus(gl, {
            majorRadius: 0.8, minorRadius: 0.1,
            topColor: [62/255, 118/255, 236/255],
            bottomColor: [80/255, 100/255, 200/255]});
        mat4.translate (bluTorus.coordFrame, bluTorus.coordFrame,
            vec3.fromValues(-1.8, 0, 0));
        mat4.rotateY (bluTorus.coordFrame, bluTorus.coordFrame, glMatrix.toRadian(-10));
        let blkTorus = new Torus(gl, {
            majorRadius: 0.8, minorRadius: 0.1,
            topColor: [0, 0, 0],
            bottomColor: [0.3, 0.3, 0.3]});
        mat4.rotateY (blkTorus.coordFrame, blkTorus.coordFrame, glMatrix.toRadian(-12));
        let redTorus = new Torus(gl, {
            majorRadius: 0.8, minorRadius: 0.1,
            topColor: [0.8, 0.4, 0],
            bottomColor: [1.0, 0, 0]});
        mat4.translate (redTorus.coordFrame, redTorus.coordFrame,
            vec3.fromValues(+1.8, 0, 0));
        mat4.rotateY (redTorus.coordFrame, redTorus.coordFrame, glMatrix.toRadian(-12));
        let ylwTorus = new Torus(gl, {
            majorRadius: 0.8, minorRadius: 0.1,
            topColor: [1, 206/255, 0],
            bottomColor: [0.9, 0.9, 0]});
        mat4.translate(ylwTorus.coordFrame, ylwTorus.coordFrame,
            vec3.fromValues(-0.9, -0.9, 0));
        mat4.rotateY (ylwTorus.coordFrame, ylwTorus.coordFrame, glMatrix.toRadian(+12));
        let grnTorus = new Torus(gl, {
            majorRadius: 0.8, minorRadius: 0.1,
            topColor: [23/255, 154/255, 19/255],
            bottomColor: [23/255, 100/255, 30/255]});
        mat4.translate(grnTorus.coordFrame, grnTorus.coordFrame,
            vec3.fromValues(+0.9, -0.9, 0));
        mat4.rotateY (grnTorus.coordFrame, grnTorus.coordFrame, glMatrix.toRadian(+12));

        mat4.rotateX(this.coordFrame, this.coordFrame, glMatrix.toRadian(90));
        this.group.push(bluTorus, blkTorus, redTorus, ylwTorus, grnTorus);
    }
}