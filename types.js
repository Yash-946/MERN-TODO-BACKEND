const zod = require("zod");

const CreateTodo = zod.object({
  title: zod.string(),
  body: zod.string(),
});

const CreateSignUp = zod.object({
    email: zod.string().email(),
    username: zod.string(),
    password: zod.string().min(8, 'Password must be at least 8 characters long'),
});

module.exports = {
    CreateTodo: CreateTodo,
    CreateSignUp: CreateSignUp
}
