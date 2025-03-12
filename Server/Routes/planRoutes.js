import express from 'express';
import { upgradePlan, confirmPlanUpgrade } from '../Controllers/planController.js';

const router = express.Router();

// Create dummy order for plan upgrade
router.post('/upgrade', upgradePlan);
// Confirm upgrade and update user's subscription plan
router.post('/confirm-upgrade', confirmPlanUpgrade);

export default router;
