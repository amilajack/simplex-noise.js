const Benchmark = this.Benchmark || require('benchmark');
const SimplexNoise = this.SimplexNoise || require('../simplex-noise');
const simplex = new SimplexNoise();

const suite = new Benchmark.Suite('simplex-noise')
  .add('init', () => {
    const simplex = new SimplexNoise();
  })
  .add('noise2D', () => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        for (let z = 0; z < 8; z++) {
          simplex.noise2D(x / 8, y / 8);
        }
      }
    }
  })
  .add('noise3D', () => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        for (let z = 0; z < 8; z++) {
          simplex.noise3D(x / 8, y / 8, z / 8);
        }
      }
    }
  })
  .add('noise3D2', () => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        for (let z = 0; z < 8; z++) {
          simplex.noise3D(x / 8, y / 8, z / 8);
        }
      }
    }
  })
  .add('noise4D', () => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        for (let z = 0; z < 8; z++) {
          simplex.noise4D(x / 8, y / 8, z / 8, (x + y) / 16);
        }
      }
    }
  })
  .on('complete', function() {
    this.forEach(({ name, times, stats }) => {
      console.log(
        `${name}: ${Benchmark.formatNumber(
          Math.round(1.0 / times.period)
        )} ops/sec ±${Math.round(stats.rme)}%`
      );
    });
  })
  .run();
