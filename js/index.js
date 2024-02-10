(() => {

  // Page sizes
  const pWidth = window.innerWidth;
  const pHeight = window.innerHeight;

  /**
   * @type {CanvasRenderingContext2D}
   */
  const ctx = document.getElementById('cvs').getContext('2d');
  ctx.canvas.width = pWidth;
  ctx.canvas.height = pHeight;

  /**
   * Number of rows and columns of particles in the page.
   * The total number of particles is calculated as cols*rows.
   * Change the values of cols and rows to obtain different effects
   */
  const cols = 100;
  const rows = 20;
  // Space between particles
  const offset = 2;
  // Triangle height
  const height = (pWidth - offset * (cols - 1)) / cols;
  // Triangle edge
  const edge = 2 * height / Math.sqrt(3);

  const particles = [];
  // Create particles starting from the bottom
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // Build trinagle vertex coordinates
      let x1, y1;
      let x2, y2;
      let x3, y3;
      x1 = (height * j) + offset * (j + 1);
      x3 = x1 + height;
      y2 = ((pHeight - edge) - (edge / 2 * i)) - (offset * i);
      if ((j + i) % 2 == 0) {
        // <|
        x2 = x1 + height;
        y1 = ((pHeight - (edge / 2)) - (edge / 2 * i)) - (offset * i);
        y3 = (pHeight - (edge / 2 * i)) - (offset * i);
      } else {
        // |>
        x2 = x1;
        y1 = (pHeight - (edge / 2 * i)) - (offset * i);
        y3 = ((pHeight - (edge / 2)) - (edge / 2 * i)) - (offset * i);
      }
      let tr = new Triangle(ctx, x1, y1, x2, y2, x3, y3);
      tr.show();
      row.push(tr);
    }
    particles.push(row);
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, pWidth, pHeight);

    const pLen = particles.length;
    for (let i = 0; i < pLen; i++) {
      const row = particles[i];
      const rLen = row.length;
      for (let j = 0; j < rLen; j++) {
        const particle = row[j];
        if (particle.centerY() <= 0) continue;
        // Complicated way to say:
        // If you are in the last upper row or the upper particle is out of the screen or is far enough to the current one
        if (i == pLen - 1 || particles[i+1][j].centerY() <= 0 || particle.centerY() - particles[i+1][j].centerY() > edge + offset) {
          // Update particle size and position
          particle.up();
          particle.resize();
        }
        particle.show();
      }
    }

    // Call next animation
    window.requestAnimationFrame(draw);
  }

  // Start animation loop
  window.requestAnimationFrame(draw);

})();