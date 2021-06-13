import React from 'react'
import { TextField, Grid } from '@material-ui/core'

type Props = {
  label?: string
  required?: boolean
  value?: string | number
  fullWidth?: boolean
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

function FormInput({ value, label, required, fullWidth, type = 'text', onChange }: Props) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        value={value}
        label={label}
        type={type}
        fullWidth={fullWidth}
        required={required}
        onChange={e => {
          onChange && onChange(e)
        }}
      />
    </Grid>
  )
}

export default React.memo(FormInput)
