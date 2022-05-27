import React from 'react';

export default function Single({ single }) {
  console.log('single', single)
  return <div>Single</div>;
}

export async function getStaticPaths(){
  const res = await fetch('http://localhost:1337/api/singles')
  const { data } = await res.json()
  const paths = data.map(post => ({
          params: { id: String(post.id) }
      }))
  return {
      paths,
      fallback: false
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/api/singles/${params.id}/`) //ideally should be env.var //get by slug ()
  const { data } = await res.json()
  console.log('data in single', data)
  return{
      props: { single: data }
  }
}