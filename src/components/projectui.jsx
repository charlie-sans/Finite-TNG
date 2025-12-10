import BubbleMenu from './BubbleMenu'
import InfiniteMenu from './InfiniteMenu'

const items = [
  {
    image: '/images/objectir.png',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?',
        label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    image: '/images/purr.png',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?',
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    image: '',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?',
        label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  }
];

export const Projects = () => {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', margin: 0, padding: 0, position: 'relative', overflow: 'hidden' }}>

      <div style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
        <InfiniteMenu items={items} />
      </div>
    </div>
  );
}