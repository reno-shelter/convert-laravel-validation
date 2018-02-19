# convert-laravel-validation

Convert error messages from laravel validation to javascript object as easy to use format.

## Description

Laravel validation message will return like this.

```json
{
  "staff.0.id": ["The id field is required."],
  "staff.0.name": ["The name field is required."],
  "staff.1.id": ["The id field is required."],
  "staff.1.name": ["The name field is required."],
}
```

And this package convert to this.

```json
{
  "staff": {
    "0": {
      "name": ["The name field is required."],
      "id": ["The id field is required."],
    },
    "1": {
      "name": ["The name field is required."],
      "id": ["The id field is required."],
    }
  }
}
```

You can set default value 2nd argument

ex) The error contains 2 elements of array, but application treats 3 elements of array

```json
{
  "staff": {
    "0": {
      "name": ["The name field is required."],
      "id": ["The id field is required."],
    },
    "1": {
      "name": ["The name field is required."],
      "id": ["The id field is required."],
    },
    "2": {
      "name": [""],
      "id": [""],
    }
  }
}
```

## Usage

### Install

```bash
# yarn
$ yarn add convert-laravel-validation
# npm
$ npm install convert-laravel-validation
```

### With axios

```js
import { convertValidationError } from 'convert-laravel-validation'

async fetch() {
  try {
    const userData = await axios.get('/api/user')
    // ...
  } catch (err) {
    const errMsg = convertValidationError(err.response.data.errors)
    // or
    const errMsg = convertValidationError(err.response.data.errors, defaultErrMsg)
    // ...
  }
}
```
