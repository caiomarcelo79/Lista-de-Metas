import { and, count, gte, lte } from 'drizzle-orm'
import { goalCompletions } from '../db/schema'
import { db } from '../db'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(and(lte(goalCompletions.createdAt, lastDayOfWeek)))
      .groupBy(goalCompletions.goalId)
  )
}
