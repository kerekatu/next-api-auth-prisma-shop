import globalStyles from '@/styles/global'
import { Global } from '@emotion/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(faStar, faEdit, faTrash, fab)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
