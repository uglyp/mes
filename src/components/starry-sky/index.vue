<template>
  <canvas class="starry-sky" ref="canvas" @mousemove="mousemove" @mouseleave="mouseleave">

  </canvas>
</template>

<script>
function colorValue(min) {
  return Math.floor(Math.random() * 255 + min);
}

function createColorStyle(r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

function mixComponents(comp1, weight1, comp2, weight2) {
  return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
}

function averageColorStyles(dot1, dot2) {
  const color1 = dot1.color;
  const color2 = dot2.color;

  const r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius);
  const g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius);
  const b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
  return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
}

function Color(min) {
  min = min || 0;
  this.r = colorValue(min);
  this.g = colorValue(min);
  this.b = colorValue(min);
  this.style = createColorStyle(this.r, this.g, this.b);
}

class Dot {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color.style;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

export default {
  name: 'starry-sky',
  data() {
    return {
      ctx: null,
      dots: '',
      dotsNumber: 400,
      mousePosition: '',
      requestID: null
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.ctx.lineWidth = 0.3;
      this.ctx.strokeStyle = new Color(150).style;

      if (canvas.width < 1400) {
        this.dotsNumber = 200;
      }

      this.mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
      };

      this.dots = {
        nb: this.dotsNumber,
        distance: 100,
        dRadius: 150,
        array: []
      };

      this.createDots();
      this.requestID = requestAnimationFrame(this.animateDots);
    },

    createDots() {
      const len = this.dots.nb;
      for (let i = 0; i < len; i++) {
        this.dots.array.push(new Dot(this.ctx, this.$refs.canvas));
      }
    },

    moveDots() {
      const len = this.dots.nb;
      const canvas = this.$refs.canvas;

      for (let i = 0; i < len; i++) {
        const dot = this.dots.array[i];

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    connectDots() {
      const { dots, mousePosition, ctx } = this;
      const len = dots.nb;

      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          const iDot = dots.array[i];
          const jDot = dots.array[j];

          if (
            iDot.x - jDot.x < dots.distance &&
            iDot.y - jDot.y < dots.distance &&
            iDot.x - jDot.x > -dots.distance &&
            iDot.y - jDot.y > -dots.distance
          ) {
            if (
              iDot.x - mousePosition.x < dots.dRadius &&
              iDot.y - mousePosition.y < dots.dRadius &&
              iDot.x - mousePosition.x > -dots.dRadius &&
              iDot.y - mousePosition.y > -dots.dRadius
            ) {
              ctx.beginPath();
              ctx.strokeStyle = averageColorStyles(iDot, jDot);
              ctx.moveTo(iDot.x, iDot.y);
              ctx.lineTo(jDot.x, jDot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    },

    drawDots() {
      const len = this.dots.nb;
      for (let i = 0; i < len; i++) {
        const dot = this.dots.array[i];
        dot.draw();
      }
    },

    animateDots() {
      const canvas = this.$refs.canvas;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.moveDots();
      this.connectDots();
      this.drawDots();

      this.requestID = requestAnimationFrame(this.animateDots);
    },

    mousemove(e) {
      this.mousePosition.x = e.pageX;
      this.mousePosition.y = e.pageY;
    },

    mouseleave() {
      const canvas = this.$refs.canvas;

      this.mousePosition.x = canvas.width / 3;
      this.mousePosition.y = canvas.height / 3;
    },

    destroy () {
      window.cancelAnimationFrame(this.requestID);
    }
  },

  beforeDestroy () {
    this.destroy();
  }
};
</script>

<style lang="scss" scoped>
.starry-sky {
  width: 100%;
  height: 100%;
}
</style>

