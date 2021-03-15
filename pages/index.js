import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <>
    Courtside
    <div>
      Blue?
    </div>
    <Button
            type="submit"
            fullWidth
            variant="contained"
            color = 'yellow'
          >
            Sign In
          </Button>
    </>
  )
}
