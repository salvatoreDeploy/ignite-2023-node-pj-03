import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../checkInRepository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    // console.log(checkInOnSameDate)

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyById(user_id: string, page: number): Promise<CheckIn[]> {
    return this.checkIns
      .filter((checkin) => checkin.user_id === user_id)
      .slice((page - 1) * 20, page * 20)
  }

  async findByid(id: string) {
    const checkin = this.checkIns.find((checkin) => checkin.id === id)

    if (!checkin) {
      return null
    }

    return checkin
  }

  async countUserById(user_id: string) {
    return this.checkIns.filter((checkin) => checkin.user_id === user_id).length
  }

  async save(checkIn: CheckIn) {
    const checkinIndex = this.checkIns.findIndex(
      (checkin) => checkin.id === checkIn.id,
    )

    if (checkinIndex > 0) {
      this.checkIns[checkinIndex] = checkIn
    }

    return checkIn
  }
}
