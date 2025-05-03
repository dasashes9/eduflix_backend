import Course from "../models/CourseModel.js";

export const getTrendingCourses = async (req, res) => {
  try {
    // Define a weighted score: 0.6 * likeCount + 0.4 * viewCount
    const courses = await Course.aggregate([
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ['$likeCount', 0.6] },
              { $multiply: ['$viewCount', 0.4] }
            ]
          }
        }
      },
      {
        $sort: { trendingScore: -1 }
      },
      {
        $limit: 10 // Adjust number of trending courses to fetch
      }
    ]);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trending courses', error });
  }
};
