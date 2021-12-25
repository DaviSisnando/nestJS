import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  let userController: AppController;
  
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    
    
    userController = app.get<AppController>(AppController);
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     const appController = app.get<AppController>(AppController);
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });

  describe('createUser', () => {
    let fakeData = {
        nome: "abc",
        telefone: "123",
        cpf: "1234",
        cep: "12345",
        logradouro: "abc",
        cidade: "fortaleza",
        estado: "ceara"
    }
    it('should create a user', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.createUser(fakeData, <any> Promise)).toEqual({
        data: {
          id: expect.any(String),
          nome: "abc",
          telefone: "123",
          cpf: "1234",
          cep: "12345",
          logradouro: "abc",
          cidade: "fortaleza",
          estado: "ceara"
        }
      })
    })
  })
});
