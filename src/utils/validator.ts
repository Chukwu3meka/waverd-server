interface IValidator {
  value: any;
  type: "email" | "password" | "handle" | "fullName";
  label?: string | null;
}

const validator = ({ value, type, label }: IValidator) => {
  if (!label) label = type.charAt(0).toUpperCase() + type.slice(1);

  if (value === "" || value === undefined) throw { message: `${label} cannot be empty` };

  const charLengthLimit = (min: number, max: number) => {
    if (`${value}`.length < min || `${value}`.length > max) throw { message: `${label} must be between ${min} to ${max} characters` };
  };

  switch (type) {
    case "email": {
      charLengthLimit(6, 254);

      //  The minimum length of an email address is typically 6 characters (e.g. a@b.com) and can be up to 254 characters.
      // Limiting the total characters would result in an invalid email address and not meet the standards set by the Internet Assigned Numbers Authority (IANA).
      const reg = /^[\w\d]+(\.[\w\d]+|-[\w\d]+)*@\w+([-]?\w+)*(\.\w{2,3})$/g;

      if (!reg.test(value))
        throw {
          message: `${label} must begin with alphanumeric characters and can only contain dots or dashes in between alphanumeric characters, followed by an '@' symbol, then the domain name followed by a 2-3 character top-level domain (TLD); Subdomains are not permitted.`,
        };
      break;
    }
    case "password": {
      charLengthLimit(8, 16);

      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!reg.test(value))
        throw {
          message: `${label} must have a length of 8 to 16 characters and include at least one lowercase and uppercase letter, one numeric digit, and one special character.`,
        };
      break;
    }
    case "handle": {
      charLengthLimit(3, 16);

      const reg = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;
      if (!reg.test(value))
        throw {
          message: `${label} must begin with a letter or number and may only contain an underscore between letters or numbers`,
        };
      break;
    }

    case "fullName": {
      charLengthLimit(3, 64);
      const reg = /^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/;
      if (!reg.test(value))
        throw {
          message: `${label} Can consist of one or more letters, with optional dashes, dots, spaces, or hyphens, as long as they are followed by one or more letters.`,
        };
      break;
    }

    default:
      throw { message: "Validation failed" };
  }
  // return true
};

export default validator;