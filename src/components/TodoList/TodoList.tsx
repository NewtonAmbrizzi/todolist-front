import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import styles from './TodoList.module.css';
import { listarTarefas, criarTarefa, atualizarTarefa, deletarTarefa } from '../../services/tarefaService';

type TodoStatus = 'pendente' | 'em_andamento' | 'concluída';

interface Todo {
  id: number;
  text: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  status: TodoStatus;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<TodoStatus | 'todas'>('todas');

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const dados = await listarTarefas();
        setTodos(dados.map((tarefa: any) => ({
          id: tarefa.id,
          text: tarefa.titulo,
          description: tarefa.descricao,
          createdAt: new Date(tarefa.dataCriacao),
          completed: tarefa.status === 'CONCLUIDA',
          status: tarefa.status.toLowerCase() as TodoStatus,
        })));
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    carregarTarefas();
  }, []);

  const addTodo = async () => {
    if (newTodoText.trim() !== '') {
      const novaTarefa:Tarefa = {
        titulo: newTodoText,
        descricao: newTodoDescription,
        status: 'PENDENTE',
        dataCriacao: new Date().toISOString(),
      };

      try {
        const tarefaCriada = await criarTarefa(novaTarefa);
        setTodos([
          ...todos,
          {
            id: tarefaCriada.id,
            text: tarefaCriada.titulo,
            description: tarefaCriada.descricao,
            createdAt: new Date(tarefaCriada.dataCriacao),
            completed: false,
            status: 'pendente',
          },
        ]);
        setNewTodoText('');
        setNewTodoDescription('');
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedStatus = todo.completed ? 'PENDENTE' : 'CONCLUIDA';

      try {
        await atualizarTarefa(id, {
          titulo: todo.text,
          descricao: todo.description,
          status: updatedStatus,
          dataCriacao: todo.createdAt.toISOString(),
        });
        setTodos(todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed, status: updatedStatus.toLowerCase() as TodoStatus } : t
        ));
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deletarTarefa(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const startEditing = (id: number) => {
    setEditingId(id);
    const todoToEdit = todos.find((t) => t.id === id);
    if (todoToEdit) {
      setNewTodoText(todoToEdit.text);
      setNewTodoDescription(todoToEdit.description);
    }
  };

  const updateTodo = async () => {
    if (editingId !== null) {
      const todoToUpdate = todos.find((t) => t.id === editingId);
      if (todoToUpdate) {
        const updatedTodo:Tarefa = {
          titulo: newTodoText,
          descricao: newTodoDescription,
          status: todoToUpdate.status.toUpperCase()  as 'PENDENTE' | 'CONCLUIDA' | 'EM_ANDAMENTO',
          dataCriacao: todoToUpdate.createdAt.toISOString(),
        };

        try {
          await atualizarTarefa(editingId, updatedTodo);
          setTodos(todos.map((t) =>
            t.id === editingId ? { ...t, text: newTodoText, description: newTodoDescription } : t
          ));
          setEditingId(null);
          setNewTodoText('');
          setNewTodoDescription('');
        } catch (error) {
          console.error('Erro ao atualizar tarefa:', error);
        }
      }
    }
  };

  const updateTodoStatus = async (id: number, status: TodoStatus) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo:Tarefa = {
        id:todo.id,
        titulo: todo.text,
        descricao: todo.description,
        status: status.toUpperCase() as 'PENDENTE' | 'CONCLUIDA' | 'EM_ANDAMENTO',
        dataCriacao: todo.createdAt.toISOString(),
      };

      try {
        await atualizarTarefa(id, updatedTodo);
        setTodos(todos.map((t) =>
          t.id === id ? { ...t, status } : t
        ));
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
      }
    }
  };

  const filteredTodos = filter === 'todas' ? todos : todos.filter((t) => t.status === filter);

  return (
    <div className={styles.todoListContainer}>
      <h1 className={styles.title}>Lista de Tarefas</h1>
      <TodoInput
        text={newTodoText}
        description={newTodoDescription}
        onTextChange={setNewTodoText}
        onDescriptionChange={setNewTodoDescription}
        onAdd={addTodo}
        onUpdate={updateTodo}
        editingId={editingId}
      />
      <TodoFilter value={filter} onChange={setFilter} />
      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={startEditing}
            onStatusChange={updateTodoStatus}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
