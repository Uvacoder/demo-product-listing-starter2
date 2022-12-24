import Head from 'next/head';
import Image from 'next/image';
import { FaStar, FaCheck } from 'react-icons/fa';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';

import styles from '@styles/Home.module.scss';

import amazonProducts from '@data/amazoncom-sample-50.csv';

export default function Home({ products, categories }) {
  return (
    <Layout>
      <Head>
        <title>Cool Store</title>
        <meta name="description" content="My cool store!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="sr-only">My Cool Store</h1>

      <Section>
        <Container className={styles.homeContainer}>
          <div className={styles.sidebar}>
            <div className={`${styles.sidebarSection} ${styles.sidebarSearch}`}>
              <form>
                <h2><label>Search</label></h2>
                <input type="search" name="query" />
              </form>
            </div>
            <div className={`${styles.sidebarSection} ${styles.sidebarCategories}`}>
              <h2>Categories</h2>
              <form>
                <ul className={styles.checklist}>
                  <li>
                    <label className={styles.radio}>
                      <input className="sr-only" type="radio" name="category" value={false} defaultChecked />
                      <span><FaCheck /></span>
                      All
                    </label>
                  </li>
                  { categories.map(category => {
                    return (
                      <li key={category}>
                        <label className={styles.radio}>
                          <input className="sr-only" type="radio" name="category" value={category} />
                          <span><FaCheck /></span>
                          { category }
                        </label>
                      </li>
                    )
                  }) }
                </ul>
              </form>
            </div>
          </div>

          <h2 className="sr-only">Products</h2>

          <ul className={styles.products}>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <a className={styles.productImageWrapper} href={product.productUrl} rel="noopener noreferrer">
                    <Image width="370" height="640" src={product.image} alt={`${product.productName} Poster`} />
                  </a>
                  <h3 className={styles.productsTitle}>
                    <a href={product.url} rel="noopener noreferrer">{ product.productName }</a>
                  </h3>
                  <p className={styles.productPrice}>
                    {product.sellingPrice}
                  </p>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const products = amazonProducts.map(product => {
    return {
      id: product['Uniq Id'],
      productName: product['Product Name'],
      category: product['Category'],
      sellingPrice: product['Selling Price'],
      image: product['Image'],
      productUrl: product['Product Url'],
    }
  });

  const categories = Array.from(new Set(products.map(({ category }) => {
    if ( !category ) return;
    return category.split(' | ')[0];
  }))).filter(c => !!c).sort();

  return {
    props: {
      products,
      categories
    }
  }
}