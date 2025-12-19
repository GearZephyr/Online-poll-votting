import { EventStepConfig, Handlers } from 'motia'

export const config: EventStepConfig = {
  name: 'verify-polls-stream',
  type: 'event',
  subscribes: ['polls'],
  emits: [], // ✅ REQUIRED EVEN IF EMPTY
  flows:['vote']
}

export const handler: Handlers['verify-polls-stream'] = async ({ event }) => {
  console.log('✅ STREAM EVENT RECEIVED')
  console.log(JSON.stringify(event, null, 2))
}
