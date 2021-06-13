import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'

import ProductItem from './Product/Product'
import useStyles from './styles'
import { commerce } from '../../utils/commerce'
import { Product } from '@chec/commerce.js/types/product'

const Products = () => {
  const classes = useStyles()

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return !products.length ? (
    <div className={classes.loadingWrapper}>Loading...</div>
  ) : (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={4}>
        {products.map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default React.memo(Products)
