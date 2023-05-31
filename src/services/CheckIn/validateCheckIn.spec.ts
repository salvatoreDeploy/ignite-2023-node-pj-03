/* eslint-disable prettier/prettier */
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "src/repositories/in-memory/inMemoryCheckInsRepository";
import { ValidadeCheckInService } from "./validateCheckIn.services";
import { ResourceNotFoundErrors } from "../errors/resourceNotFoundErrors";
import { LateCheckinValidationErrors } from "../errors/lateCheckinValidationErrors";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidadeCheckInService;

describe("Check In Service", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidadeCheckInService(inMemoryCheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Shoud be able to validated check-in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({ checkId: createdCheckIn.id });

    expect(checkIn.validated_at).toBeInstanceOf(Date);
    expect(inMemoryCheckInsRepository.checkIns[0].validated_at).toBeInstanceOf(
      Date
    );
  });

  it("Shoud not be able to validated an inexistent check-in", async () => {
    expect(() =>
      sut.execute({ checkId: "inexistent-check-in-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors);
  });

  it("Shoud not be able to validated the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 15, 20));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const twenthyOneMinutesInMs = 1000 * 60 * 21; // 21 minutos

    vi.advanceTimersByTime(twenthyOneMinutesInMs);

    await expect(() =>
      sut.execute({ checkId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(LateCheckinValidationErrors);
  });
});
