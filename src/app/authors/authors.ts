export interface Authors {
  id: number;
  nome: string;
  sobrenome: string;
  nacionalidade: Nacionalidade;
  redes: string;
  nascimento: Date;
  retrato: string;
}

export enum Nacionalidade {
  BRASIL   = 'Brasileiro(a)',
  EUA      = 'Norte Americano(a)',
  ENGLISH  = 'Britânico(a)',
  KOREAN   = 'Coreano(a)',
  JAPANESE = 'Japonês(a)',
  ISRAEL   = 'Israelense'
}
