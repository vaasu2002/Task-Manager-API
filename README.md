# Task Manager API

The Task Manager API is a RESTful API built using Node.js, Express.js, and NPM packages. It allows users to manage tasks with title, description, and completion status. This API enables CRUD operations (Create, Read, Update, and Delete) on tasks, providing a convenient way to manage task data efficiently.

## Documentation
[Postman Documentation](https://documenter.getpostman.com/view/19379633/2s946pZpN4)
## Features
- Retrieve all tasks from the task manager.
- Retrieve a specific task by its unique identifier (ID).
- Create a new task with title, description, and completion status.
- Update an existing task by its ID with new title, description, or completion status.
- Delete a task by its ID.

## Getting Started
1. Clone the repository: `git clone https://github.com/vaasu2002/Task-Manager-API.git`
2. Install dependencies: `npm install`
3. Setup .env and add PORT environment
3. Start the server: `npm run dev`

## Endpoints
- `GET /tasks`: Retrieve all tasks.
- `GET /tasks/:id`: Retrieve a specific task by its ID.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task by its ID.
- `DELETE /tasks/:id`: Delete a task by its ID.

## Data Store
The Task Manager API utilizes a JSON file named `data.json` as the data store to persist task data. Each task is stored as a JSON object in the file with the following properties:

```json
{
    "id": 1,
    "task_title": "Task 1",
    "task_description": "Task 1 Description",
    "flag": "PENDING"
}
```

## Error Handling
The API is designed with proper error handling for invalid requests, such as incorrect endpoint usage, missing parameters, or invalid data inputs. In case of an error, the API responds with an appropriate error message and status code to inform the client about the issue.

## Input Validation
The API implements input validation for task creation and updates to ensure that the `task_title` and `task_description` fields are not empty, and the `flag` field, if provided, is a valid boolean value.

## Testing
The API has been thoroughly tested using Postman to ensure its functionality and reliability. All endpoints have been tested for expected responses, error handling, and edge cases to provide a robust user experience.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
