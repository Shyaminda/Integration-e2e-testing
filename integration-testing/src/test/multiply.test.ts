import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "..";
import request from "supertest";
import resetDb from "./helpers/reset-db";

describe("POST /multiply", () => {
    beforeAll(async () => {
        console.log("clearing db");
        await resetDb();
    });

    it("should multiply 2 numbers", async () => {
        const { status, body } = await request(app).post('/multiply').send({
            a: 1,
            b: 2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 2, id: expect.any(Number) });
    });

    it("should multiply 2 negative numbers", async () => {
        const { status, body } = await request(app).post('/multiply').send({
            a: -1,
            b: -2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 2, id: expect.any(Number) });
    });
})