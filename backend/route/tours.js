import express from 'express'
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount
} from './../Controllers/tourController.js'

import { verifyAdmin } from '../utils/verifyToken.js'
import { upload } from '../utils/multer.js';

const router = express.Router()

// Create
router.post('/create', upload.single('photo') , createTour);

// Update
router.put('/:id',  updateTour)

// Delete
router.delete('/delete/:id', deleteTour);

// Search Tours
router.get('/search', getTourBySearch)

// Featured Tours
router.get('/featured', getFeaturedTour)

// Tour Count
router.get('/count', getTourCount)

// Get All Tours
router.get('/', getAllTour);

// Get Single Tour (ALWAYS LAST)
router.get('/:id', getSingleTour)

export default router
