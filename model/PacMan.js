/**
 * Created by Troy Madsen
 */
class PacMan extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let body = new Sphere(gl, {
            radius: 1.0,
            splitDepth: 5,
            northColor: vec3.fromValues(255/255, 255/255, 0/255),
            equatorColor: vec3.fromValues(164/255, 151/255, 0/255),
            southColor: vec3.fromValues(126/255, 116/255, 0/255)
        });
        this.group.push(body)
    }
}