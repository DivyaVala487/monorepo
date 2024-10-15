interface FormValues {
  country?: string;
  state?: string;
  city?: string;
  shortName?: string; 
}

const validateForm = (formValues: FormValues): Record<string, string> => {
  const { country, state, city,shortName } = formValues;
  const obj: Record<string, string> = {};
  // Perform validation checks and populate the errors object
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

  return obj; 
}

export default validateForm;
