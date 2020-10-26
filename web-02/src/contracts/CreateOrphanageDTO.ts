interface CreateOrphanageDTO {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
}

export default CreateOrphanageDTO;
