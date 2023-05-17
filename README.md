# ZENV

ZENV is a TypeScript library for validating and parsing configuration files. It
is based on the popular Zod library, which provides a simple and intuitive API
for defining and validating data schemas.

## Installation

To install ZENV, use npm:

```bash
npm install @d6v/zenv
```

## Usage

To use ZENV, first define a schema for your configuration file using the Zod
API. Then, use the parse function provided by ZENV to parse and validate your
configuration file.

Here's an example:

```ts
import { z } from "zod";
import { zenv } from "@d6v/zenv";

const schema = z.object({
  port: z.number().min(0).max(65535),
  host: z.string().optional(),
  debug: z.boolean().optional(),
});

const validatedEnv = zenv(schema);
```

In this example, we define a schema for a configuration file that has three
properties: `port`, `host`, and `debug`. The `port` property is required and
must be a number between 0 and 65535. The `host` and `debug` properties are
optional and can be either a string or a boolean, respectively.

## API

ZENV provides the following API:

`zenv(schema: z.ZodSchema, env: EnvVariables): z.infer<z.ZodSchema>` Parses and
validates an env variables object using the given Zod schema. Returns an object
with the parsed values if the object is valid, or throws an error with a
detailed error message if the object is invalid.

## License

ZENV is licensed under the MIT License. See the LICENSE file for more
information.
