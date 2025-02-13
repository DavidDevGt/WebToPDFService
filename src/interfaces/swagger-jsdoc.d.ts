declare module 'swagger-jsdoc' {
  declare module 'swagger-jsdoc';
  import { Options } from 'swagger-jsdoc';

  function swaggerJsdoc(options: Options): string;
  function swaggerJsdoc(options: Options, callback: (err: Error, data: string) => void): void;

  export = swaggerJsdoc;
}
