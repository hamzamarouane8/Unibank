import React from 'react'
import {Button, Icon} from 'semantic-ui-react'

export default ({label, type, loading, disabled, nameIcon, icon, onClick}) => {
  return (
    <Button type={type} loading={loading} disabled={disabled} icon onClick={onClick}>
      <Icon name={nameIcon}/>

      {label}
    </Button>

  )
}
