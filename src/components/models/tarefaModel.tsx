interface Tarefa {
    id?: number
    titulo: string
    descricao: string
    status: 'PENDENTE' | 'CONCLUIDA' | 'EM_ANDAMENTO'
    dataCriacao: string
  }