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

    for (var i = 1; i < sub_cube_1.length; i += 3) {
        sub_cube_2[i] += w;
        sub_cube_4[i] += w;
    }
    for (var i = 0; i < sub_cube_1.length; i += 3) {
        sub_cube_3[i] += w;
        sub_cube_4[i] += w;
    }

    let sub_cube_5 = [...sub_cube_1];
    let sub_cube_6 = [...sub_cube_2];
    let sub_cube_7 = [...sub_cube_3];
    let sub_cube_8 = [...sub_cube_4];

    for (var i = 2; i < sub_cube_1.length; i += 3) {
        sub_cube_5[i] -= w;
        sub_cube_6[i] -= w;
        sub_cube_7[i] -= w;
        sub_cube_8[i] -= w;
    }
    return sub_cube_1.concat(sub_cube_2).concat(sub_cube_3)
        .concat(sub_cube_4).concat(sub_cube_5).concat(sub_cube_6)
        .concat(sub_cube_7).concat(sub_cube_8);
}
