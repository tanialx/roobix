class MouseControl {

    static AMORTIZATION = .95;

    constructor(w, h) {
        this.drag = false;
        this.old_x = 0;
        this.old_y = 0;
        this.dX = 0;
        this.dY = 0;
        this.w = w;
        this.h = h;
        this.total_dragged_x = .5;
        this.total_dragged_y = .5;
    }

    mouseDown(e) {
        this.drag = true;
        this.old_x = e.pageX, this.old_y = e.pageY;
        e.preventDefault();
        return false;
    }

    mouseUp(e) {
        this.drag = false;
    };

    mouseMove(e) {
        if (!this.drag) return false;
        this.dX = (e.pageX - this.old_x) * 2 * Math.PI / this.w;
        this.dY = (e.pageY - this.old_y) * 2 * Math.PI / this.h;
        this.total_dragged_x += this.dX;
        this.total_dragged_y += this.dY;
        this.old_x = e.pageX;
        this.old_y = e.pageY;
        e.preventDefault();
    };
}