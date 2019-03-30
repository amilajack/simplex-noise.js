import SimplexNoise, { buildPermutationTable } from '../src/lib.browser';
import Alea from 'alea';
import { assert } from 'chai';

describe('SimplexNoise', () => {
  function getRandom() {
    return new Alea('seed');
  }

  describe('buildPermutationTable', () => {
    it('contains all indices exactly once', () => {
      const table = buildPermutationTable(getRandom());
      const aTable = Array.prototype.slice.call(table);
      for (let i = 0; i < aTable.length; i++) {
        assert.include(aTable, i);
      }
    });

    it('can contain 0 in the first position', () => {
      function zero() {
        return 0;
      }
      const table = buildPermutationTable(zero);
      const aTable = Array.prototype.slice.call(table);
      for (let i = 0; i < aTable.length; i++) {
        assert.equal(aTable[i], i);
      }
    });
  });

  describe('constructor', () => {
    function checkPermutationTable({ perm, permMod12 }) {
      assert.equal(perm.length, 512);
      assert.equal(permMod12.length, 512);
      for (let i = 0; i < 512; i++) {
        assert.isBelow(perm[i], 256);
        assert.isAtLeast(perm[i], 0);
        assert.equal(perm[i], perm[i & 255]);
        assert.equal(permMod12[i], perm[i] % 12);
      }
    }

    it('should initialize with Math.random', () => {
      const simplex = new SimplexNoise();
      checkPermutationTable(simplex);
    });

    it('should initialize with a custom random function', () => {
      const simplex = new SimplexNoise(getRandom());
      checkPermutationTable(simplex);
    });

    it('should initialize with seed', () => {
      const simplex = new SimplexNoise('seed');
      checkPermutationTable(simplex);
    });

    it('should initialize consistently when using the same seed', () => {
      const a = new SimplexNoise('seed');
      const b = new SimplexNoise('seed');
      assert.deepEqual(a, b);
      assert.equal(a.noise2D(1, 1), b.noise2D(1, 1));
    });

    it('should initialize differently when using a different seed', () => {
      const a = new SimplexNoise('seed');
      const b = new SimplexNoise('different seed');
      assert.notDeepEqual(a, b);
      assert.notEqual(a.noise2D(1, 1), b.noise2D(1, 1));
    });
  });

  describe('noise', () => {
    let simplex;

    beforeEach(() => {
      simplex = new SimplexNoise(getRandom());
    });

    describe('noise2D', () => {
      it('should return the same value for the same input', () => {
        assert.equal(simplex.noise2D(0.1, 0.2), simplex.noise2D(0.1, 0.2));
      });

      it('should return a different value for a different input', () => {
        assert.notEqual(
          simplex.noise2D(0.1, 0.2),
          simplex.noise2D(0.101, 0.202)
        );
      });

      it('should return a different output with a different seed', () => {
        const simplex2 = new SimplexNoise(new Alea('other seed'));
        assert.notEqual(simplex.noise2D(0.1, 0.2), simplex2.noise2D(0.1, 0.2));
      });

      it('should return values between -1 and 1', () => {
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            assert(simplex.noise2D(x / 5, y / 5) >= -1);
            assert(simplex.noise2D(x / 5, y / 5) <= 1);
          }
        }
      });

      it('should return similar values for similar inputs', () => {
        assert(
          Math.abs(simplex.noise2D(0.1, 0.2) - simplex.noise2D(0.101, 0.202)) <
            0.1
        );
      });
    });

    describe('noise3D', () => {
      it('should return the same value for the same input', () => {
        assert.equal(
          simplex.noise3D(0.1, 0.2, 0.3),
          simplex.noise3D(0.1, 0.2, 0.3)
        );
      });

      it('should return a different value for a different input', () => {
        assert.notEqual(
          simplex.noise3D(0.1, 0.2, 0.3),
          simplex.noise3D(0.101, 0.202, 0.303)
        );
        assert.notEqual(
          simplex.noise3D(0.1, 0.2, 0.3),
          simplex.noise3D(0.1, 0.2, 0.303)
        );
      });

      it('should return a different output with a different seed', () => {
        const simplex2 = new SimplexNoise(new Alea('other seed'));
        assert.notEqual(
          simplex.noise2D(0.1, 0.2, 0.3),
          simplex2.noise2D(0.1, 0.2, 0.3)
        );
      });

      it('should return values between -1 and 1', () => {
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            assert(simplex.noise3D(x / 5, y / 5, x + y) >= -1);
            assert(simplex.noise3D(x / 5, y / 5, x + y) <= 1);
          }
        }
      });

      it('should return similar values for similar inputs', () => {
        assert(
          Math.abs(
            simplex.noise3D(0.1, 0.2, 0.3) -
              simplex.noise3D(0.101, 0.202, 0.303)
          ) < 0.1
        );
      });
    });

    describe('noise4D', () => {
      it('should return the same value for the same input', () => {
        assert.equal(
          simplex.noise4D(0.1, 0.2, 0.3, 0.4),
          simplex.noise4D(0.1, 0.2, 0.3, 0.4)
        );
      });

      it('should return a different value for a different input', () => {
        assert.notEqual(
          simplex.noise4D(0.1, 0.2, 0.3, 0.4),
          simplex.noise4D(0.101, 0.202, 0.303, 0.404)
        );
        assert.notEqual(
          simplex.noise4D(0.1, 0.2, 0.3, 0.4),
          simplex.noise4D(0.1, 0.2, 0.3, 0.404)
        );
      });

      it('should return a different output with a different seed', () => {
        const simplex2 = new SimplexNoise(new Alea('other seed'));
        assert.notEqual(
          simplex.noise2D(0.1, 0.2, 0.3, 0.4),
          simplex2.noise2D(0.1, 0.2, 0.3, 0.4)
        );
      });

      it('should return values between -1 and 1', () => {
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            assert(simplex.noise4D(x / 5, y / 5, x + y, x - y) >= -1);
            assert(simplex.noise4D(x / 5, y / 5, x + y, x - y) <= 1);
          }
        }
      });

      it('should return similar values for similar inputs', () => {
        assert(
          Math.abs(
            simplex.noise4D(0.1, 0.2, 0.3, 0.4) -
              simplex.noise4D(0.101, 0.202, 0.303, 0.404)
          ) < 0.1
        );
      });
    });
  });
});
