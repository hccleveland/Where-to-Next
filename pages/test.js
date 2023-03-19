import React from 'react'
import { useRouter } from 'next/router';


export async function getServerSideProps({ query }) {
    const data = JSON.parse(query.data)
    console.log('--------------', data)

    return {
        props: {
          '1':'1'
        },
      };
}

export default function test() {
    const router = useRouter();

  return (
    <div>
    </div>
  )
}

// origin: origin,
// domestic: domestic,
// oneway: oneway,
// budget: budget,
// startDate: startDate,
// endDate: endDate