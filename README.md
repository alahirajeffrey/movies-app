## Requirements

- [Nodejs](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Nestjs](https://nestjs.com/) is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Typescript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints
| HTTP Verbs | Endpoints | Action | Required |
| --- | --- | --- | --- |
| GET | localhost:3000/api/v1 | return homepage| |
| GET | localhost:3000/api/v1/generate-qrcode | generate qrcode containing link with movies| |
| GET | localhost:3000/api/v1/movie-list | get a list of 10 movies every 10 seconds| |

## How to use
- Navigate to the endpoint to generate the qrcode 
```
localhost:3000/api/v1/generate-qrcode
```
- scan qrcode to get a list of movies
### Developer

[Alahira Jeffrey](https://github.com/alahirajeffrey)

## License

Nest is [MIT licensed](LICENSE).
