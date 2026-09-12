
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  client: {
  },
  runtimeEnv: {},
  emptyStringAsUndefined: true,
});
