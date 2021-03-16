import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home( props ) {	
  return (
    <Layout home>      
      <section className={utilStyles.headingMd}>
        <p>
          This is Mir Khorshed from No where. I am the John Doe for BYSL.
        </p>
        <p>
          Read{/*this is a comment line */} &nbsp;
        <Link href="/posts/">this post</Link>
        </p>
      </section>
      
    </Layout>
  )
}



