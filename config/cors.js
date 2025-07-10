import cors from 'cors';
import { config } from './env.js';

export const corsOptions = {
  origin: config.clientURL,
  credentials: true,
};
