import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../ContextProvider'

import logo from '../../assets/images/logo.png'
import useStyles from './styles'

const NavBar = () => {
  const { cart } = useContext(Context)

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const classes = useStyles()
  const location = useLocation()

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)

  const mobileMenuId = 'primary-search-account-menu-mobile'

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
          <Badge badgeContent={cart.total_items} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position='fixed' className={classes.navbar} color='inherit'>
        <Toolbar>
          <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
            <img src={logo} alt='logo' height='25px' className={classes.image} /> React mall
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
              <Badge badgeContent={cart.total_items} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  )
}

export default React.memo(NavBar)
