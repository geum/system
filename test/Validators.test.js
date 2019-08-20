const validators = require('../src/assets/validators');

test('validator test', () => {
  expect(char_gt('hi', 4)).toBe(false);
  expect(char_gt('hello', 4)).toBe(true);
});
