import { NoteException } from './note.exception';

describe('NoteException', () => {
  it('should be defined', () => {
    expect(new NoteException()).toBeDefined();
  });
});
