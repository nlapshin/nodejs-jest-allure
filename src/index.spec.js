import supertest from "supertest";
import { faker } from '@faker-js/faker';
import { Severity } from 'jest-allure/dist/Reporter'
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

function buildUser() {
  return {
    userName: faker.internet.userName(),
    password: faker.internet.password(20, false, /[a-zA-Z0-9_$%#!@]/)
  }
}

class User {
  static make() {
    return {
      userName: faker.internet.userName(),
      password: faker.internet.password(20, false, /[a-zA-Z0-9_$%#!@]/, '_')
    }
  }

  static makeWithIncorrectPassword() {
    return {
      userName: faker.internet.userName(),
      password: faker.internet.password()
    }
  }
}

const userRequest = {
  async create(user = buildUser()) {
    return await supertest('https://bookstore.demoqa.com')
        .post('/account/v1/user')
        .set('Accept', 'application/json')
        .send(user);
  }
}


beforeEach(() => {
  reporter.addEnvironment('Stand', 'STAGING');
})

describe("Book", () => {
  describe('POST /book/1/order', () => {
    test("Should order book", async () => {
      reporter
        .epic('Book Tests')
        .feature('Book Order Feature')
        .story('Book New Order Story')
        .description('Book or description')
        .severity(Severity.Minor);

        reporter.startStep("Authorize");

        reporter.endStep();
  
        reporter.startStep("Add books to the cart");

        expect(1).toEqual(2);

        reporter.endStep();

        reporter.startStep("Checkout");

        reporter.endStep();
    });
  });
});








describe("User", () => {
  beforeEach(() => {
    reporter.addEnvironment('Stand', 'STAGING');
  
    reporter
      .epic('User Tests')
      .feature('User Feature')
      .story('User Story')
      .description('User description')
      .severity(Severity.Critical);
  })

  describe('POST /account/v1/user', () => {
    test("Should create new user", async () => {
      const response = await userRequest.create();

      const createUserResponseSchema = {
        "type": "object",
        "required": [
          "userID",
          "username",
          "books"
        ],
        "additionalProperties": false,
        "properties": {
          "userID": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "books": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      }

      // const validate = ajv.compile(createUserResponseSchema);

      // if (!validate(response.body)) {
      //   console.log(validate.errors);
      // }

      await reporter.startStep("Validate schema");

      expect(response.status).toEqual(201);
      expect(response.body).toMatchSchema(createUserResponseSchema);

      await reporter.endStep();

      await reporter.startStep("Check response body");

      expect(response.body).toMatchSnapshot({
        userID: expect.any(String),
        username: expect.any(String),
      });

      await reporter.endStep();
    });
  });

  describe('POST /account/v1/GenerateToken', () => {
    test("Should generate token for user by username and password", async () => {
      const user = User.make();

      const response = await supertest('https://bookstore.demoqa.com')
        .post('/account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send(user);

      expect(response.status).toEqual(200);
    });
  });
});



























































// import supertest from "supertest";
// import Ajv from 'ajv'
// import addFormats from "ajv-formats"
// import { matchers } from 'jest-json-schema';
// expect.extend(matchers);

// const ajv = new Ajv()
// addFormats(ajv)

// describe("Bookstore", () => {
//   // describe('POST /account/v1/user', () => {
//   //   it("Should create new user", async () => {
//   //     const response = await supertest('https://bookstore.demoqa.com')
//   //       .post('/account/v1/user')
//   //       .set('Accept', 'application/json')
//   //       .send({
//   //         userName: "nik12345",
//   //         password: "Q*ZGTMt6Us+j@N9j!",
//   //       });

//   //     expect(response.status).toEqual(201);
//   //   });
//   // });

//   describe('POST /account/v1/GenerateToken', () => {
//     it("Should generate token for user by username and password", async () => {
//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//         const schema = {
//           type: "object",
//           properties: {
//             token: {type: "string"},
//             expires: {type: "string", format: 'date-time'},
//             status: {type: "string"},
//             result: {type: "string"}
//           },
//           required: ["token", "expires", "status", "result"],
//           additionalProperties: false
//         }
        
//         const valid = ajv.validate(schema, response.body)
//         if (!valid) console.log(ajv.errors)

//         // {
//         //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5pazEyMzQ1IiwicGFzc3dvcmQiOiJRKlpHVE10NlVzK2pATjlqISIsImlhdCI6MTY3MzI3Nzc2Nn0.XXN_YZWIeg6kxZk2DRFMKDBY-gokE6V-iWRX_7b8d_4',
//         //   expires: '2023-01-16T15:22:46.390Z',
//         //   status: 'Success',
//         //   result: 'User authorized successfully.'
//         // }
    

//       console.log(response.body)

//       expect(response.status).toEqual(200);
//       expect(response.body).toMatchSchema(schema)

//       // expect(response.body).toMatchSnapshot({
//       //   token: expect.any(String),
//       //   expires: expect.any(String),
//       // });
//     });
//   });
// });









































// import supertest from "supertest";

// describe("Bookstore", () => {
//   describe('POST /account/v1/user', () => {
//     it("Should create new user", async () => {
//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/user')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//       console.log(response.body)

//       expect(response.status).toEqual(201);

//       const resGenerateToken = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//       console.log(resGenerateToken.body)

//       // const resLogin = await supertest('https://bookstore.demoqa.com')
//       //   .post('/account/v1/Login')
//       //   .set('Accept', 'application/json')
//       //   .send({
//       //     userName: "nik12345",
//       //     password: "Q*ZGTMt6Us+j@N9j!",
//       //   });

//       // console.log(resLogin.body)

//       // const resDelete = await supertest('https://bookstore.demoqa.com')
//       //   .delete(`/account/v1/user/${resLogin.body.userId}`)
//       //   .set('Authorization', `Bearer ${resLogin.body.token}`);

//       const resDelete = await supertest('https://bookstore.demoqa.com')
//         .delete(`/account/v1/user/${response.body.userID}`)
//         .set('Authorization', `Bearer ${resGenerateToken.body.token}`);

//       console.log(resDelete.body)
//     });
//   });

  // describe('POST /account/v1/user', () => {
  //   it("Should create new user", async () => {
  //     const response = await supertest('https://bookstore.demoqa.com')
  //       .post('/account/v1/user')
  //       .set('Accept', 'application/json')
  //       .send({
  //         userName: "myname",
  //         password: "Q*ZGTMt6Us+j@N9j!",
  //       });

  //     console.log(response)

  //     expect(response.status).toEqual(201);
  //   });
  // });
// });
