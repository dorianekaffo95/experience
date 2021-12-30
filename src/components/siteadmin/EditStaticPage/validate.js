const validate = values => {

  const errors = {}

  if (!values.content) {
    errors.content = 'Content is Required';
  }

  if (!values.metaTitle) {
    errors.metaTitle = 'Meta Title is Required';
  }

  if (!values.metaDescription) {
    errors.metaDescription = 'Meta Description is Required';
  }

  return errors
}

export default validate
