// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import {
  Button,
  FormGroup,
  FormControl,
  Image,
  Col,
  Row,
} from 'react-bootstrap';

// Country Codes
import countryCodes from './countryCodes.json';

class AddListSettingsForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null
    }
  }

  componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <div style={{display: 'flex'}}>
          <div style={{lineHeight: '40px'}}>
          <Image style={{
                      height: "2em",
                      padding: "0px 10px"
                    }} src={`/flags/${input.value ? input.value.toLowerCase() : '_generic'}.svg`}
                    alt={input.value}
                  />
          </div>
          <div style={{flex: 1}}>
          <FormControl
          {...input}
          className={className}
          componentClass="select"
          placeholder={label}
        >
          {children}
        </FormControl>
          </div>
        </div>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, typeId, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType } = this.state;
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.formGroup}>
            <Field
              name="itemName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.addNew)}
              className={cx(s.formControlInput)}
            />
          </FormGroup>
          {
            typeId && (typeId == 1) && <FormGroup className={s.formGroup}>
              <Field
                name="itemDescription"
                component={this.renderFormControlTextArea}
                label={formatMessage(messages.addNewDescription)}
                className={cx(s.formControlInput, s.space3)}
              />
            </FormGroup>
          }

          {
            typeId && (typeId == 20) && <FormGroup className={s.formGroup}>
              <Field
                name="otherItemName"
                type="select"
                component={this.renderFormControlSelect}
                label={formatMessage(messages.selectCountryCode)}
                className={cx(s.formControlInput, s.space3)}
              >
                {countryCodes.map((countryCode) => (<option value={countryCode.code}>{countryCode.code} - {countryCode.name}</option>))}
              </Field>
            </FormGroup>
          }

          {
            fieldType == "numberType" && <div>
              <FormGroup className={s.formGroup}>
                <Field
                  name="otherItemName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.addOtherItem)}
                  className={s.formControlInput}
                />
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <Field
                  name="startValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.startValue)}
                  className={s.formControlInput}
                />
              </FormGroup>

              <FormGroup className={s.formGroup}>
                <Field
                  name="endValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.endValue)}
                  className={s.formControlInput}
                />
              </FormGroup>
            </div>
          }

          <FormGroup className={s.formGroup}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} className={cx(s.btnAlignRight)}>
                <Button className={cx(s.button, s.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                  {formatMessage(messages.add)}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AddListSettingsForm = reduxForm({
  form: "AddListSettingsForm", // a unique name for this form
  validate,
})(AddListSettingsForm);

// Decorate with connect to read form values
const selector = formValueSelector("AddListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  typeId: selector(state, 'typeId'),
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AddListSettingsForm)));
