/**
 * Created by Troy Madsen
 */
class Screen extends ObjectGroup {

    /**
     * Creates a Pacman game display.
     *
     * @param gl (Object) the current WebGL context
     * @param props props with the following keys
     *      required: scale (scale of the screen objects)
     */
    constructor(gl, props) {
        super(gl);

        let maze = new Maze(gl, {
            radius: props.scale
        });

        let pacman = new PacMan(gl, {
            radius: props.scale,
            mouthAngle: 50
        });
        mat4.translate(pacman.coordFrame, pacman.coordFrame,
            maze.getMazeVec3(1, 7));

        let blinky = new Ghost(gl, {
            radius: props.scale,
            numTails: 4,
            color: vec3.fromValues(208/255, 62/255, 25/255)
        });
        mat4.translate(blinky.coordFrame, blinky.coordFrame,
            maze.getMazeVec3(1, 2));

        let pinky = new Ghost(gl, {
            radius: props.scale,
            numTails: 3,
            color: vec3.fromValues(234/255, 130/255, 229/255)
        });
        mat4.translate(pinky.coordFrame, pinky.coordFrame,
            maze.getMazeVec3(1, 3));

        let inky = new Ghost(gl, {
            radius: props.scale,
            numTails: 4,
            color: vec3.fromValues(70/255, 191/255, 238/255)
        });
        mat4.translate(inky.coordFrame, inky.coordFrame,
            maze.getMazeVec3(1, 4));

        let clyde = new Ghost(gl, {
            radius: props.scale,
            numTails: 3,
            color: vec3.fromValues(219/255, 133/255, 28/255)
        });
        mat4.translate(clyde.coordFrame, clyde.coordFrame,
            maze.getMazeVec3(1, 5));

        // Create a cherry object to add to the game.
        let cherry = new Cherries(gl, {
            radius: scale * Math.sqrt(2) * 100
        });
        mat4.translate(cherry.coordFrame, cherry.coordFrame,
            maze.getMazeVec3(1, 9));
        mat4.translate(cherry.coordFrame, cherry.coordFrame,
            vec3.fromValues(0, 0, props.radius * -0.2));

        this.group.push(maze, pacman, blinky, pinky, inky, clyde, cherry);

        // Set origin of this to the center
        mat4.translate(this.coordFrame, this.coordFrame,
            vec3.fromValues(-1 * maze.getWidth() / 2, 0, maze.getHeight() / 2));
    }
}
