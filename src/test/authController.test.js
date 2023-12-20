import app from "../app";
import request from "supertest";
import mongoose from "mongoose";


describe("Test authController",  () => {

    let authToken;

    beforeAll(async () => {
    const authResponse =   await request(app)
    .post('/admin/login')
    .send({
        email: "test@gmail.com",
        password: "123456",
    });
    
    authToken = authResponse.body.token;
    
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
      });

	it("should login", async () => {
		const response = await request(app).post("/admin/login").accept("*").send({
			email: "test@gmail.com",
			password: "123456",
		})

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty("admin");
	});

    it("should register", async () => {
        const response = await request(app).post("/admin/register").set('Authorization', `Bearer ${authToken}`).accept("*").send({
            fullName: "teest",
            email: "test10@gmail.com",
            password: "123456",
            confirmPassword: "123456",
        })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("admin");
        expect(response.body).toHaveProperty("message");

    });

    it("should login with error 401", async () => {
		const response = await request(app).post("/admin/login").accept("*").send({
			email: "testtt@gmail.com",
			password: "123456",
		})

		expect(response.status).toBe(401);
	});
    it("should login with error 500", async () => {
		const response = await request(app).post("/admin/login").accept("*").send({ email: "test@gmail.com" });

		expect(response.status).toBe(500);
	});

    

}); 

