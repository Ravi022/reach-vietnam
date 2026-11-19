import Directory from '../components/Directory';
import {Navigation,Footer} from '../components/Navigation';
export const metadata={title:'Our Products | Reach Vietnam Company Limited'};
export default function Products(){return <main id="top" className="reach-home"><Navigation/><header className="rv-title home-frame"><p className="home-pretitle">Product catalogue</p><h1>Our Products</h1><p>Choose a division to explore its range, or select a product below for full specifications.</p></header><Directory full/><Footer/></main>}
