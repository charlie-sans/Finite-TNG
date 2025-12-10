import Aurora from './Aurora';
import CircularGallery from './CircularGallery';
import PrismaticBurst from './PrismaticBurst';
import BubbleMenu from './Templates/BubbleMenu'
import InfiniteMenu from './Templates/InfiniteMenu'
import  TargetCursor  from './Templates/TargetCursor';



export const Projects = (items = []) => {
  const item = [
  {
    image: '/images/cmasm.png',
    link: '/projects/cmasm',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/purr.png',
    link: '/projects/purr',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/wake.png',
    link: '/projects/wake',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/objectir.png',
    link: '/projects/objectir',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/planetlang.png',
    link: '/projects/planetlang',
    title: 'Item 5',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/jmasm.png',
    link: '/projects/jmasm',
    title: 'Item 6',
    description: 'This is pretty cool, right?'
  },
  {
    image: '/images/koderunner.png',
    link: '/projects/koderunner',
    title: 'Item 7',
    description: 'This is pretty cool, right?'
  }
];
  return (
    <>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,

            zIndex: -1,
            // pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
          }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <InfiniteMenu items={item} />
            </div>
          </div>
        {/* <style>{`
          body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          }
          .cursor-target {
          display: inline-block;
          margin: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          }
        `}</style> */}
  {/* <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div> */}
    </>
  );
}