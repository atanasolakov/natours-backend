const express = require('express');
const { getAllTours,createTour,getTour,updateTour,deleteTour,aliasTopTours } = require('./../controllers/tourController')
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');



const router = express.Router()

router.route('/top-5-cheap').get(aliasTopTours,getAllTours)
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/')
  .get(authController.protect,tourController.getAllTours)
  .post(tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
