import React from 'react';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('./components/Highlight_map'), {
  ssr: false,
});

export default function profile() {
  return (
    <div>
      profile
      <br />
      {/* <DynamicMap></DynamicMap> */}
    </div>
  );
}
