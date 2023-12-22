import Category from "../models/Category.js";
import Movie from "../models/Movie.js";
import categoryValidator from "../validation/Category.js";

// Lấy danh sách Category
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh sách category",
            });
        }
        return res.status(200).json({
            datas: categories,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Lấy thông tin một Category từ ID
export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("movies");
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy category",
            });
        }
        return res.status(200).json({
            datas: category,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Tạo mới một Category
export const createCategory = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const newCategory = await Category.create(req.body);
        if(!newCategory)  {
            return res.status(400).json({
                message: "Tạo category khong thanh cong",
            });
        }
       
        const moviesToUpdate = await Movie.find({});
 
         // Lặp qua từng bản ghi trong bảng Movie và cập nhật bảng Category
         for (const movie of moviesToUpdate) {
             await Category.findByIdAndUpdate(
                 movie.categoryID,
                 { $addToSet: { movies: movie._id } },
                 { new: true }
             );
         }
        return res.status(201).json({
            datas: newCategory,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
// Cập nhật một Category
export const updateCategory = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const oldCategory = await Category.findById(req.params.id)
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        
        if (!updatedCategory) {
            return res.status(404).json({
                message: "Update không thành công!!",
            });
        }

        const oldCategoryMovies = await Movie.updateMany(
            { _id: { $in: oldCategory.movies } },
            { $set: { categoryID: null } }
        );
        if (!oldCategoryMovies || oldCategoryMovies.nModified === 0) {
            return res.status(500).json({
                message: "Không thể cập nhật trường categoryID cho các movie!",
            });
        }
        // Lấy danh sách movie thuộc category mới và cập nhật trường categoryID theo _id của category
        const newCategoryMovies = await Movie.updateMany(
            { _id: { $in: req.body.movies } },
            { $set: { categoryID: updatedCategory._id } }
        );

        if (!newCategoryMovies || newCategoryMovies.nModified === 0) {
            return res.status(500).json({
                message: "Không thể cập nhật trường categoryID cho các movie!",
            });
        }
        const moviesToUpdate = await Movie.find({});

        // Lặp qua từng bản ghi trong bảng Movie và cập nhật bảng Category
        for (const movie of moviesToUpdate) {
            await Category.findByIdAndUpdate(
                movie.categoryID,
                { $addToSet: { movies: movie._id } },
                { new: true }
            );
        }
        return res.status(200).json({
            datas: updatedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};


// Xóa một Category
export const removeCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Xóa không thành công!!",
            });
        }
        // Cập nhật trường categoryID của những movie thuộc category bị xóa
        const updateMovieResult = await Movie.updateMany(
            { categoryID: req.params.id },
            {$unset: { categoryID: "" }  }
        );

        if (!updateMovieResult || updateMovieResult.nModified === 0) {
            return res.status(500).json({
                message: "Không thể cập nhật trường categoryID cho các movie!",
            });
        }
        return res.status(200).json({
            message: "Xóa category thành công",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
