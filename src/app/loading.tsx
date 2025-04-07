import { LoaderSpin } from '@/components/ui/loader';
import IndexLoader from '@/components/ui/loader/index-loader';

export default function Loading() {
  return (
    <IndexLoader>
      <LoaderSpin width={150} height={150} color="#078BA0" />
    </IndexLoader>
  );
}
