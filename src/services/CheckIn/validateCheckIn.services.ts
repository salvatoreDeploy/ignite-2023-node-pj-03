/* eslint-disable prettier/prettier */
import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "src/repositories/checkInRepository";
import { ResourceNotFoundErrors } from "../errors/resourceNotFoundErrors";
import dayjs from "dayjs";
import { LateCheckinValidationErrors } from "../errors/lateCheckinValidationErrors";

interface ValidadeCheckInServiceRequest {
  checkId: string;
}

interface ValidadeCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidadeCheckInService {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({
    checkId,
  }: ValidadeCheckInServiceRequest): Promise<ValidadeCheckInServiceResponse> {
    const checkIn = await this.checkInRepository.findByid(checkId);

    if (!checkIn) {
      throw new ResourceNotFoundErrors();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckinValidationErrors()
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
