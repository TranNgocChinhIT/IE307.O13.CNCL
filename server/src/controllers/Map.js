// controllers/Map.js
import Map from "../models/Map.js";
import mapValidator from "../validation/Map.js";

// Lấy danh sách Maps
export const getAllMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    if (!maps || maps.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy danh sách bản đồ",
      });
    }
    return res.status(200).json({
      datas: maps,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Lấy thông tin một Map từ ID
export const getMap = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) {
      return res.status(404).json({
        message: "Không tìm thấy bản đồ",
      });
    }
    return res.status(200).json({
      datas: map,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Tạo mới một Map
export const createMapEntry = async (req, res) => {
  try {
    const { error } = mapValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const newMapEntry = await Map.create(req.body);
    if (!newMapEntry) {
      return res.status(400).json({
        message: "Tạo bản đồ không thành công",
      });
    }
    return res.status(201).json({
      datas: newMapEntry,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Cập nhật một Map
export const updateMap = async (req, res) => {
  try {
    const { error } = mapValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const updatedMap = await Map.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedMap) {
      return res.status(404).json({
        message: "Cập nhật không thành công!!",
      });
    }

    return res.status(200).json({
      datas: updatedMap,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// Xóa một Map
export const removeMap = async (req, res) => {
  try {
    const deletedMap = await Map.findByIdAndDelete(req.params.id);

    if (!deletedMap) {
      return res.status(404).json({
        message: "Xóa không thành công!!",
      });
    }

    return res.status(200).json({
      message: "Xóa bản đồ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
