import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return app info', () => {
            expect(appController.getInfo()).toHaveProperty('title');
            expect(appController.getInfo()).toHaveProperty('apiVersion');
        });
    });
});
