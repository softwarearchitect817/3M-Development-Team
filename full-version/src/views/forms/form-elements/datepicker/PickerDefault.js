import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerDefault = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
    </Fragment>
  )
}

export default PickerDefault
