var validationCheck = function (formData) {
  var errorArray = []
  if (formData.title === '') {
    errorArray.push('Add A Title');
  }
  if (formData.excerpt === '') {
    errorArray.push('Add An Excerpt');
  }
  if (formData.bodyText === '') {
    errorArray.push('Add Some Body Text');
  }
  return errorArray
}

module.exports = validationCheck
