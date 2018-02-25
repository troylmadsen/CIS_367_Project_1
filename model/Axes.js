/**
 * Created by Hans Dulimarta on 2/9/18.
 */
class Axes extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let xAxis = new Arrow(gl, {length: 1, color: [1,0,0]});
        mat4.rotateY(xAxis.coordFrame, xAxis.coordFrame, glMatrix.toRadian(+90));
        let yAxis = new Arrow(gl, {length: 1, color: [0,1,0]});
        mat4.rotateX(yAxis.coordFrame, yAxis.coordFrame, glMatrix.toRadian(-90));
        let zAxis = new Arrow(gl, {length: 1, color: [0,0.5,1]});

        this.group.push(xAxis, yAxis, zAxis);
    }
}