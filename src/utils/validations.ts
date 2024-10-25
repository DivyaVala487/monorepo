interface FormValues {
  country?: string;
  state?: string;
  city?: string;
  shortName?: string;
  gst?: boolean;
  subCategory?: string;
  category?: string;
  icon?: any;
  categoryicon?: any;
  countryicon?: any;
}

const validateForm = (formValues: FormValues): Record<string, string> => {
  const {
    country,
    state,
    city,
    shortName,
    gst,
    category,
    icon,
    subCategory,
    categoryicon,
    countryicon,
  } = formValues;
  console.log(formValues, "shh");
  const obj: Record<string, string> = {};
  const Regex = /^[a-zA-Z\s]+$/;
  // if (country === "" || country === null) {
  //   obj["country"] = "Country is Required";
  // }
  if (!country) {
    obj["country"] = "Country is Required";
  } else if (!Regex.test(country)) {
    obj["country"] = "Country should only contain letters";
  }
  // if (state === null || state === "") {
  //   obj["state"] = "State is Required";
  // }
  if (!state) {
    obj["state"] = "State is Required";
  } else if (!Regex.test(state)) {
    obj["state"] = "State should only contain letters";
  }
  // if (city === "" || city === null) {
  //   obj["city"] = "City is Required";
  // }
  if (!city) {
    obj["city"] = "City is Required";
  } else if (!Regex.test(city)) {
    obj["city"] = "City should only contain letters";
  }
  // if (shortName === "") {
  //   obj["shortName"] = "ShortName is Required";
  // }
  if (!shortName) {
    obj["shortName"] = "Shortname is Required";
  } else if (!Regex.test(shortName)) {
    obj["shortName"] = "Shortname should only contain letters";
  }
  // if (gst === false) {
  //   obj["gst"] = "Required Field";
  // }
  // if (category === "") {
  //   obj["category"] = "Category name is required";
  // }
  if (!category) {
    obj["category"] = "Category is Required";
  } else if (!Regex.test(category)) {
    obj["category"] = "Category should only contain letters";
  }
  if (categoryicon === "") {
    obj["categoryicon"] = "Category icon is required";
  }

  if (countryicon === null || countryicon === "") {
    obj["countryicon"] = "Country icon is required";
  }

  // if (!subCategory) {
  //   obj["subCategory"] = "Sub-Category is required.";
  // }
  if (!subCategory) {
    obj["subCategory"] = "Subcategory is Required";
  } else if (!Regex.test(subCategory)) {
    obj["subCategory"] = "Subcategory should only contain letters";
  }

  if (!icon) {
    obj["icon"] = "Sub-Category Icon is required.";
  }
  // else if (!isValidFileType(icon)) {
  //   obj["icon"] = "Invalid file type. Please upload an image.";
  // }

  console.log(obj, "obj");

  return obj;
};

const isValidFileType = (fileName: string) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
  const fileExtension = fileName?.split(".")?.pop()?.toLowerCase();
  return fileExtension && allowedExtensions.includes(fileExtension);
};

export default validateForm;
