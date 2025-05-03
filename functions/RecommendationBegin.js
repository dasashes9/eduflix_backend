import natural from 'natural';
import Course from '../models/CourseModel.js';

async function generateRelevantCoursesAtBegin(req, res) {
  try {
    const { userDomain } = req.body;

    if (!userDomain) {
      return res.status(400).json({ message: 'userDomain is required' });
    }

    const courses = await Course.find();

    const similarities = courses.map(course => {
      const courseDomain = course.domain ? course.domain.toLowerCase() : '';
      const domainSim = natural.DiceCoefficient(userDomain.toLowerCase(), courseDomain);
      return { course, similarity: domainSim };
    });

    const relevantCourses = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => item.course);

    res.status(200).json({ message: 'Relevant courses found', relevantCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default generateRelevantCoursesAtBegin;
