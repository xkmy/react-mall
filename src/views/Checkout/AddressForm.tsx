import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'

const AddressForm = ({ nextStep }: { nextStep: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    province: '',
    city: '',
    area: '',
    detail: ''
  })

  const onChange = (e: any, type: string) => {
    setFormData(formData => ({ ...formData, [type]: e.target.value }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    let next = true
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        next = false
      }
    }

    if (next) {
      nextStep()
    }
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        基本信息
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <FormInput value={formData.name} required label='姓名' onChange={e => onChange(e, 'name')} />
          <FormInput value={formData.phone} required label='电话' onChange={e => onChange(e, 'phone')} />
          <FormInput
            value={formData.email}
            required
            type='email'
            label='邮箱'
            onChange={e => onChange(e, 'email')}
          />
          <Grid item xs={12} sm={6}>
            <InputLabel>省</InputLabel>
            <Select required value={formData.province} fullWidth onChange={e => onChange(e, 'province')}>
              <MenuItem value='zhejiang'>浙江省</MenuItem>
              <MenuItem value='jiangsu'>江苏省</MenuItem>
              <MenuItem value='jiangxi'>江西省</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>市</InputLabel>
            <Select required value={formData.city} onChange={e => onChange(e, 'city')} fullWidth>
              <MenuItem value='hangzhou'>杭州市</MenuItem>
              <MenuItem value='suzhou'>苏州市</MenuItem>
              <MenuItem value='nanchang'>南昌市</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>区</InputLabel>
            <Select required value={formData.area} onChange={e => onChange(e, 'area')} fullWidth>
              <MenuItem value='shangcheng'>上城区</MenuItem>
              <MenuItem value='gusu'>姑苏区</MenuItem>
              <MenuItem value='donghu'>东湖区</MenuItem>
            </Select>
          </Grid>
          <FormInput
            value={formData.detail}
            required
            fullWidth
            label='详细地址'
            onChange={e => onChange(e, 'detail')}
          />
        </Grid>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} variant='outlined' to='/cart'>
            返回购物车
          </Button>
          <Button type='submit' variant='contained' color='primary'>
            下一步
          </Button>
        </div>
      </form>
    </>
  )
}

export default React.memo(AddressForm)
