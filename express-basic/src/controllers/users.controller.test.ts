import request from "supertest";
import app from "@app";

describe("Users Controller", () => {
  describe("GET /api/users", () => {
    it("returns 200 and a list of users", async () => {
      const res = await request(app).get("/api/users");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/users", () => {
    it("creates a new user and returns 201", async () => {
      const user = {
        name: "Test User",
        email: `test+${Date.now()}@example.com`,
      };

      const res = await request(app).post("/api/users").send(user);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: user.name,
          email: user.email,
          created_at: expect.any(String),
        }),
      );
    });

    it("returns 400 when given invalid input", async () => {
      const res = await request(app).post("/api/users").send({
        name: "",
        email: "not-an-email",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("details");
    });
  });
});
