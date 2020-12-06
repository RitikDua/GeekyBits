const express = require('express');
const router = express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const contestController=require(`${__dirname}/../controllers/contestController`);
router.use(authController.protect);
router.route('/')
.get(contestController.getContests)
.post(contestController.createContest)
.delete(contestController.deleteContests);
router.route('/:contestId')
.get(contestController.getContestById)
.post(contestController.registerParticipant)
router.route('/:contestId/:contestUrl')
.get(contestController.startContest)
.post(contestController.updateContest);
module.exports = router;