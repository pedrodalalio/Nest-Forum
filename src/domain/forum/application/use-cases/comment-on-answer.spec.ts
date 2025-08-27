import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersCommentRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryAnswersCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentRepository,
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryAnswersCommentRepository.items[0].content).toEqual(
      "Comentário teste",
    );
  });
});
