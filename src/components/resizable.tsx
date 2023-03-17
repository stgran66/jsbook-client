import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 48]}
    >
      {children}
    </ResizableBox>
  );
};