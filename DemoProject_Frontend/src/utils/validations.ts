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
  const textOnlyRegex = /^[a-zA-Z\s]+$/;

  if (
    "country" in formValues &&
    (!formValues.country || formValues.country === "")
  ) {
    obj["country"] = "Country is Required";
  } else if (formValues.country && !textOnlyRegex.test(formValues.country)) {
    obj["country"] = "Country should contain only letters and spaces";
  }

  if ("state" in formValues && (!formValues.state || formValues.state === "")) {
    obj["state"] = "State is Required";
  } else if (formValues.state && !textOnlyRegex.test(formValues.state)) {
    obj["state"] = "State should contain only letters and spaces";
  }

  if ("city" in formValues && (!formValues.city || formValues.city === "")) {
    obj["city"] = "City is Required";
  } else if (formValues.city && !textOnlyRegex.test(formValues.city)) {
    obj["city"] = "City should contain only letters and spaces";
  }

  if ("shortName" in formValues && formValues.shortName === "") {
    obj["shortName"] = "ShortName is Required";
  } else if (
    formValues.shortName &&
    !textOnlyRegex.test(formValues.shortName)
  ) {
    obj["shortName"] = "ShortName should contain only letters and spaces";
  }

  if ("category" in formValues && formValues.category === "") {
    obj["category"] = "Category name is required";
  } else if (formValues.category && !textOnlyRegex.test(formValues.category)) {
    obj["category"] = "Category name should contain only letters and spaces";
  }

  if ("categoryicon" in formValues && formValues.categoryicon === null) {
    obj["categoryicon"] = "Category icon is required";
  }

  if (
    "countryicon" in formValues &&
    (!formValues.countryicon || formValues.countryicon === "")
  ) {
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
