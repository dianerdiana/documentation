import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { ModalDelete } from '@components/modal'

// ** Store & Actions
import { store } from '@store/store'
import { deleteCompany, getCompany, updateStatus } from '../company/store'

// ** Icons Imports
import { Edit, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Badge, Button } from 'reactstrap'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Action render
const renderAction = (row) => {
  const [modalOpen, setModalOpen] = useState(false)

  // ** Function to toggle modal delete
  const toggleModal = () => setModalOpen(!modalOpen)

  // ** Action handler
  const handleEdit = () => {
    store.dispatch(getCompany(row.id_company))
    row.toggleSidebarEdit()
  }

  const handleDelete = (id) => {
    store.dispatch(deleteCompany(id))
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
        handleDelete={() => handleDelete(row.id_company)}
        title='Delete Company'
        content={row.name}
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
    name: 'Company Name',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.name}</span>
        </div>
      </div>
    )
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '172px',
    sortField: 'city',
    selector: row => row.city,
    cell: row => (
      <span className='text-capitalize'>{row.city}</span>
    )
  },
  {
    name: 'Address',
    minWidth: '138px',
    sortable: true,
    sortField: 'address',
    selector: row => row.address,
    cell: row => (
      <span className='text-capitalize'>{row.address}</span>
    )
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
        onClick={() => store.dispatch(updateStatus(row.id_company))}
      >
        {+row.is_status === 1 ? 'Active' : 'Inactive'}
      </Badge>
    )
  }
]
