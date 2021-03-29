let roobix = new Roobix(3);
let renderer;

main();

function main() {
    const canvas = document.querySelector("#roobix_cvs");
    canvas.width = canvas.parentNode.getBoundingClientRect().width;
    canvas.height = canvas.parentNode.getBoundingClientRect().height;
    // Initialize the GL context (WebGLRenderingContext)
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Create and link the shader program to WebGL context
    const shaderProgram = initShaderProgram(gl);

    const programInfo = {
        program: shaderProgram,
        /**
         * Attributes receive values from buffers.
         * Each iteration of the vertex shader receives the next value from the buffer
         * assigned to that attribute
         */
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        /**
         * Uniforms are similar to JavaScript global variables. 
         * They stay the same value for all iterations of a shader
         */
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const roobixData = {
        v: roobix.vertices,
        fColors: roobix.colors,
        vCount: roobix.vertexCount
    }
    renderer = new Renderer(gl, programInfo, roobixData);

    const mouseControl = new MouseControl(canvas.width, canvas.height);
    canvas.addEventListener("mousedown", function (e) {
        mouseControl.mouseDown(e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        mouseControl.mouseUp(e);
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        mouseControl.mouseUp(e);
    }, false);
    canvas.addEventListener("mousemove", function (e) {
        mouseControl.mouseMove(e);
    }, false);

    let animate = function () {

        if (!mouseControl.drag) {
            mouseControl.dX *= MouseControl.AMORTIZATION;
            mouseControl.dY *= MouseControl.AMORTIZATION;
            mouseControl.total_dragged_x += mouseControl.dX;
            mouseControl.total_dragged_y += mouseControl.dY;
        }

        let modelMat = mat4.create();
        mat4.rotateX(modelMat, modelMat, mouseControl.total_dragged_y);
        mat4.rotateY(modelMat, modelMat, mouseControl.total_dragged_x);

        renderer.clear();
        renderer.rotationMat = modelMat;
        renderer.render();

        window.requestAnimationFrame(animate);
    }
    animate(0);
}
