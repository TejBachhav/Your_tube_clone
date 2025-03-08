import express from 'express';
import { upgradePlan, confirmPlanUpgrade } from '../Controllers/planController.js';

const router = express.Router();

// Endpoint to create a payment intent for upgrading plan
router.post('/upgrade', upgradePlan);

// Endpoint to confirm a successful upgrade (after payment)
router.post('/confirm-upgrade', confirmPlanUpgrade);

export default router;
