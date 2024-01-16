import axios from "axios";

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response.data && response.data.display_name) {
      const address = response.data.display_name;
      return address;
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error("Error fetching reverse geocoding data:", error);
    return "Error fetching address";
  }
};

export default reverseGeocode;
