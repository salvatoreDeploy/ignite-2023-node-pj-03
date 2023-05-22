import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
  findManyById(user_id: string, page: number): Promise<CheckIn[]>
  findByid(id: string): Promise<CheckIn | null>
  countUserById(user_id: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
