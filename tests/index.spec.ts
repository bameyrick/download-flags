import { helloWorld } from '../src';

describe(`Boilerplate`, () => {
  beforeEach(() => {});

  it(`Should log`, () => {
    jest.spyOn(console, 'log');

    helloWorld();

    expect(console.log).toHaveBeenCalledWith('Hello world');
  });
});
