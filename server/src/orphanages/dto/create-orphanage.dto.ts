import {
  IsString,
  MaxLength,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsBooleanString,
} from 'class-validator';

export class CreateOrphanageDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public name: string;

  @IsNotEmpty()
  @IsLatitude()
  public latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  public longitude: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  public about: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  public instructions: string;

  @IsNotEmpty()
  @IsBooleanString()
  public open_on_weekends: boolean;

  @IsNotEmpty()
  @IsString()
  public opening_hours: string;
}
