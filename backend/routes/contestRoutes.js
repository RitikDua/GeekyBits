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
.patch(contestController.updateContest);
router.route('/:contestId/:contestUrl')
.get(contestController.startContest)
module.exports = router;