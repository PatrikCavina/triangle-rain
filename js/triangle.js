class Triangle {
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     */
    constructor(context, x1, y1, x2, y2, x3, y3) {
        this.ctx = context;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;

        this.color = 'black';

        this.upFactor = 0.1;
        this.resizeFactor = 0.001;

        this.upSpeed = this.upFactor * Math.random();
        this.resizeSpeed = this.upSpeed;
    }

    show() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.lineTo(this.x3, this.y3);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }

    resize() {
        let cX = this.centerX();
        let cY = this.centerY();

        this.x1 += (this.x1 < cX) ? this.resizeSpeed : -this.resizeSpeed;
        this.x2 += (this.x2 < cX) ? this.resizeSpeed : -this.resizeSpeed;
        this.x3 += (this.x3 < cX) ? this.resizeSpeed : -this.resizeSpeed;
        this.y1 += (this.y1 < cY) ? this.resizeSpeed : -this.resizeSpeed;
        this.y2 += (this.y2 < cY) ? this.resizeSpeed : -this.resizeSpeed;
        this.y3 += (this.y3 < cY) ? this.resizeSpeed : -this.resizeSpeed;

        this.resizeSpeed += (this.resizeFactor*Math.random());
    }

    up() {
        this.y1 -= this.upSpeed;
        this.y2 -= this.upSpeed;
        this.y3 -= this.upSpeed;

        this.upSpeed += (this.upFactor*Math.random());
    }

    centerX() {
        return (this.x1 + this.x2 + this.x3) / 3;
    }

    centerY() {
        return (this.y1 + this.y2 + this.y3) / 3;
    }

}