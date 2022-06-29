// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar.length) {
    return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={row.fullName || 'John Doe'} initials />
  }
}

// ** Renders Birthday Columns
const renderBirthday = row => {
  const [birthday, setBirthday] = useState('')

  useEffect(() => {
    if (row.birthday) {
      const birth = new Date(row.birthday)
      setBirthday(`${birth.getMonth() + 1}/${birth.getDate()}/${birth.getFullYear()}`)
    }
  }, [row])

  return (
    <span className='text-truncate text-capitalize align-middle'>
      {birthday}
    </span>
  )
}

const renderPosition = ({ position }) => {
  return (
    <span className='text-truncate text-capitalize align-middle'>
      {position && position.label}
    </span>
  )
}

const renderCertificates = ({ certificates }) => {
  return (
    <div className=''>
      {certificates && certificates.map((item, i) => (
        <Badge key={i} color={"primary"} >
          {
            item.label
          }
        </Badge>
      ))}
    </div>
  )
}

export const columns = [
  {
    name: 'First Name',
    minWidth: '297px',
    selector: 'firstName',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='font-weight-bold'>{row.firstName}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Middle Name',
    minWidth: '160px',
    selector: 'middleName',
    sortable: true,
    cell: row => row.middleName
  },
  {
    name: 'Last Name',
    minWidth: '160px',
    selector: 'lastName',
    sortable: true,
    cell: row => row.lastName
  },
  {
    name: 'Birthday',
    minWidth: '160px',
    selector: 'birthday',
    sortable: true,
    cell: row => renderBirthday(row)
  },
  {
    name: 'Position',
    minWidth: '172px',
    selector: 'role',
    sortable: true,
    cell: row => renderPosition(row)
  },
  {
    name: 'Certificates',
    minWidth: '138px',
    selector: 'currentPlan',
    sortable: true,
    cell: row => <span className='text-capitalize'>{renderCertificates(row)}</span>
  }
]
