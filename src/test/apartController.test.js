import app from "../app";
import request from "supertest";





describe("Test apartController", () => {


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
    
    it("should get all aparts", async () => {
        const response = await request(app).get("/apartment").set('Authorization', `Bearer ${authToken}`).accept("*").send()
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should get paymentFacture", async () => {
        const apartmentId = "65819a0cf2df0a72897f7991"
        const response = await request(app).get(`/apartment/facture/${apartmentId}`).set('Authorization', `Bearer ${authToken}`).accept("*").send()
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should create apart", async () => {



        const response = await request(app).post("/apartment").set('Authorization', `Bearer ${authToken}`).accept("*").send({
            firstNameOwner: "test1",
            lastNameOwner: "test1",
            phone: "9999999999",
            cin: "hr9991",
            numberApart: "30",
            floor: "3"
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("apartment");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("facture");

    }),

    it("Should delete apart " , async()=>{
        const apartID = "6580cccd0f14de570273e571"
        const response = await request(app).delete(`/apartment/${apartID}`).set('Authorization', `Bearer ${authToken}`).accept("*").send()
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");

    
    })

    it("should update apart", async () => {


        const apartID = "657629f2a98a0d85fb1155ca"

        const response = await request(app).patch(`/apartment/${apartID}`).set('Authorization', `Bearer ${authToken}`).accept("*").send({
            firstNameOwner: "kimo",
            lastNameOwner: "cherra",
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("apartment");
        expect(response.body).toHaveProperty("message");

    }),

    it("should update Payement Status", async () => {
            

    
            const apartID = "6580cdd36c74bfc0408602ea"
    
            const response = await request(app).patch(`/apartment/pay/${apartID}`).set('Authorization', `Bearer ${authToken}`).accept("*").send()
    

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("facture");
            expect(response.body).toHaveProperty("message");
    
        }),


    it("should create apartment with error 500", async () => {


        const response = await request(app).post("/apartment").set('Authorization', `Bearer ${authToken}`).accept("*").send({
            firstNameOwner: "test1",
            lastNameOwner: "test1",
            phone: "45672245678",
            cin: "hq5628",
            numberApart: "12",
            floor: "3"
        })

        expect(response.status).toBe(500);
        expect(response).toHaveProperty("text");

    }),
    it("should create apartment with error 400", async () => {


        const response = await request(app).post("/apartment").set('Authorization', `Bearer ${authToken}`).accept("*").send({
            firstNameOwner: "test1",
            lastNameOwner: "test1",
            phone: "45672245678",
            cin: "hq5628",
           
        })

        expect(response.status).toBe(400);

    })

    it("should get Paid facture with error", async () => {


        const apartmentId = "65819a0cf2df0a72897f7992"
        const response = await request(app).get(`/apartment/facture/${apartmentId}`).set('Authorization', `Bearer ${authToken}`).accept("*").send()


      
        expect(response.status).toBe(500);
        expect(response).toHaveProperty("text");

    }),

    it("should update apart with error", async () => {

        const apartID = "657629f2a98a0d85fb1155caa"

        const response = await request(app).patch(`/apartment/${apartID}`).set('Authorization', `Bearer ${authToken}`).accept("*").send({
            firstNameOwner: "kimo",
            lastNameOwner: "cherra",
        })

        expect(response.status).toBe(404);

    })






});