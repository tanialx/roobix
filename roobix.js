class Roobix {

    constructor() {
        this.vertices = this.#init_vertices(0.5);
        this.colors = this.#roobixFaceColors();
    }

    #init_vertices = function (w) {

        const n = 2;
        const d = 0.01;

        /**
         * Generate NxN cube coordinates
         * 
         * [x, y + 2w][x + w, y + 2w][x + 2w, y + 2w]
         * [x, y +  w][x + w, y +  w][x + 2w, y +  w]
         * [x, y     ][x + w, y     ][x + 2w, y     ]
         * 
         * 1. Define front bottom left most cube coordinaete (Front-Back-Top-Bottom-Left-Right vertices)
         * 2. Create remaining bottom cubes by increasing x of first cubes by w, 2w
         * 3. Create middle & top cubes by increasing y of bottom cubes by w, 2w --> complete front face
         * 4. Create middle face and back face by decreasing z coordinates of the front face by w or 2w
         * 
         */

        // 1
        let unit_cube = [
            // Front
            0, 0, 0,
            0, w, 0,
            w, w, 0,
            w, 0, 0,

            // Back
            0, 0, -w,
            0, w, -w,
            w, w, -w,
            w, 0, -w,

            // Top
            0, w, 0,
            0, w, -w,
            w, w, -w,
            w, w, 0,

            // Bottom   
            0, 0, 0,
            w, 0, 0,
            w, 0, -w,
            0, 0, -w,

            // Left
            0, 0, 0,
            0, w, 0,
            0, w, -w,
            0, 0, -w,

            // Right
            w, 0, 0,
            w, w, 0,
            w, w, -w,
            w, 0, -w
        ]

        // 2

        let bottomCubes = [...unit_cube];

        for (var i = 1; i < n; ++i) {
            let nCube = [...unit_cube];
            for (var j = 0; j < unit_cube.length; j += 3) {
                nCube[j] += w*i + d;
            }
            bottomCubes = bottomCubes.concat(nCube);
        }

        // 3

        let frontCubes = [...bottomCubes];

        for(var i = 1; i < n; ++i) {
            let nCube = [...bottomCubes];
            for (var j = 1; j < bottomCubes.length; j += 3) {
                nCube[j] += w*i + d;
            }
            frontCubes = frontCubes.concat(nCube);
        }

        // 4
        let vs = [...frontCubes];

        for(var i = 1; i < n; ++i) {
            let nCube = [...frontCubes];
            for (var j = 2; j < frontCubes.length; j += 3) {
                nCube[j] -= w*i + d;
            }
            vs = vs.concat(nCube);
        }
        return vs;
    }

    #colors_arr = function () {
        return [
            [0.2, 0.2, 0.2, 1.0],
            [0.543, 0.876, 0.920, 1.0],
            [0.861, 0.780, 1.00, 1.0],
            [0.849, 0.910, 0.682, 1.0],
            [0.950, 0.722, 0.737, 1.0],
            [0.637, 0.910, 0.819, 1.0],
            [0.863, 0.731, 0.870, 1.0]
        ]
    }

    #roobixFaceColors = function () {

        const validColors = this.#colors_arr();

        const faceColors = [
            validColors[1],
            validColors[0],
            validColors[0],
            validColors[2],
            validColors[3],
            validColors[0],

            validColors[1],
            validColors[0],
            validColors[4],
            validColors[0],
            validColors[3],
            validColors[0],

            validColors[1],
            validColors[0],
            validColors[0],
            validColors[2],
            validColors[0],
            validColors[5],

            validColors[1],
            validColors[0],
            validColors[4],
            validColors[0],
            validColors[0],
            validColors[5],

            validColors[0],
            validColors[6],
            validColors[0],
            validColors[2],
            validColors[3],
            validColors[0],

            validColors[0],
            validColors[6],
            validColors[4],
            validColors[0],
            validColors[3],
            validColors[0],

            validColors[0],
            validColors[6],
            validColors[0],
            validColors[2],
            validColors[0],
            validColors[5],

            validColors[0],
            validColors[6],
            validColors[4],
            validColors[0],
            validColors[0],
            validColors[5]
        ];
        return faceColors;
    }
}
