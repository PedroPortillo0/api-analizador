import { Router } from 'express';
import { executeSql } from '../adapters/http/sqlController';

const router = Router();

router.post('/execute-sql', executeSql);

export default router;
