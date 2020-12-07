import { IMAGES, STATS } from "../contants";

export function loadImages() {
  return { type: IMAGES.LOAD };
}

export function setImages(images) {
  return {
    type: IMAGES.LOAD_SUCCESS,
    payload: images
  };
}

export function setError(error) {
  return {
    type: IMAGES.LOAD_FAIL,
    payload: error
  };
}

export function loadStats(id) {
  return {
    type: STATS.LOAD,
    id
  };
}

export function setStats(id, stats) {
  return {
    type: STATS.LOAD_SUCCESS,
    id,
    payload: stats
  };
}

export function setStatsError(id, error) {
  return {
    type: STATS.LOAD_FAIL,
    id,
    payload: error
  };
}
