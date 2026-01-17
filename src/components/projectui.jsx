import Aurora from './Templates/Aurora';
import CircularGallery from './Templates/CircularGallery';
import PrismaticBurst from './Templates/PrismaticBurst';
import BubbleMenu from './Templates/BubbleMenu'
import InfiniteMenu from './Templates/InfiniteMenu'
import TargetCursor from './Templates/TargetCursor';



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
        width: '100vw',
        height: '100vh',
      }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          
        </div>
      </div>
    </>
  );
}