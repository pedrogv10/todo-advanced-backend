const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { title, description = '' } = task;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, description, created_at ) VALUES (?,?,?,?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', description, dateUTC]);

    return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, status, description = '' } = task;

    const query = 'UPDATE tasks SET title = ?, status = ?, description = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [title, status, description, id]);
    return updatedTask;
};


module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};