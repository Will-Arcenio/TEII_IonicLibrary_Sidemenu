export interface Books {
  id: number;
  referencia: string;
	nome: string;
	sinopse: string;
  genero: Genero;
	autor: string;
  editora: string;
  publicacao: Date;
  preco: number;
	imagem: string;
}

export enum Genero {
  FICCAO_LITERARIA  = 'Ficção Literária',
  NAO_FICCAO        = 'Não Ficção',
  SUSPENSE          = 'Suspense',
  FICCAO_CIENTIFICA = 'Ficção Científica',
  FANTASIA          = 'Fantasia',
  HORROR            = 'Horror',
  POESIA            = 'Poesia',
  ROMANCE           = 'Romance',
  RELIGIOSO         = 'Religioso'
}
