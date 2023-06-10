import {GrauDificuldade} from "../grauDificuldade/grauDificuldade";
import {Badge} from "../badge/Badge";

export class SituacaoAprendizagem {
    titulo: string = "";
    descricao: string = "";
    duracao: null = null;
    ordem: number = 0;
    status: number = 0;
    planejamentoUCId: number = 0;
    planejamentoUC: null = null;
    grauDificuldadeId: number = 0;
    grauDificuldade: GrauDificuldade = new GrauDificuldade();
    badgeId: null = null;
    badge: Badge = new Badge();
    atividades: null = null;
    objetosAprendizagem: null = null;
}
