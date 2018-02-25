/**
 * Created by Hans Dulimarta on 2/9/18.
 */
class Arrow extends ObjectGroup {
    /**
     *
     * @param gl
     * @param props object with the following keys: color, length, radius
     */
    constructor(gl, props) {
        super(gl);
        const requiredProps = ["length"];
        if (!this._checkProperties(props, requiredProps)) {
            throw "Arrow: missing required properties: " + requiredProps;
        }
        var color;
        if (typeof props === 'undefined' || typeof props.color === 'undefined')
            color = [1,1,1];
        else
            color = props.color;
        let cyl = new PolygonalPrism(gl, {
            topRadius: 0.05 * props.length,
            bottomRadius: 0.05 * props.length,
            height: props.length * 0.8, numSides: 60,
            topColor: color, bottomColor: color})
        let cone = new Cone(gl, {
            height: props.length * 0.2,
            radius : props.length * 0.15,
            tipColor: color,
            baseColor: color
        });
        mat4.translate(cone.coordFrame, cone.coordFrame,
            vec3.fromValues(0, 0, props.length * 0.8));
        this.group.push(cyl, cone);
    }
}