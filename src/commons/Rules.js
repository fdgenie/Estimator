export const requiredRule = val => !!val || "Field is required";

const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; //regex for YYYY-MM-DD format
export const dateRule = val => dateRegex.test(val) || "Date is invalid";
