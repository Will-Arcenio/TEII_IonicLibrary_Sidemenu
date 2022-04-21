import { Pipe, PipeTransform } from '@angular/core';
import { Genero } from './books';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: Genero): string {
    switch (value) {
      case Genero.FANTASIA:
        return 'Fantasia';
      case Genero.FICCAO_CIENTIFICA:
        return 'Ficção Científica';
      case Genero.FICCAO_LITERARIA:
        return 'Ficção Literária';
      case Genero.HORROR:
        return 'Horror';
      case Genero.NAO_FICCAO:
        return 'Não Ficção';
      case Genero.POESIA:
        return 'Poesia';
      case Genero.RELIGIOSO:
        return 'Religioso';
      case Genero.ROMANCE:
        return 'Romance';
      case Genero.SUSPENSE:
        return 'Suspense';
    }
  }

}
