import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

let inMemoryAnswersCommentRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswersCommentRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswersCommentRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswersCommentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryAnswersCommentRepository.create(answerComment);

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
