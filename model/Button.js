/**
 * Troy Madsen
 */
class Button extends ObjectGroup {

    /**
     * A button
     *
     * @param gl (Object) the current WebGL context
     * @param props props with the following keys
     *      required: scale (radius of each wall piece)
     *      optional: color (button color)
     */
    constructor(gl, props) {
        super(gl);

        const requiredProps = ['scale'];
        if (!this._checkProperties(props, requiredProps))
            throw "Button: missing required properties" + requiredProps;
        /* if colors are undefined, generate random colors */
        if (typeof props.color === "undefined")
            props.color = vec3.fromValues(1.0, 1.0, 1.0);

        let gap = new PolygonalPrism(gl, {
            topRadius: props.scale * 1.2,
            bottomRadius: props.scale * 1.2,
            numSides: 20,
            height: props.scale * 0.1,
            topColor: vec3.fromValues(0, 0, 0),
            bottomColor: vec3.fromValues(0, 0, 0)
        });

        let ringBase = new Torus(gl, {
            majorRadius: props.scale * 1.4,
            minorRadius: props.scale / 4,
            majSubdiv: 20,
            minSubdiv: 20,
            topColor: props.color,
            bottomColor: props.color
        });

        let button = new PolygonalPrism(gl, {
            topRadius: props.scale,
            bottomRadius: props.scale,
            numSides: 20,
            height: props.scale * 0.35,
            topColor: vec3.fromValues(props.color[0] * 0.6, props.color[1] * 0.6, props.color[2] * 0.6),
            bottomColor: props.color
        });

        this.group.push(gap, ringBase, button);
    }
}