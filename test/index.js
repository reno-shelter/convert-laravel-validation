import test from 'ava'
import { convertValidationError } from '../src/index'

test('convert single depth errors', t => {
  const err = {
    response: {
      status: 422,
      data: {
        errors: {
          name: ['The name field is required.'],
          password: ['The password field is required.'],
        },
      },
    },
  }
  t.deepEqual(convertValidationError(err), {
    name: ['The name field is required.'],
    password: ['The password field is required.'],
  })
})

test('convert nested errors', t => {
  const err = {
    response: {
      status: 422,
      data: {
        errors: {
          'staff.id': ['The id field is required.'],
          'staff.name': ['The name field is required.'],
        },
      },
    },
  }
  t.deepEqual(convertValidationError(err), {
    staff: {
      id: ['The id field is required.'],
      name: ['The name field is required.'],
    },
  })
})

test('convert nested iterative errors', t => {
  const err = {
    response: {
      status: 422,
      data: {
        errors: {
          'staff.0.id': ['The id field is required.'],
          'staff.0.name': ['The name field is required.'],
          'staff.1.id': ['The id field is required.'],
          'staff.1.name': ['The name field is required.'],
        },
      },
    },
  }
  t.deepEqual(convertValidationError(err), {
    staff: {
      0: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
      1: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
    },
  })
})

test('convert nested iterative errors with default errMsg', t => {
  const err = {
    response: {
      status: 422,
      data: {
        errors: {
          'staff.0.id': ['The id field is required.'],
          'staff.0.name': ['The name field is required.'],
          'staff.1.id': ['The id field is required.'],
          'staff.1.name': ['The name field is required.'],
        },
      },
    },
  }
  const defaultErrMsg = {
    staff: {
      0: {
        name: [''],
        id: [''],
      },
      1: {
        name: [''],
        id: [''],
      },
      2: {
        name: [''],
        id: [''],
      },
    },
  }
  t.deepEqual(convertValidationError(err, defaultErrMsg), {
    staff: {
      0: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
      1: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
      2: {
        name: [''],
        id: [''],
      },
    },
  })
})

test('convert various errors', t => {
  const err = {
    response: {
      status: 422,
      data: {
        errors: {
          'address.prefecture': ['The prefecture field is required.'],
          'address.zipcode': ['The zipcode field is required.'],
          'staff.0.id': ['The id field is required.'],
          'staff.0.name': ['The name field is required.'],
          'staff.1.id': ['The id field is required.'],
          'staff.1.name': ['The name field is required.'],
        },
      },
    },
  }
  t.deepEqual(convertValidationError(err), {
    address: {
      prefecture: ['The prefecture field is required.'],
      zipcode: ['The zipcode field is required.'],
    },
    staff: {
      0: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
      1: {
        name: ['The name field is required.'],
        id: ['The id field is required.'],
      },
    },
  })
})
