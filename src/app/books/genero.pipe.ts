import { Pipe, PipeTransform } from '@angular/core';
import { Genero } from './books';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'FANTASIA':
        return 'Fantasia';
      case 'FICCAO_CIENTIFICA':
        return 'Ficção Científica';
      case 'FICCAO_LITERARIA':
        return 'Ficção Literária';
      case 'HORROR':
        return 'Horror';
      case 'NAO_FICCAO':
        return 'Não Ficção';
      case 'POESIA':
        return 'Poesia';
      case 'RELIGIOSO':
        return 'Religioso';
      case 'ROMANCE':
        return 'Romance';
      case 'SUSPENSE':
        return 'Suspense';
    }
  }

}
