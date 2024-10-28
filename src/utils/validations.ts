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
  const obj: Record<string, string> = {};
  const Regex = /^[a-zA-Z\s]+$/;

  // Check each field in `formValues` and apply validation only to fields that are defined
  if ("country" in formValues && (!formValues.country || formValues.country === "")) {
    obj["country"] = "Country is Required";
  } 
  
  if ("state" in formValues && (!formValues.state || formValues.state === "")) {
    obj["state"] = "State is Required";
  } 

  if ("city" in formValues && (!formValues.city || formValues.city === "")) {
    obj["city"] = "City is Required";
  } 

  if ("shortName" in formValues && formValues.shortName === "") {
    obj["shortName"] = "ShortName is Required";
  }

  if ("category" in formValues && formValues.category === "") {
    obj["category"] = "Category name is required";
  }

  if ("categoryicon" in formValues && formValues.categoryicon === null) {
    obj["categoryicon"] = "Category icon is required";
  }

  if ("countryicon" in formValues && (!formValues.countryicon || formValues.countryicon === "")) {
    obj["countryicon"] = "Country icon is required";
  }

  if ("subCategory" in formValues && !formValues.subCategory) {
    obj["subCategory"] = "Sub-Category is required.";
  }

  if ("icon" in formValues) {
    if (!formValues.icon) {
      obj["icon"] = "Sub-Category Icon is required.";
    } 
  }

  console.log("Form values:", formValues);
  console.log("Validation errors:", obj);

  return obj;
};

export default validateForm;
