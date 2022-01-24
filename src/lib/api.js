import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// Course requests

export function getAllCourses() {
  return axios.get(`${baseUrl}/courses`)
}

export function getSingleCourse(courseId) {
  return axios.get(`${baseUrl}/courses/${courseId}`)
}