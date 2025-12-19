
/*

import { StreamConfig } from 'motia'
import { z } from 'zod'

const PollSchema = z.object({
  id: z.string(),
  title: z.string(),
  options: z.record(z.string(), z.number()),
})

export const config: StreamConfig = {
  name: 'polls',
  schema: PollSchema,  baseConfig: {
    storageType: 'default',
  },
}


*/








/*
import { StreamConfig } from 'motia'

export const config: StreamConfig = {
  name: 'polls',

  schema: {
    type: 'object',
    required: ['id', 'title', 'options'],
    properties: {
      id: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      options: {
        type: 'object',
        additionalProperties: {
          type: 'number',
        },
      },
    },
  },

  baseConfig: {
    storageType: 'default',
  },
}
*/





// src/polls.stream.ts (or wherever your StreamConfig is)

import { StreamConfig } from 'motia'

export const config: StreamConfig = {
  name: 'polls',

  schema: {
    type: 'object',
    required: ['id', 'title', 'options', 'deleted'],
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      options: {
        type: 'object',
        additionalProperties: { type: 'number' },
      },
      deleted: { type: 'boolean' },
      deletedAt: {
        type: ['number', 'null'],
      },
    },
  },

  baseConfig: {
    storageType: 'default',
  },
}
