import CreateOrphanageDTO from './CreateOrphanageDTO';
import Image from './Image';

export default interface Orphanage extends CreateOrphanageDTO {
  id: number;
  images: Image[];
}
