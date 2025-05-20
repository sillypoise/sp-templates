import app from "@app";
import { resetDb } from "@db/test-utils";
import request from "supertest";

describe("/health controller ", () => {
	describe("GET /api/v1/health", () => {
		beforeEach(() => {
			resetDb();
		});
		it("should return 200 with status ok", async () => {
			const res = await request(app).get("/api/v1/health");

			expect(res.status).toBe(200);
			expect(res.body).toEqual(
				expect.objectContaining({
					status: "ok",
					timestamp: expect.any(String),
				}),
			);
		});
	});
});
