// ** React Import
import React, { useState, Fragment } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import Webcam from 'react-webcam'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, CustomInput, Media, Modal, ModalHeader, ModalBody } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store/action'
import { useDispatch } from 'react-redux'
import { useRTL } from '@hooks/useRTL'

import '@styles/react/libs/flatpickr/flatpickr.scss'


const colourOptions = [
  { value: 'ocean', label: 'Front-end Engineer' },
  { value: 'blue', label: 'Blockchain Engineer' },
  { value: 'purple', label: 'Software Architect' },
  { value: 'red', label: 'Full Stack Engineer' },
  { value: 'orange', label: 'Unity 3D Game Engineer' }
]

const colorOptions = [
  { value: 'ocean', label: 'Certificate 1' },
  { value: 'blue', label: 'Certificate 2' },
  { value: 'purple', label: 'Certificate 3' },
  { value: 'red', label: 'Certificate 4' },
  { value: 'orange', label: 'Certificate 5' },
  { value: 'yellow', label: 'Certificate 6' }
]

const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const [isRtl, setIsRtl] = useRTL()

  // ** States
  const [disabledModal, setDisabledModal] = useState(false)
  const [imgSrc, setImgSrc] = useState('/avatar-blank.png')
  const [birthday, setBirthday] = useState(new Date())
  const [position, setPosition] = useState()
  const [certificates, setCertificates] = useState()

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      dispatch(
        addUser({
          firstName: values['first-name'],
          middleName: values['middle-name'],
          lastName: values['last-name'],
          birthday,
          position,
          certificates,
          avatar: imgSrc
        })
      )
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className='mb-2'>
          <div className='d-flex'>
            <p className='font-weight-bold mr-auto mb-0'>RTL</p>
            <CustomInput type='switch' id='rtl' name='RTL' checked={isRtl} onChange={() => setIsRtl(!isRtl)} />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for='first-name'>
            First Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='first-name'
            id='first-name'
            placeholder='Derek'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['first-name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='middle-name'>
            Middle Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='middle-name'
            id='middle-name'
            placeholder='Doe'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['middle-name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='last-name'>
            Last Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='last-name'
            id='last-name'
            placeholder='Jones'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['last-name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='birthday'>
            Birthday <span className='text-danger'>*</span>
          </Label>
          <Flatpickr
            className='form-control'
            value={birthday}
            onChange={date => setBirthday(date[0])}
            id='default-picker'
          />
        </FormGroup>
        <FormGroup>
          <Label for='position'>
            Position <span className='text-danger'>*</span>
          </Label>
          <Select
            theme={selectThemeColors}
            className='react-select'
            classNamePrefix='select'
            defaultValue={[]}
            options={colourOptions}
            isClearable={false}
            values={position}
            onChange={e => { setPosition(e) }}
          />
        </FormGroup>
        <FormGroup>
          <Label for='certificates'>
            Certificates <span className='text-danger'>*</span>
          </Label>
          <Select
            isClearable={false}
            theme={selectThemeColors}
            defaultValue={[]}
            isMulti
            name='colors'
            options={colorOptions}
            className='react-select'
            classNamePrefix='select'
            value={certificates}
            onChange={e => setCertificates(e)}
          />
        </FormGroup>
        <FormGroup>
          <Media className='mr-25' left>
            <Media object className='rounded mr-50' src={imgSrc} alt='Generic placeholder image' height='80' width='80' />
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
                  <WebcamCapture captureState={disabledModal} isCapture={setDisabledModal} setImgSrc={setImgSrc} />
                </ModalBody>
              </Modal>
            </Fragment>
          </Media>
        </FormGroup>
        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers


const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
}

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
        style={{ width: "100%" }}
        audio={false}
        ref={webcamRef}
        height={720}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  )
}