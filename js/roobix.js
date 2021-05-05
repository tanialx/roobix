class Roobix {

    constructor(roobix_size) {
        this.size = roobix_size;
        this.vertices = this.init_vertices(0.2);
        this.colors = this.roobixFaceColors();
        this.vertexCount = this.vertices.length / 3;
    }

    init_vertices = function (w) {

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

        /** 
         * Roobix r_w = w * n + d * (n - 1)
         * Center roobix (r_w / 2, r_w / 2, -r_w / 2)
         */

        const offset = (w * n + d * (n - 1)) / 2;
        for (let i = 0; i < unit_cube.length; i++) {
            if (i % 3 !== 2) {
                unit_cube[i] -= offset;
            } else {
                unit_cube[i] += offset;
            }
        }

        // 2

        let bottomCubes = [...unit_cube];

        for (var i = 1; i < n; ++i) {
            let nCube = [...unit_cube];
            for (var j = 0; j < unit_cube.length; j += 3) {
                nCube[j] = nCube[j] + (w + d) * i;
            }
            bottomCubes = bottomCubes.concat(nCube);
        }

        // 3

        let frontCubes = [...bottomCubes];

        for (var i = 1; i < n; ++i) {
            let nCube = [...bottomCubes];
            for (var j = 1; j < bottomCubes.length; j += 3) {
                nCube[j] = nCube[j] + (w + d) * i;
            }
            frontCubes = frontCubes.concat(nCube);
        }

        // 4
        let vs = [...frontCubes];

        for (var i = 1; i < n; ++i) {
            let nCube = [...frontCubes];
            for (var j = 2; j < frontCubes.length; j += 3) {
                nCube[j] = nCube[j] - (w + d) * i;
            }
            vs = vs.concat(nCube);
        }
        return vs;
    }

    colors = {
        a1: [0.316, 0.790, 0.648, 1.0], // green
        a2: [0.316, 0.616, 0.790, 1.0], // blue
        a3: [0.988, 0.965, 0.910, 1.0], // white
        a4: [0.790, 0.766, 0.316, 1.0], // yellow
        a5: [0.790, 0.316, 0.316, 1.0], // red
        a6: [0.790, 0.632, 0.316, 1.0], // orange
        _i: [.2, .2, .2, 1.0]  // gray
    }

    roobixFaceColors = function () {

        const cols = this.colors;
        const n = this.size;

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
