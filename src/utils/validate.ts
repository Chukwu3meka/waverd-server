interface Validator {
  value: any;
  type: "email" | "password" | "handle" | "name" | "comment" | "query" | "alphaNumeric";
  label?: string | null;
  sendError?: boolean;
}

const validate = ({ value, type, label, sendError = false }: Validator) => {
  try {
    if (!label) label = type.charAt(0).toUpperCase() + type.slice(1);
    if (!`${value}`.trim().length) throw { message: `${label} cannot have only whitespace` };
    if (value === "" || value === undefined) throw { message: `${label} cannot be empty` };

    const charLengthLimit = (min: number, max: number) => {
      if (`${value}`.length < min || `${value}`.length > max) throw { message: `${label} must be between ${min} to ${max} characters` };
    };

    switch (type) {
      case "email": {
        charLengthLimit(6, 254);

        //  The minimum length of an email address is typically 6 characters (e.g. a@b.com) and can be up to 254 characters.
        // Limiting the total characters would result in an invalid email address and not meet the standards set by the Internet Assigned Numbers Authority (IANA).
        const regex = /^[\w\d]+(\.[\w\d]+|-[\w\d]+)*@\w+([-]?\w+)*(\.\w{2,3})$/g;

        if (!regex.test(value))
          throw {
            message: `${label} must begin with alphanumeric characters and can only contain dots or dashes in between alphanumeric characters, followed by an '@' symbol, then the domain name followed by a 2-3 character top-level domain (TLD); Subdomains are not permitted.`,
          };
        break;
      }

      case "password": {
        charLengthLimit(8, 16);
        const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!regex.test(value)) throw { message: `${label} must have at least one letter/number.` };
        break;
      }

      case "handle": {
        charLengthLimit(3, 16);

        const regex = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;
        if (!regex.test(value))
          throw {
            message: `${label} must begin with a letter or number and may only contain an underscore between letters or numbers`,
          };
        break;
      }

      case "name": {
        charLengthLimit(3, 64);
        const regex = /^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/;
        if (!regex.test(value))
          throw {
            message: `${label} can only have one or more letters, with optional dashes, dots, spaces, or hyphens, as long as they are followed by one or more letters.`,
          };
        break;
      }

      case "alphaNumeric": {
        charLengthLimit(1, 700);

        // const regex = /^[a-zA-Z0-9,.!? -]*$/;
        const regex = /^[a-zA-Z0-9]*$/;
        if (!regex.test(value)) throw { message: `${label} can only have letters and Numbers.` };
        break;
      }

      case "comment": {
        charLengthLimit(3, 3000);

        // const regex = /^[a-zA-Z0-9,.!? -]*$/;
        const regex = /^[a-zA-Z0-9,.!?% /-=-:<#>'&(\\);{\[\]}$+"\n]*$/;
        if (!regex.test(value)) throw { message: `${label} can only have letters, Numbers, comma, dot, exclamation and question mark.` };
        break;
      }

      // case "query": {
      //   charLengthLimit(1, 50);

      //   // const regex = /^[\w\d]+(?:[,-.\s!]?[\w\d]+)*$/;
      //   // if (!regex.test(value)) throw { message: `${label} can only have letters, Numbers, comma, dot, and exclamation.` };
      //   break;
      // }

      default:
        throw { message: "Validation failed" };
    }

    // return true
  } catch (err) {
    if (sendError) throw { sendError: true, type: "validate", description: err };
    throw err;
  }
};

export default validate;
