import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../use-cases/send-notification";
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notifications-repository";
import { makeQuestion } from "test/factories/make-question";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  (
    req: SendNotificationUseCaseRequest,
  ) => Promise<SendNotificationUseCaseResponse>
>;

describe("On Question Best Answer Chosen", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );

    inMemoryNotificationRepository = new InMemoryNotificationRepository();

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    // eslint-disable-next-line no-new
    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    );
  });

  it("should  send a notification when question has new best answer chosen", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    question.bestAnswerId = answer.id;

    inMemoryQuestionRepository.save(question);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
