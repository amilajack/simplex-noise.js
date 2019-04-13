# simplex-noise.js

simplex-noise.js is a fast simplex noise implementation in Javascript. It works in the browser and on nodejs.

[![Build Status](https://dev.azure.com/amilajack/amilajack/_apis/build/status/amilajack.simplex-noise.js?branchName=master)](https://dev.azure.com/amilajack/amilajack/_build/latest?definitionId=15&branchName=master)

## Demos

- Simple 2D plasma on [codepen.io](http://codepen.io/jwagner/pen/BNmpdm/?editors=001).
- [3D voxel world generation](http://29a.ch/sandbox/2012/voxelworld/) example.
- Film grain in [analog film emulator](http://29a.ch/film-emulator/).

## Install

```bash
npm install @amilajack/simplex-noise
```

## Usage

By default simplex-noise.js will use `Math.random()` to seed the noise.
```js
import SimplexNoise from '@amilajack/simplex-noise';
// initializing a new simplex instance
// do this only once as it is relatively expensive
const simplex = new SimplexNoise();
const value2d = simplex.noise2D(x, y);
const value3d = simplex.noise3D(x, y, z);
const value4d = simplex.noise4D(x, y, z, w);
```

You can also pass in a seed string which will then be used to initialize
the noise using the built in alea PRNG.
```js
import SimplexNoise from '@amilajack/simplex-noise';

const simplex = new SimplexNoise('seed');
const value2d = simplex.noise2D(x, y);
const sameSeed = new SimplexNoise('seed');
const differentSeed = new SimplexNoise('different seed');

sameSeed.noise2D(x, y) === value2d
differentSeed.noise2D(x, y) !== value2d
```

You can also pass an alternative random function to the constructor that is
used to build the permutation table.
This can be used with a custom pseudo random number generator:

```js
import SimplexNoise from '@amilajack/simplex-noise';
import Alea from 'alea';

const random = new Alea(seed);
const simplex = new SimplexNoise(random);
const value2d = simplex.noise2D(x, y);
```

The ALEA PRNG can be found on in the npm package [alea](https://npmjs.org/package/alea).

## node.js

Node.js is also supported, you can install the package using [npm](https://npmjs.org/package/simplex-noise).

```js
const SimplexNoise = require('simplex-noise');
const simplex = new SimplexNoise(Math.random);
const value2d = simplex.noise2D(x, y);
```

## Benchmarks

- [Comparison between 2D and 3D noise](http://jsperf.com/simplex-noise/4)
- [Comparison with simplex implementation in three.js](http://jsperf.com/simplex-noise-comparison/3)

For development you can open `perf/index.html` and watch the console or run `node perf/benchmark.js` in a shell.
There is also a rake task for comparing your current changes can also run `make compare`.
The command works using git stash.
