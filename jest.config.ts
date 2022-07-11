import { InitialOptionsTsJest } from 'ts-jest';

const esModules = [].join('|');

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
} as InitialOptionsTsJest;
