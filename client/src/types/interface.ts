interface User {
  username: string;
  password: string;
}

interface Register {
  username: string;
  email: string;
  password: string;
}

interface Verifi {
  token: string;
}


export type{ User, Register, Verifi};