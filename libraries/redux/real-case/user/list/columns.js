import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { ModalDelete } from '@components/modal'

// ** Store & Actions
import { store } from '../../redux/store'
import { deleteUser, getUser, updateStatus } from '../store'

// ** Icons Imports
import { Edit, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Badge, Button } from 'reactstrap'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullname || 'John Doe'}
      />
    )
  }
}

// ** Action render
const renderAction = (row) => {
  const [modalOpen, setModalOpen] = useState(false)

  // ** Function to toggle modal delete
  const toggleModal = () => setModalOpen(!modalOpen)

  // ** Action handler
  const handleEdit = () => {
    store.dispatch(getUser(row.id_user))
    row.toggleSidebarEdit()
  }

  const handleDelete = (id) => {
    store.dispatch(deleteUser(id))
      .then(res => {
        const {status, message} = res.payload
        if (status) {
          toggleModal()
          toast.success(message, {
            position: 'top-center'
          })
        } else {
          toggleModal()
          toast.error(message, {
            position: 'top-center'
          })
        }
    })
  }

  return (
    <>
      <Button.Ripple 
        className='btn-icon rounded-circle' 
        color='flat-success'
        onClick={handleEdit}
      >
        <Edit size={16} />
      </Button.Ripple>
      <Button.Ripple 
        className='btn-icon rounded-circle' 
        color='flat-danger'
        onClick={toggleModal}
      >
        <Trash2 size={16} />
      </Button.Ripple>
      <ModalDelete
        isOpen={modalOpen}
        toggleModal={toggleModal}
        handleDelete={() => handleDelete(row.id_user)}
        title='Delete User'
        content={row.fullname}
      />
    </>
  )
}

const statusObj = {
  0: 'light-danger',
  1: 'light-success'
}

export const columns = [
  {
    name: 'Actions',
    minWidth: '120px',
    button: true,
    cell: (row) => renderAction(row)
  },
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullname',
    selector: row => row.fullname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.fullname}</span>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Company',
    minWidth: '230px',
    sortable: true,
    sortField: 'name_company',
    selector: row => row.name_company,
    cell: row => <span className='text-capitalize'>{row.name_company}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'is_status',
    selector: row => row.is_status,
    cell: row => (
      <Badge 
        pill
        className='text-capitalize cursor-pointer' 
        color={statusObj[row.is_status]}
        onClick={() => store.dispatch(updateStatus(row.id_user))}
      >
        {+row.is_status === 1 ? 'Active' : 'Inactive'}
      </Badge>
    )
  }
]
