import { Test, TestingModule } from '@nestjs/testing';
import { NoteItemsController } from './note-items.controller';
import { NoteItemsService } from './note-items.service';

describe('NoteItemsController', () => {
  let controller: NoteItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteItemsController],
      providers: [NoteItemsService],
    }).compile();

    controller = module.get<NoteItemsController>(NoteItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
