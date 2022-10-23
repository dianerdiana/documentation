// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import toast from 'react-hot-toast'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { X, Check } from 'react-feather'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  email: '',
  fullname: '',
  username: '',
  password: '',
  company: ''
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        <Check size={14} />
      </span>
      <span className='switch-icon-right'>
        <X size={14} />
      </span>
    </Label>
  )
}

const SidebarEditUser = ({ open, toggleSidebar, companyOptions }) => {
  // ** States
  const [data, setData] = useState(null)
  const [level, setLevel] = useState('0')
  const [status, setStatus] = useState('1')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Fetching Data when Sidebar is Open
  const onOpened = () => {
    setLevel(String(store.is_level))
    setStatus(String(store.is_status))
    setValue('id', String(store.id_user))
    setValue('fullname', store.fullname)
    setValue('username', store.username)
    setValue('email', store.email)
    setValue('company', companyOptions.find(i => i.value === store.company_id))
  }

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      dispatch(
        addUser({
          email: data.email,
          fullname: data.fullname,
          username: data.username,
          password: data.password,
          company_id: data.company.value,
          is_status: +status,
          is_level: +level
        })
      ).then((res) => {
        const { status, message } = res.payload
        if (status) {
          toggleSidebar()
          toast.success(message, {
            position: 'top-center'
          })
        } else {
          message.map((item, index) => {
            setTimeout(() => {
              toast.error(item, {
                position: 'top-center'
              })
            }, 1000 * index)
          })
        }
      })
    } else {
      for (const key in data) {
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
      toast.error('Please fill out all input.', {
        position: 'top-center'
      })
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setLevel('0')
    setStatus('1')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Edit User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      onOpened={onOpened}
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1 d-none'>
          <Controller
            name='id'
            control={control}
            render={({ field }) => (
              <Input 
                id='id'
                {...field} 
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label for='level' className='form-label mb-50'>
            Set as Admin
          </Label>
          <div className='form-switch form-check-primary'>
            <Input 
              type='switch' 
              id='level' 
              name='level'
              value={level === '0' ? '1' : '0'}
              onChange={e => setLevel(e.target.value)}
              checked={level === '1'}
            />
            <CustomLabel htmlFor='level' />
          </div>
        </div>
        <div className='mb-1'>
          <Label for='status' className='form-label mb-50'>
            Status
          </Label>
          <div className='form-switch form-check-primary'>
            <Input 
              type='switch' 
              id='status' 
              name='status'
              value={status === '0' ? '1' : '0'}
              onChange={e => setStatus(e.target.value)}
              checked={status === '1'}
            />
            <Label htmlFor='status' className={`ms-1 ${status === '1' ? 'text-primary' : ''}`}>
              {status === '1' ? 'Active' : 'Inactive'}
            </Label>
            <CustomLabel htmlFor='status' />
          </div>
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='fullname'>
            Full Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='fullname'
            control={control}
            render={({ field }) => (
              <Input 
                id='fullname'
                placeholder='John Doe'
                invalid={errors.fullname || (
                  data !== null && data.fullname.length < 5
                )}
                {...field} 
              />
            )}
          />
          {data !== null && data.fullname.length < 5 && (
            <FormText color='danger'>The fullname must be at least 5 characters.</FormText>
          )}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='username'>
            Username <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input 
                id='username' 
                placeholder='johnDoe99'
                invalid={errors.username || (
                  data !== null && data.username.length < 5
                )}
                {...field} 
              />
            )}
          />
          {data !== null && data.username.length < 5 && (
            <FormText color='danger'>The username must be at least 5 characters.</FormText>
          )}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                id='password'
                placeholder='Password'
                invalid={errors.password || (
                  data !== null && data.password.length < 5
                )}
                {...field}
              />
            )}
          />
          {data !== null && data.password.length < 5 && (
            <FormText color='danger'>The password must be at least 5 characters.</FormText>
          )}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='company'>
            Company <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='company'
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={companyOptions}
                theme={selectThemeColors}
                placeholder='Select Company'
                className={classnames('react-select', { 'is-invalid': data !== null && !data.company })}
                {...field}
              />
            )}
          />
        </div>

        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarEditUser
