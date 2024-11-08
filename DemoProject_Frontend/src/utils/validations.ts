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
  const errors: Record<string, string> = {};
  const textOnlyRegex = /^[a-zA-Z\s]+$/;
  const filteredValues = Object.fromEntries(
    Object.entries(formValues).filter(
      ([, value]) =>
        value === null || value === undefined || value === "" || value === false
    )
  );

  console.log(filteredValues, "formvalues");

  for (const [key, value] of Object.entries(filteredValues)) {
    switch (key) {
      case "country":
      case "state":
      case "city":
      case "shortName":
      case "category":
        if (!value) {
          errors[key] = `${capitalizeFirstLetter(key)} is required`;
        } else if (!textOnlyRegex.test(value) && typeof value !== "number") {
          console.log(value, "value");
          errors[key] = `${capitalizeFirstLetter(
            key
          )} should contain only letters and spaces`;
        }
        break;

      case "subCategory":
        if (!value) {
          errors[key] = "Sub-Category is required";
        }
        break;

      case "categoryicon":
        if (value === null) {
          errors[key] = "Category icon is required";
        }
        break;

      case "countryicon":
        if (!value) {
          errors[key] = "Country icon is required";
        }
        break;

      case "icon":
        if (!value) {
          errors[key] = "Sub-Category Icon is required";
        }
        break;

      default:
        break;
    }
  }

  return errors;
};

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default validateForm;
