import fs from "fs";
import { URL } from "url";
import Fuse from "fuse.js";
import Map from "../models/Map.js";
import mapValidator from "../validation/Map.js";

// Tạo chỉ mục không gian 2dsphere cho bản đồ
Map.collection.createIndex({ location: "2dsphere" });

const cityPolygonsPath = new URL("./districtPolygons.json", import.meta.url);
const cityPolygons = JSON.parse(fs.readFileSync(cityPolygonsPath, "utf8"));

export const getAllMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    if (!maps || maps.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy danh sách bản đồ" });
    }
    return res.status(200).json({ datas: maps });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const getMap = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) {
      return res.status(404).json({ message: "Không tìm thấy bản đồ" });
    }
    return res.status(200).json({ datas: map });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const createMapEntry = async (req, res) => {
  try {
    const { error } = mapValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const newMapEntry = await Map.create(req.body);
    if (!newMapEntry) {
      return res.status(400).json({ message: "Tạo bản đồ không thành công" });
    }
    return res.status(201).json({ datas: newMapEntry });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const updateMap = async (req, res) => {
  try {
    const { error } = mapValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }

    const updatedMap = await Map.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMap) {
      return res.status(404).json({ message: "Cập nhật không thành công!!" });
    }

    return res.status(200).json({ datas: updatedMap });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const removeMap = async (req, res) => {
  try {
    const deletedMap = await Map.findByIdAndDelete(req.params.id);
    if (!deletedMap) {
      return res.status(404).json({ message: "Xóa không thành công!!" });
    }
    return res.status(200).json({ message: "Xóa bản đồ thành công" });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};

export const getNearbyMovies = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required for the search." });
    }
    const userCoordinates = [parseFloat(longitude), parseFloat(latitude)];
    console.time("getNearbyMovies");
    const nearbyMovies = await Map.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: userCoordinates,
          },
          $maxDistance: 5000,
        },
      },
    });
    console.timeEnd("getNearbyMovies");
    res.json({ nearbyMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { lineString, buffer } from "@turf/turf";
export const getIntersectbyMovies = async (req, res) => {
  try {
    const routeCoordinates = [
      [106.77040692662854, 10.87134873423389],
      [106.77368942486049, 10.870249571924859],
      [106.7769437067754, 10.869353613098099],
      [106.77668975992015, 10.867940394222146],
      // [106.77670605355591, 10.868047462564746],
      [106.77747041136092, 10.869067275173663],
      [106.77933268829412, 10.868485361771278],
    ];

    // Tạo LineString từ tọa độ của tuyến đường
    const routeLineString = lineString(routeCoordinates);

    // Tạo khu vực đệm xung quanh tuyến đường với bán kính 20m
    const bufferZone = buffer(routeLineString, 0.02, { units: "kilometers" });

    // Tìm các rạp chiếu phim nằm trong khu vực đệm
    const nearbyMovies = await Map.find({
      location: {
        $geoWithin: {
          $geometry: bufferZone.geometry,
        },
      },
    });

    res.json({ nearbyMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
import * as turf from "@turf/turf";
export const getIntersectNearbyMovies = async (req, res) => {
  try {
    const maxDistance = 5000; // khoảng cách tối đa (đơn vị: mét)
    const routeCoordinates = [
      [106.7800316577081, 10.88452370136126],
      [106.78116079373672, 10.88316990325859],
      [106.78181726817166, 10.88368563659445],
      [106.78265755544942, 10.882705742493116],
      [106.78268381442564, 10.881983713199205],
      [106.78474514415348, 10.880565436279753],
    ];

    // Tìm tất cả các rạp chiếu phim
    const allMovies = await Map.find({});

    // Tạo một hàm để tính khoảng cách từ điểm đến tuyến đường
    const calculateDistanceToRoute = (point, route) => {
      const pointGeoJSON = turf.point([point.longitude, point.latitude]);
      const lineGeoJSON = turf.lineString(route);
      const distance = turf.pointToLineDistance(pointGeoJSON, lineGeoJSON, {
        units: "meters",
      });
      return distance;
    };

    // Tìm rạp chiếu phim gần nhất tuyến đường
    let closestMovie = null;
    let closestDistance = maxDistance;

    allMovies.forEach((movie) => {
      const movieLocation = {
        longitude: movie.location.coordinates[0],
        latitude: movie.location.coordinates[1],
      };
      const distanceToRoute = calculateDistanceToRoute(
        movieLocation,
        routeCoordinates
      );

      if (distanceToRoute <= maxDistance && distanceToRoute < closestDistance) {
        closestDistance = distanceToRoute;
        closestMovie = movie;
      }
    });

    if (closestMovie) {
      res.json({ closestMovie });
    } else {
      res
        .status(404)
        .json({ message: "Không có rạp chiếu phim nào gần tuyến đường." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ." });
  }
};
export const getMovieByPolygon = async (req, res) => {
  try {
    const { cityName } = req.query;
    if (!cityName) {
      return res.status(400).json({
        error: "Cần tên thành phố hoặc quận để tìm kiếm.",
      });
    }

    const normalizedCityName = cityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.2, // Giảm ngưỡng để tăng độ chính xác
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["properties.Ten_Huyen", "properties.Ten_Tinh"],
    };
    const fuse = new Fuse(cityPolygons.features, fuseOptions);
    const matchingCities = fuse.search(normalizedCityName);

    if (matchingCities.length === 0) {
      return res.status(400).json({ error: "Tên không hợp lệ." });
    }

    const selectedCity = matchingCities[0].item;
    const cityPolygon = selectedCity.geometry;

    const moviesInCity = await Map.find({
      location: {
        $geoWithin: {
          $geometry: cityPolygon,
        },
      },
    });

    const simplifiedMovies = moviesInCity.map((movie) => ({
      cinema_name: movie.cinema_name,
      image: movie.image,
      location: movie.location,
      address: movie.address,
      rating: movie.rating,
      hasManyAmenities: movie.hasManyAmenities,
    }));

    res.json(simplifiedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getMoviesInCircle = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({
        error: "Cần tọa độ vĩ độ, kinh độ và bán kính để tìm kiếm.",
      });
    }

    const center = [parseFloat(longitude), parseFloat(latitude)];
    const maxDistance = parseFloat(radius) / 6371; // Bán kính của Trái Đất theo km

    const moviesInCircle = await Map.find({
      location: {
        $geoWithin: {
          $centerSphere: [center, maxDistance],
        },
      },
    }).select({
      _id: 1,
      cinema_name: 1,
      image: 1,
      location: 1,
      address: 1,
      rating: 1,
      hasManyAmenities: 1,
    });

    res.json(moviesInCircle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};
