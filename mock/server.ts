// Import Fastify and related types
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import cors from '@fastify/cors';
// Import uuid for generating unique IDs
import { v4 as uuidv4 } from 'uuid';

// Configure global response delay (in milliseconds)
const GLOBAL_RESPONSE = 1000;

// Helper function to simulate delay
const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, GLOBAL_RESPONSE));

// Define the Task interface based on the user's specification
interface Task {
  id: string;
  title: string;
  description?: string | null; // description can be optional or null
  completed: boolean;
  createdAt: string; // Using string for ISO 8601 date format
  updatedAt: string; // Using string for ISO 8601 date format
}

// Define the interface for creating a new task (excluding server-generated fields)
interface NewTask {
  title: string;
  description?: string | null;
  completed: boolean;
}

// Define the interface for updating a task (all fields are optional)
interface UpdateTask {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

// In-memory storage for tasks, explicitly typed as an array of Task
const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Task 2',
    description: null,
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Create a Fastify instance with logger enabled
const fastify: FastifyInstance = Fastify({ logger: true });

// Register CORS to allow all origins
fastify.register(cors, {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all common HTTP methods
  allowedHeaders: ['Content-Type'], // Allow Content-Type header
  credentials: true, // Allow credentials
  logLevel: 'info', // Log CORS requests
});

// Options for routes (optional, but good for type safety)
const taskOptions: RouteShorthandOptions = {};

// GET /tasks - Get all tasks
fastify.get<{ Reply: Task[] }>('/api/v1/tasks', taskOptions, async () => {
  // Simulate network delay
  await simulateDelay();
  // Return the current list of tasks
  return tasks;
});

// POST /tasks - Create a new task
fastify.post<{ Body: NewTask; Reply: Task | { message: string } }>(
  '/api/v1/tasks',
  taskOptions,
  async (request, reply) => {
    // Simulate network delay
    await simulateDelay();

    const { title, description, completed } = request.body;

    // Basic validation for required fields
    if (title === undefined || completed === undefined) {
      reply
        .code(400)
        .send({ message: 'Title and completed fields are required.' });
      return;
    }

    // Create a new task object
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuidv4(), // Generate a unique ID
      title,
      description: description === undefined ? null : description, // Handle undefined description
      completed: Boolean(completed), // Ensure completed is a boolean
      createdAt: now,
      updatedAt: now,
    };

    // Add the new task to the in-memory array
    tasks.push(newTask);

    // Send the created task back with a 201 status code
    reply.code(201).send(newTask);
  },
);

// GET /tasks/{taskId} - Get a task by ID
fastify.get<{ Params: { taskId: string }; Reply: Task | { message: string } }>(
  '/api/v1/tasks/:taskId',
  taskOptions,
  async (request, reply) => {
    // Simulate network delay
    await simulateDelay();

    const { taskId } = request.params;

    // Find the task by ID
    const task = tasks.find((t) => t.id === taskId);

    // If task is found, return it
    if (task) {
      return task;
    } else {
      // If task is not found, send a 404 Not Found response
      reply.code(404).send({ message: 'Task not found.' });
    }
  },
);

// PUT /tasks/{taskId} - Update a task by ID
fastify.put<{
  Params: { taskId: string };
  Body: UpdateTask;
  Reply: Task | { message: string };
}>('/api/v1/tasks/:taskId', taskOptions, async (request, reply) => {
  // Simulate network delay
  await simulateDelay();

  const { taskId } = request.params;
  const { title, description, completed } = request.body;

  // Find the index of the task by ID
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  // If task is found
  if (taskIndex !== -1) {
    // Get the existing task
    const existingTask = tasks[taskIndex];

    // Update the task properties if provided in the request body
    if (title !== undefined) {
      existingTask.title = title;
    }
    // Check if description is explicitly provided (can be null)
    if (Object.prototype.hasOwnProperty.call(request.body, 'description')) {
      existingTask.description = description === undefined ? null : description;
    }
    if (completed !== undefined) {
      existingTask.completed = Boolean(completed);
    }

    // Update the updatedAt timestamp
    existingTask.updatedAt = new Date().toISOString();

    // Return the updated task
    return existingTask;
  } else {
    // If task is not found, send a 404 Not Found response
    reply.code(404).send({ message: 'Task not found.' });
  }
});

// DELETE /tasks/{taskId} - Delete a task by ID
fastify.delete<{ Params: { taskId: string }; Reply: { message: string } }>(
  '/api/v1/tasks/:taskId',
  taskOptions,
  async (request, reply) => {
    // Simulate network delay
    await simulateDelay();

    const { taskId } = request.params;

    // Find the index of the task by ID
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    // If task is found
    if (taskIndex !== -1) {
      // Remove the task from the array
      tasks.splice(taskIndex, 1);

      // Send a success response
      reply.code(200).send({ message: 'Task deleted successfully.' });
    } else {
      // If task is not found, send a 404 Not Found response
      reply.code(404).send({ message: 'Task not found.' });
    }
  },
);

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server listening on ${fastify.server.address()}`); // Use address() for string representation
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
