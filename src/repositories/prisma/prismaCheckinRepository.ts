import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../checkInRepository'
import { prisma } from 'src/database/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = await prisma.checkIn.create({
      data,
    })

    return checkin
  }

  async findByUserIdOnDate(
    user_id: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDate.toDate(),
          lte: endOfTheDate.toDate(),
        },
      },
    })

    return checkin
  }

  async findManyById(user_id: string, page: number): Promise<CheckIn[]> {
    const checkins = await prisma.checkIn.findMany({
      where: {
        user_id,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkins
  }

  async findByid(id: string): Promise<CheckIn | null> {
    const checkin = await prisma.checkIn.findFirst({
      where: {
        id,
      },
    })

    return checkin
  }

  async countUserById(user_id: string): Promise<number> {
    const countUser = await prisma.checkIn.count({
      where: {
        user_id,
      },
    })

    return countUser
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkin = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },

      data: checkIn,
    })

    return checkin
  }
}
