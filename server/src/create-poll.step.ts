import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  name: 'CreatePoll',
  type: 'api',
  path: '/polls',
  method: 'POST',
  bodySchema: z.object({
    title: z.string(),
    options: z.array(z.string()),
  }),
  emits: ['streams.polls'],
  flows: ['vote'],
}

export const handler: Handlers['CreatePoll'] = async (req, { state, streams }) => {
  const { title, options } = req.body
  const pollId = `poll_${Date.now()}`

  const poll = {
    id: pollId,
    title,
    options: options.reduce(
      (acc, opt) => ({ ...acc, [opt]: 0 }),
      {}
    ),
    deleted: false,
    deletedAt: null,
  }

  await state.set('poll_store', pollId, poll)
  await streams.polls.set('global', pollId, poll)

  return { status: 201, body: poll }
}
