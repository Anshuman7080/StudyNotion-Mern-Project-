const Category = require('../models/Category');
const Course = require('../models/Course')
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
    try {

      
        const {name, description} = req.body;

        if(!name) {
            return res
                .status(404)
                .json({
                success: false,
                message: 'All fields are required'
            })
        }


        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);
      
        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {}, 
            {name: true, description: true}
        );
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            data: allCategories,
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



exports.showAllCategories = async (req,res) => {

    try {
        const allCategories =  await Category.find({},{name:true,
                                        description:true});
        
            return res.status(200).json({
                success:true,
                message:"All tags received",
                data:allCategories
            })  
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}




exports.categoryPageDetails = async (req,res) => {
    try {
        const { categoryId } = req.body
      
   
      const selectedCourses = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      // console.log("SELECTED COURSE", selectedCourses)
     
      if (!selectedCourses) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      
      if (selectedCourses.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
    
      const categoriesExceptSelected = await Category.find({
        id: { $ne: categoryId },
        courses: { $not: { $size: 0 } }
      })
      // console.log("categoriesExceptSelected", categoriesExceptSelected)

      let differentCourses = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()


        // console.log("Different COURSEs", differentCourses)
     

      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = await Course.find({ status: 'Published' })
      .sort({ "studentsEnrolled.length": -1 }).populate("ratingAndReviews") 
      .exec();

      // console.log("selected courses are " ,selectedCourses)
      //   console.log("differenet courses are " ,differentCourses)
      //     console.log("most selling courses are " ,mostSellingCourses)
      //     console.log("name is ",  selectedCourses.name)
      //     console.log("description  is ",  selectedCourses.description)

        res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses,
            name: selectedCourses.name,
            description: selectedCourses.description,
            success:true
		})
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}
