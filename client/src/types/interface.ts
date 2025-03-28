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

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface Team {
  id: string;
  name: string;
  addon: { value: string };
  is_vip: boolean;
  vip_end: string;
  owner: {
    username: string;
  };
}

interface RequestsTeam {
  name: string;
  addon:  string ;
  password: string;
}

export type { User, Register, Verifi, AuthResponse, Team, RequestsTeam };
