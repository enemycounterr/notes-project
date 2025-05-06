import { Test, TestingModule } from '@nestjs/testing';
import { NoteItemsService } from './note-items.service';

describe('NoteItemsService', () => {
  let service: NoteItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteItemsService],
    }).compile();

    service = module.get<NoteItemsService>(NoteItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
