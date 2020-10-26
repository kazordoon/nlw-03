import CreateOrphanageDTO from './CreateOrphanageDTO';
import Image from './Image';

interface Orphanage extends CreateOrphanageDTO {
  id: number;
  images: Image[];
}

export default Orphanage;
