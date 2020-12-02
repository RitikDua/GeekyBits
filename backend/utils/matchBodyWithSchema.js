exports.matchBodyWithSchema = (body, expectedItems) => {
    let isValid = true;
    for (const item of expectedItems) {
      if (!body.includes(item)) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };
