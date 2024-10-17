import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/tarefas',
});

// Obter uma tarefa pelo ID
export const obterTarefa = async (id:Number) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter tarefa:', error);
    throw error;
  }
};

// Listar todas as tarefas
export const listarTarefas = async () => {
  try {
    const response = await api.get('', {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    throw error;
  }
};

// Criar uma nova tarefa
export const criarTarefa = async (tarefa:Tarefa) => {
  try {
    const response = await api.post('', tarefa);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};

// Atualizar uma tarefa pelo ID
export const atualizarTarefa = async (id:Number, tarefa:Tarefa) => {
  try {
    const response = await api.put(`/${id}`, tarefa);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

// Deletar uma tarefa pelo ID
export const deletarTarefa = async (id:Number) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};
