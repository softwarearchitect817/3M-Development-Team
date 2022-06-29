import React, { Fragment, useState, useContext } from 'react'
import { isObjEmpty, selectThemeColors } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Modal, ModalHeader, ModalBody, ModalFooter, Media, Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import PickerDefault from "../../forms/form-elements/datepicker/PickerDefault"
import Select from 'react-select'
import Webcam from 'react-webcam'
import Table from '../../apps/user/list/Table'

import { useRTL } from '@hooks/useRTL'

import '@styles/base/pages/page-auth.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/apps/app-users.scss'

const colourOptions = [
  { value: 'ocean', label: 'Front-end Engineer' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' }
]

const colorOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
  { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
  { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
  { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
]

const Register = () => {

  const [disabledModal, setDisabledModal] = useState(false)

  const [avatar, setAvatar] = useState('./avatar-blank.png')

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const [isRtl, setIsRtl] = useRTL()

  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  const [valErrors, setValErrors] = useState({})
  const [firstname, setFirstname] = useState('')
  const [middlename, setMiddlename] = useState('')
  const [lastname, setLastname] = useState('')

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      useJwt
        .register({ firstname, middlename, lastname, birthday, position, certificates, avatar })
        .then(res => {
          if (res.data.error) {
            const arr = {}
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) arr[property] = res.data.error[property]
            }
            setValErrors(arr)
            if (res.data.error.email !== null) console.error(res.data.error.email)
            if (res.data.error.firstname !== null) console.error(res.data.error.firstname)
            if (res.data.error.middlename !== null) console.error(res.data.error.middlename)
            if (res.data.error.lastname !== null) console.error(res.data.error.lastname)
            if (res.data.error.birthday !== null) console.error(res.data.error.birthday)
            if (res.data.error.position !== null) console.error(res.data.error.position)
            if (res.data.error.certificates !== null) console.error(res.data.error.certificates)
            if (res.data.error.avatar !== null) console.error(res.data.error.avatar)
          } else {
            setValErrors({})
            const data = { ...res.data.user, accessToken: res.data.accessToken }
            ability.update(res.data.user.ability)
            dispatch(handleLogin(data))
            history.push('/')
          }
        })
        .catch(err => console.log(err))
    }
  }

  const handleFirstnameChange = e => {
    const errs = valErrors
    if (errs.firstname) delete errs.firstname
    setFirstname(e.target.value)
    setValErrors(errs)
  }

  const handleMiddlenameChange = e => {
    const errs = valErrors
    if (errs.middlename) delete errs.middlename
    setMiddlename(e.target.value)
    setValErrors(errs)
  }

  const handleLastnameChange = e => {
    const errs = valErrors
    if (errs.lastname) delete errs.lastname
    setLastname(e.target.value)
    setValErrors(errs)
  }

  const handleBirthdayChange = e => {
    const errs = valErrors
    if (errs.birthday) delete errs.birthday
    setLastname(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ml-1'>Vuexy</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <Table />
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className='mb-2'>
                <div className='d-flex'>
                  <p className='font-weight-bold mr-auto mb-0'>RTL</p>
                  <CustomInput type='switch' id='rtl' name='RTL' checked={isRtl} onChange={() => setIsRtl(!isRtl)} />
                </div>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-firstname'>
                  First Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={firstname}
                  placeholder='john'
                  id='register-firstname'
                  name='register-firstname'
                  onChange={handleFirstnameChange}
                  className={classnames({ 'is-invalid': errors['register-firstname'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.firstname ? (
                  <small className='text-danger'>{valErrors.firstname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-middlename'>
                  Middle Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={middlename}
                  placeholder='john'
                  id='register-middlename'
                  name='register-middlename'
                  onChange={handleMiddlenameChange}
                  className={classnames({ 'is-invalid': errors['register-middlename'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.middlename ? (
                  <small className='text-danger'>{valErrors.middlename}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-lastname'>
                  Last Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={lastname}
                  placeholder='doe'
                  id='register-lastname'
                  name='register-lastname'
                  onChange={handleLastnameChange}
                  className={classnames({ 'is-invalid': errors['register-lastname'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.lastname ? (
                  <small className='text-danger'>{valErrors.lastname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-birthday'>
                  Birthday
                </Label>
                <PickerDefault onChange={handleBirthdayChange} />
                {Object.keys(valErrors).length && valErrors.birthday ? (
                  <small className='text-danger'>{valErrors.birthday}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-position'>
                  Position
                </Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={colourOptions[0]}
                  options={colourOptions}
                  isClearable={false}
                />
                {Object.keys(valErrors).length && valErrors.position ? (
                  <small className='text-danger'>{valErrors.position}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-certificates'>
                  Certificates
                </Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={[colorOptions[2], colorOptions[3]]}
                  isMulti
                  name='colors'
                  options={colorOptions}
                  className='react-select'
                  classNamePrefix='select'
                />
                {Object.keys(valErrors).length && valErrors.certificates ? (
                  <small className='text-danger'>{valErrors.certificates}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Media className='mr-25' left>
                  <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
                </Media>
                <Media className='mt-75 ml-1'>
                  <Fragment>
                    <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary' onClick={() => setDisabledModal(!disabledModal)}>
                      Capture
                    </Button.Ripple>
                    <Modal
                      isOpen={disabledModal}
                      toggle={() => setDisabledModal(!disabledModal)}
                      className='modal-dialog-centered'
                      backdrop={false}
                    >
                      <ModalHeader toggle={() => setDisabledModal(!disabledModal)}>Camera</ModalHeader>
                      <ModalBody>
                        <WebcamCapture captureState={disabledModal} isCapture={setDisabledModal} setImgSrc={setAvatar} />
                      </ModalBody>
                    </Modal>
                  </Fragment>
                  <Button.Ripple color='secondary' size='sm' outline>
                    Reset
                  </Button.Ripple>
                </Media>
                {Object.keys(valErrors).length && valErrors.avatar ? (
                  <small className='text-danger'>{valErrors.avatar}</small>
                ) : null}
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
                Submit
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register


const WebcamCapture = ({ captureState, isCapture, setImgSrc }) => {
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    isCapture(!captureState)
  }, [webcamRef, setImgSrc])

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        height={720}
        screenshotFormat="image/jpeg"
        width={720}
      />
      <button onClick={capture}>Capture photo</button>
      {/* {imgSrc && (
        <img
          src={imgSrc}
        />
      )} */}
    </>
  )
}