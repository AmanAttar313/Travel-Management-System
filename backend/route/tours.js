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

const router = express.Router()

// Create
router.post('/', verifyAdmin, createTour)

// Update
router.put('/:id', verifyAdmin, updateTour)

// Delete
router.delete('/:id', verifyAdmin, deleteTour)

// Search Tours
router.get('/search', getTourBySearch)

// Featured Tours
router.get('/featured', getFeaturedTour)

// Tour Count
router.get('/count', getTourCount)

// Get All Tours
router.get('/', getAllTour)

// Get Single Tour (ALWAYS LAST)
router.get('/:id', getSingleTour)

export default router
