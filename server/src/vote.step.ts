import { ApiRouteConfig, Handlers } from 'motia';
import { z } from 'zod';

export const config: ApiRouteConfig = {
  name: 'VotePoll',
  type: 'api',
  path: '/polls/:pollId/vote',
  method: 'POST',
  bodySchema: z.object({
    option: z.string(),
    userId: z.string(), // Pass a unique ID from the frontend (fingerprint/UUID)
  }),
    emits:['streams.polls'],
    flows:['vote']
};

export const handler: Handlers['VotePoll'] = async (req, { state, streams }) => {
  const { pollId } = req.pathParams;
  const { option, userId } = req.body;

  // 1. Prevent Double Voting
  const voterKey = `voted_${pollId}_${userId}`;
  const alreadyVoted = await state.get('voters', voterKey);
  
  if (alreadyVoted) {
    return { status: 403, body: { error: 'Already voted!' } };
  }

  // 2. Update State
  const poll = await state.get('poll_store', pollId);
  if (!poll) return { status: 404, body: { error: 'Poll not found' } };

  poll.options[option] = (poll.options[option] || 0) + 1;

  await state.set('poll_store', pollId, poll);
  await state.set('voters', voterKey, true); // Mark as voted

  // 3. Update Stream
  await streams.polls.set('global', pollId, poll);

  return { status: 200, body: poll };
};