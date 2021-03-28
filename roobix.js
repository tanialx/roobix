class Roobix {

    constructor() {
        this.size = 2;
        this.vertices = this.#init_vertices(0.5);
        this.colors = this.#roobixFaceColors();
    }

    #init_vertices = function (w) {

        const n = this.size;
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
                nCube[j] += w * i + d;
            }
            bottomCubes = bottomCubes.concat(nCube);
        }

        // 3

        let frontCubes = [...bottomCubes];

        for (var i = 1; i < n; ++i) {
            let nCube = [...bottomCubes];
            for (var j = 1; j < bottomCubes.length; j += 3) {
                nCube[j] += w * i + d;
            }
            frontCubes = frontCubes.concat(nCube);
        }

        // 4
        let vs = [...frontCubes];

        for (var i = 1; i < n; ++i) {
            let nCube = [...frontCubes];
            for (var j = 2; j < frontCubes.length; j += 3) {
                nCube[j] -= w * i + d;
            }
            vs = vs.concat(nCube);
        }
        return vs;
    }

    #colors = {
        a1: [0.761, 0.780, 0.491, 1.0], // olive_green 
        a2: [0.920, 0.699, 0.817, 1.0], // kobi
        a3: [0.502, 0.729, 0.750, 1.0], // neptune
        a4: [0.910, 0.827, 0.682, 1.0], // raffia
        a5: [0.684, 0.662, 0.920, 1.0], // biloba_flower
        a6: [0.593, 0.750, 0.684, 1.0], // summer_green
        _i: [0.735, 0.750, 0.744, 1.0]  // gray
    }

    #roobixFaceColors = function () {

        const cols = this.#colors;
        const n = 2;

        // Initially fill all faces of rubik cube with 'inactive' color
        let fcols = [];
        for (let i = 0; i < n * n * n * 6; i++) {
            fcols.push(cols._i);
        }

        /**
         * Apply each color from 6 active colors (a1 -> a6) to the corresponding cubes' faces
         */

        // Front: Color #1
        for (let i = 0; i < n * n; i++) {
            fcols[i * 6] = cols.a1;
        }

        // Back: Color #2
        const base_back = n * n * (n - 1) * 6;
        for (let i = 0; i < n * n; i++) {
            fcols[base_back + i * 6 + 1] = cols.a2;
        }

        // Top: Color #3
        for (let i = 1; i <= n; i += 1) {
            const base_top_i = n * (n * i - 1);
            for (let j = 0; j < n; j++) {
                fcols[(base_top_i + j) * 6 + 2] = cols.a3;
            }
        }

        // Bottom: Color #4
        for (let i = 0; i < n; i += 1) {
            const base_bottom_i = n * n * i;
            for (let j = 0; j < n; j++) {
                fcols[(base_bottom_i + j) * 6 + 3] = cols.a4;
            }
        }

        // Left: Color #5
        for (let i = 0; i < n * n * n; i += n) {
            fcols[i * 6 + 4] = cols.a5;
        }

        // Right: Color #6
        for (let i = n - 1; i < n * n * n; i += n) {
            fcols[i * 6 + 5] = cols.a6;
        }

        return fcols;
    }
}
