import { GetAllImages } from "./GalaryServices";
import apiService from "../Services";

export const HomeServices = {
  GetGallery: () => {
    const images = GetAllImages();
    return images;
    // return apiService.get("movies/family");
  },
  GetSampleGallery: () => {
    return apiService.get("movies/family");
  },
  GetDemos: () => {
    return apiService.get("movies/classic");
  },
  GetCourses: () => {
    //action-adventure
    //classic
    //comedy,drama,horror,family,mystery,scifi-fantasy,western
    return apiService.get("movies/animation");
  },
};
