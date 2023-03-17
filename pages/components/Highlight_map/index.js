import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./Highlight_map'))

export default function Map () {
    return <DynamicMap/>;

}