import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  loadingWrapper: {
    margin: '74px 0 0 24px',
    fontSize: 16
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  }
}))
