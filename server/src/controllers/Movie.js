import Category from "../models/Category.js";
import Movie from "../models/Movie.js";
import movieValidator from "../validation/Movie.js";

// Lấy danh sách Movie
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({}).populate("categoryID");
        if (movies.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy danh sách movie",
            });
        }
        return res.status(200).json({
            datas: movies,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Lấy thông tin một Movie từ ID
export const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate("categoryID");
        if (!movie) {
            return res.status(404).json({
                message: "Không tìm thấy movie",
            });
        }
        return res.status(200).json({
            datas: movie,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Tạo mới một Movie
export const createMovie = async (req, res) => {
    try {
        const { error } = movieValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const newMovie = await Movie.create(req.body);
        if(!newMovie)  {
            return res.status(400).json({
                message: "Tạo movie khong thanh cong",
            });
        }
        const updateCategory = await Category.findByIdAndUpdate(newMovie.categoryID,
            {
                $addToSet: {
                    movies: newMovie._id,
                },
            },
            { new: true }
        );
        if(!updateCategory)  {
            return res.status(400).json({
                message: "Update category khong thanh cong",
            });
        }
        return res.status(201).json({
            datas: newMovie,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Cập nhật một Movie
export const updateMovie = async (req, res) => {
    try {
        const { error } = movieValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                message: "Update không thành công!!",
            });
        }
        const updateCategory = await Category.findByIdAndUpdate(
            updatedMovie.categoryID,
            {
                $addToSet: {
                    movies: updatedMovie._id,
                },
            },
            { new: true }
        );
        if(!updateCategory)  {
            return res.status(400).json({
                message: "Update category khong thanh cong",
            });
        }
        return res.status(200).json({
            datas: updatedMovie,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};

// Xóa một Movie
export const removeMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        const movieIdToDelete = movie.id;
        const categoryIdToDelete = movie.categoryID;
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({
                message: "Xóa không thành công!!",
            });
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryIdToDelete,
            {
                $pull: {
                    movies: movieIdToDelete,
                },
            },
            { new: true }
        );
        if(!updatedCategory)  {
            return res.status(400).json({
                message: "Update category khong thanh cong",
            });
        }
        return res.status(200).json({
            message: "Xóa movie thành công",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
};
