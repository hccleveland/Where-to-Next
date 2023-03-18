// temporary file to be able to test the map
// dynamicmap to stop the server side rendering

import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./components/Highlight_map'), {
    ssr: false,
})

export default function Map () {
    return <DynamicMap/>;

}