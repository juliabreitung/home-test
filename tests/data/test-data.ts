/**
 * Datos de prueba documentados en el README del challenge.
 * No incluir secretos reales: las credenciales son datos públicos de la demo app.
 */

/** Rutas relativas a env.baseURL */
export const routes = {
  login: '/login',
  checkout: '/checkout',
  grid: '/grid',
  search: '/search',
  home: '/home',
  order: '/order',
} as const;

export const loginTestData = {
  valid: {
    username: 'johndoe19',
    password: 'supersecret',
  },
  /** README: "wrong username/password" — valores genéricos, no válidos en la app */
  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
} as const;

export const searchTestData = {
  term: 'automation',
  emptyMessage: 'Please provide a search word.',
  resultPrefix: 'Found one result for',
} as const;

export const gridTestData = {
  /** Posición 1-based según el escenario "Grid Item Test" del README */
  position7: {
    title: 'Super Pepperoni',
    price: '$10',
  },
} as const;

export type CheckoutBillingData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type CheckoutPaymentData = {
  cardName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

/**
 * Valores de ejemplo para completar el checkout (demo app, no datos reales).
 * expMonth debe coincidir con el label visible en el <select id="expmonth">.
 */
export const checkoutTestData = {
  billing: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
  },
  payment: {
    cardName: 'John Doe',
    cardNumber: '4111111111111111',
    expMonth: 'September',
    expYear: '2028',
    cvv: '123',
  },
} as const satisfies {
  billing: CheckoutBillingData;
  payment: CheckoutPaymentData;
};
