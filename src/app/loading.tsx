import { LoaderSpin } from '@/components/ui/loader';
import IndexLoader from '@/components/ui/loader/index-loader';

export default function Loading() {
  return (
    <IndexLoader>
      <LoaderSpin width={50} height={50} color="#078BA0" />
    </IndexLoader>
  );
}
