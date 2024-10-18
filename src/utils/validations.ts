interface FormValues {
  country?: string;
  state?: string;
  city?: string;
  shortName?: string;
  gst?: boolean;
  subCategory?: string;
  category?: string;
  icon?: any;
  categoryicon?:any;
  countryicon?:any
}

const validateForm = (formValues: FormValues): Record<string, string> => {
  const { country, state, city, shortName, gst, category, icon, subCategory,categoryicon,countryicon } =
    formValues;
  console.log(formValues, "shh");
  const obj: Record<string, string> = {};
  if (country === "") {
    obj["country"] = "Country is Required";
  }
  if (state === "") {
    obj["state"] = "State is Required";
  }
  if (city === "") {
    obj["city"] = "City is Required";
  }
  if (shortName === "") {
    obj["shortName"] = "ShortName is Required";
  }
  if (gst === false) {
    obj["gst"] = "Required Field";
  }
  if (category ==="" ) {
    obj["category"] = "Category name is required";
  }
  if (categoryicon===null) {
    obj["categoryicon"] = "Category icon is required";
  }

  if (countryicon===null) {
    obj["categoryicon"] = "Category icon is required";
  }

  if (!subCategory) {
    obj["subCategory"] = "Sub-Category is required.";
  }

  if (!icon) {
    obj["icon"] = "Sub-Category Icon is required.";
  } else if (!isValidFileType(icon.name)) {
    obj["icon"] = "Invalid file type. Please upload an image.";
  }

  return obj;
};

const isValidFileType = (fileName: string) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
  const fileExtension = fileName?.split(".")?.pop()?.toLowerCase();
  return fileExtension && allowedExtensions.includes(fileExtension);
};

export default validateForm;
