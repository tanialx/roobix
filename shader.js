/**
 * The vertex shader must perform the needed transforms on the vertex's position, 
 * make any other adjustments or calculations it needs to make on a per-vertex basis, 
 * then return the transformed vertex by saving it in a special variable provided by GLSL, 
 * called gl_Position.
 * 
 * More:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
 * 
 * Using inputs aVertexPosition, uModelViewMatrix, and uProjectionMatrix
 */
const vertexShaderSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;

/**
 * The fragment shader is called once for every pixel on each shape to be drawn, 
 * after the shape's vertices have been processed by the vertex shader. 
 * Its job is to determine the color of that pixel by figuring out which texel (that is, 
 * the pixel from within the shape's texture) to apply to the pixel, 
 * getting that texel's color, then applying the appropriate lighting to the color. 
 * The color is then returned to the WebGL layer by storing it in the special 
 * variable gl_FragColor. That color is then drawn to the screen in the correct position 
 * for the shape's corresponding pixel.
 * 
 * More:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
 */
const fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}