import './styles.css';
import { LoaderProps } from '@/components/ui/loader/type';
import { ReactElement } from 'react';
import {
  LoaderBounceDot,
  LoaderCircle,
  LoaderCircular,
  LoaderCircularDot,
  LoaderFadeDot,
  LoaderLine,
  LoaderLineBar,
  LoaderSpin,
  LoaderSquare,
  LoaderWatch,
} from '@/components/ui/loader';

type LoaderType = ReactElement<
  | typeof LoaderCircle
  | typeof LoaderCircular
  | typeof LoaderSpin
  | typeof LoaderCircularDot
  | typeof LoaderFadeDot
  | typeof LoaderLine
  | typeof LoaderLineBar
  | typeof LoaderBounceDot
  | typeof LoaderSquare
  | typeof LoaderWatch
>;
type IndexLoaderProps = LoaderProps & {
  children: LoaderType;
  visible?: boolean;
};

function IndexLoader({ children }: IndexLoaderProps) {
  return (
    <div id="backdrop" className="loader">
      {children}
    </div>
  );
}

export default IndexLoader;
