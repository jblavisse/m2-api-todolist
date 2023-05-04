const request = require("supertest");

// GET ALL
it("/tasks must return all tasks", async () => {
  // 1. Exécuter la requête
  // 2. Vérifier le type de réponse
  // Autrement dit, du JSON
  // 3. Vérifier le code status HTTP
  const response = await request("http://localhost:3000")
    .get("/tasks")
    .expect(200)
    .expect("Content-Type", /json/);

  // 3. Checker que les données
  // obtenues par notre réponse soient conformes
  expect(response.body).toBeInstanceOf(Array);
});

it("/tasks/1 must return one correct task", async () => {
  const res = await request("http://localhost:3000")
    .get("/tasks")
    .expect(200)
    .expect("Content-Type", /json/);

  const task = res.body[0];

  const res2 = await request("http://localhost:3000").get("/tasks/" + task.id);

  expect(res2.body).toHaveProperty("title");
  expect(res2.body).toHaveProperty("completed");

  expect(res2.body.id).toBe(task.id);
  expect(res2.body.title).toBe(task.title);
  expect(res2.body.completed).toBe(task.completed);
});
