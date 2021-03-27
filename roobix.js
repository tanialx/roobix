function vertices() {
    const w = 0.5;
    let sub_cube_1 = [
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
    let sub_cube_2 = [...sub_cube_1];
    let sub_cube_3 = [...sub_cube_1];
    let sub_cube_4 = [...sub_cube_1];

    const d = 0.01;

    for (var i = 1; i < sub_cube_1.length; i += 3) {
        sub_cube_2[i] += w + d;
        sub_cube_4[i] += w + d;
    }
    for (var i = 0; i < sub_cube_1.length; i += 3) {
        sub_cube_3[i] += w + d;
        sub_cube_4[i] += w + d;
    }

    let sub_cube_5 = [...sub_cube_1];
    let sub_cube_6 = [...sub_cube_2];
    let sub_cube_7 = [...sub_cube_3];
    let sub_cube_8 = [...sub_cube_4];

    for (var i = 2; i < sub_cube_1.length; i += 3) {
        sub_cube_5[i] -= w + d;
        sub_cube_6[i] -= w + d;
        sub_cube_7[i] -= w + d;
        sub_cube_8[i] -= w + d;
    }
    return sub_cube_1.concat(sub_cube_2).concat(sub_cube_3)
        .concat(sub_cube_4).concat(sub_cube_5).concat(sub_cube_6)
        .concat(sub_cube_7).concat(sub_cube_8);
}

function colors_arr() {
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

function roobixFaceColors() {

    const validColors = colors_arr();

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
