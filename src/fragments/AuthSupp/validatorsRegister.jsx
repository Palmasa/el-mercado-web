const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const CATEGS = ['Aceites y vinagres', 'Café y té', 'Carne y aves', 'Charcutería', 'Quesería', 'Ibéricos','Panes, cereales y harinas',
'Conservas', 'Dulces', 'Sal y especias', 'Lácteos y huevos', 'Legumbres', 'Mermeladas y miel', 'Encurtidos', 'Pastas y arroces',
'Pescados', 'De la Huerta',]

export const TYPES = [ 'Proveedor', 'Productor' ]

export const validators = {
  email: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir el email'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Es necesario introducir un email válido'
    }
    return message
  },
  password: (value) => {
    let message
    if (!value) {
      message = 'Es necesario introducir la contraseña'
    } else if (value.length < 6) {
      message = 'La contraseña introducida debete tener mínimo 6 caracteres'
    }
    return message
  },
  name: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  categ: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  type: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  CIF: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  bio: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  logo: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  imgs: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  city: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  street: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  number: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  zip: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  ownerName: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  ownerBio: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  },
  ownerImg: (value) => {
    let message
    if (!value) {
      message = 'Este campo es necesario'
    }
    return message
  }
}

/* ,
    errors: {
      email: validators.email, password: validators.password,
      name: validators.name, categ: validators.categ, type: validators.type, CIF: validators.CIF,
      bio: validators.bio, logo: validators.logo, imgs: validators.imgs,
      city: validators.city, street: validators.street, number: validators.number, zip: validators.zip,
      ownerName: validators.ownerName, ownerBio: validators.ownerBio, ownerImg: validators.ownerImg
    } */