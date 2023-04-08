import { BadgeNivel } from './BadgeNivel';

export class Badge {
  id: number = 0;
  descricao: string = '';
  imagem: string = '';
  status: number = 0;
  badgeNivelId: BadgeNivel['id'] = 0;
  badgeNivel: BadgeNivel = new BadgeNivel();
}
